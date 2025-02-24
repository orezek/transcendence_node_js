import type {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';

interface Session {
    session_id: string;
    user_id: number;
    ip_address: string;
    user_agent: string;
    created_at: string; // Assuming SQLite returns ISO strings
    expires_at: string;
    revoked: boolean;
}



interface responseBody {
    status: string;
    message: string;
    data?: object[];
}
async function getAllSessions(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply): Promise<responseBody> {

    // @ts-ignore
    console.log('getAllSessions');
    try
    {
        const sessions: Session[] = await this.dbSqlite.select('*').from('sessions').where({session_id : request.session_id, revoked: false}).andWhereRaw("UNIXEPOCH(expires_at) > UNIXEPOCH('now')");
        console.log(sessions);
        if (!sessions.length)
        {
            reply.code(401);
            return {status: 'error', message: 'Session has expired'};
        }
        const response: responseBody = {
            status: 'success',
            message: 'All Sessions successfully returned',
            data: sessions,
        }
        reply.code(200);
        return response;
    } catch (error)
    {
        // @ts-ignore
        console.log('getAllSessions error', error);
        // @ts-ignore
        return {error: 'error'};
    }
}

export default getAllSessions