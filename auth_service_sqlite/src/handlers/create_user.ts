import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

async function createUserHandler(this:FastifyInstance, req: FastifyRequest, reply: FastifyReply) {
    try {
        // @ts-ignore
        const { username, email, password } = req.body;
        // @ts-ignore
        const result = await this.db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        return reply.send({ id: result.lastID, username, email });
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Database insert failed' });
    }
}

export default createUserHandler;