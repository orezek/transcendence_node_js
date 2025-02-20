import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

async function createUserKnexHandler(this:FastifyInstance, req: FastifyRequest, reply: FastifyReply) {
    // Expecting JSON body with: { username, email, password }

    // @ts-ignore
    const { username, email, password } = req.body;
    try {
        // @ts-ignore
        const insertedIds = await this.dbSqlite('users')
            .insert({ username, email, password });
        // insertedIds generally returns an array with the last inserted row ID (SQLite).
        console.log(insertedIds);
        return reply.code(201).send({ success: true, insertedId: insertedIds[0] });
    } catch (err) {
        // For a unique constraint in SQLite, err.code === 'SQLITE_CONSTRAINT'
        // @ts-ignore
        if (err.code === 'SQLITE_CONSTRAINT') {
            return reply.code(409).send({ error: 'User already exists (SQLite)' });
        }
        console.error(err);
        return reply.code(500).send({ error: 'Cannot add user to SQLite' });
    }
}

export default createUserKnexHandler;