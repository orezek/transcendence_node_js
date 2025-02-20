async function getUserHandler(req, reply) {
    try {
        // @ts-ignore
        const users = await this.db.all("SELECT * FROM users"); // Query example
        return reply.send(users);
    }
    catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Database query failed' });
    }
}
async function createUserHandler(req, reply) {
    try {
        // @ts-ignore
        const { username, email, password } = req.body;
        // @ts-ignore
        const result = await this.db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        return reply.send({ id: result.lastID, username, email });
    }
    catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Database insert failed' });
    }
}
export { getUserHandler, createUserHandler };
