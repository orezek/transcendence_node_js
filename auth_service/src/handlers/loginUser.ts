import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

// Define response types
interface SuccessResponse {
    status: 'success';
    message: string;
    data: { token: string };
}

interface ErrorResponse {
    status: 'error';
    message: string;
}

type LoginResponse = SuccessResponse | ErrorResponse;


interface UserBody {
    username: string;
    password: string;
}
interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
    active: boolean;
}

async function loginUser(this: FastifyInstance, request: FastifyRequest<{Body: UserBody}>, reply: FastifyReply): Promise<LoginResponse> {
    const {username, password} = request.body;
    try {
        const user: User | undefined = await this.dbSqlite<User>('users').select('*').where({username: username, password: password, active: true}).first();
        if (!user) {
            reply.code(401);
            return {status: 'error', message: 'Invalid username or password'};
        }
        const newSession =
            {
                user_id: user.id,
                session_id : crypto.randomUUID(),
                ip_address: request.ip || 'unknown',
                user_agent: request.headers['user-agent'] || 'unknown',
                expires_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            }
        try {
            await this.dbSqlite('sessions').insert(newSession);
            const token: string = this.jwt.sign({ jti: newSession.session_id });
            reply.code(200);
            return {status: 'success', message: 'user logged in' ,data: {token: token}};
        }catch (error) {
            reply.code(500);
            return {status: 'error', message: 'failed to create session'};
        }


    } catch (error: unknown) {
        const sqliteError = error as { code?: string; message: string };
        reply.code(500);
        return {status: 'error', message: sqliteError.message};
    }
}

export default loginUser;