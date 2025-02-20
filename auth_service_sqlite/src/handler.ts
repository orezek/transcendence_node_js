import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";

function sqliteHandler(this: FastifyInstance, req: FastifyRequest, reply: FastifyReply) {
    return 'I am sqliteHandler!';
}

export default sqliteHandler;