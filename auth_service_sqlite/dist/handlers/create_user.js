async function createUserHandler(req, reply) {
    try {
        // @ts-ignore
        const { username, email, password } = req.body;
        // @ts-ignore
        // sqlite fastify plugin
        const result = await this.db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        console.log(result);
        //knex postgres and sqlite
        return reply.code(201).send({ id: result.lastID, username, email });
    }
    catch (err) {
        // @ts-ignore
        console.error(err.code);
        // @ts-ignore
        console.error(err.errno);
        // @ts-ignore
        console.error(err.message);
        console.error(err);
        // @ts-ignore
        if (err.errno === 19) {
            // @ts-ignore
            return reply.code(409).send({ error: `${err.message}` });
        }
        // @ts-ignore
        return reply.status(500).send({ error: `${err.message}` });
    }
}
export default createUserHandler;
