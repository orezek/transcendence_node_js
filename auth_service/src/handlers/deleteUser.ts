import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";

import {getUserId, UserId} from '../utils/dbQueries.js'

interface ResponseBody {
    status: string,
    message: string,
    data?:[]
}


async function deleteUser(this:FastifyInstance, request: FastifyRequest, reply: FastifyReply): Promise<ResponseBody> {
    try
    {
        const userId: UserId | undefined = await getUserId(this, request);
        if (userId)
        {
            const deactivateSessions: number = await this.dbSqlite('sessions').where('user_id', userId.user_id).update({revoked: true});
            const deactivateUser: number = await this.dbSqlite('users').where('id', userId.user_id).update({active: false});
            if (deactivateSessions && deactivateUser)
            {
                reply.code(200);
                return {status : 'success', message: `user deactivated`};
            }
        }
        reply.code(400);
        return {status : 'error', message: `deactivation failed`};
    }
    catch (error: unknown) {
        reply.code(500);
        if (error instanceof Error)
        {
            return {status: 'error', message: error.message};
        }
        return {status: 'error', message: 'internal server error'};
    }
}

export default deleteUser;