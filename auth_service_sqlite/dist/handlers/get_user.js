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
export default getUserHandler;
