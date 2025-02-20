import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

async function createUserKnexPgHandler(this:FastifyInstance, req: FastifyRequest, reply: FastifyReply) {

    // @ts-ignore
    const { username, email, password } = req.body;
    try {
        // For Postgres, we might want returning('id') if we want the new ID
        // @ts-ignore
        const [insertedUser] = await this.dbPg('users')
            .insert({ username, email, password })
            .returning(['id', 'username', 'email']);
        // insertedUser will contain the newly inserted user row
        return reply.code(201).send({ success: true, insertedUser });
    } catch (err) {
        // Common Postgres unique constraint code: 23505
        // @ts-ignore
        if (err.code === '23505') {
            return reply.code(409).send({ error: 'User already exists (Postgres)' });
        }
        console.error(err);
        return reply.code(500).send({ error: 'Cannot add user to Postgres' });
    }
}

export default createUserKnexPgHandler;