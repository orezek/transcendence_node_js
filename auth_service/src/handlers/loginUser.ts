import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";


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

interface Session {
    id: number;
    user_id: number;
    session_id: string;
    ip_address: string;
    user_agent: string;
    created_at: Date;
    expires_at: Date;
    revoked: boolean;
}

async function loginUser(this: FastifyInstance, request: FastifyRequest<{Body: UserBody}>, reply: FastifyReply) {
    const {username, password} = request.body;
    try {
        const user: User | undefined = await this.dbSqlite<User>('users').where({username: username, password: password}).first();
        // user does not exist
        if (!user) {
            reply.code(401);
            return {status: 'error', message: 'Invalid username or password'};
        }
        const newSession =
            {
                user_id: user.id,
                session_id : 'some-session-id',
                ip_address: request.ip || 'unknown',
                user_agent: request.headers['user-agent'] || 'unknown',
            }
        const [sessionId]: number[] = await this.dbSqlite('sessions').insert(newSession);
        const session: Session | undefined = await this.dbSqlite('sessions').where('id', sessionId).first();
        reply.code(200);
        // @ts-ignore
        return {status: 'success', message: 'user logged in' ,data: session};

    } catch (error) {
        // @ts-ignore
        return {error: error.message};
    }
}

export default loginUser;