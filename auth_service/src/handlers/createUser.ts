import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

interface UserRequest{
    Body: {
        username: string;
        email: string;
        password: string;
    };
}

function createUser(this: FastifyInstance, request: FastifyRequest<UserRequest>, reply: FastifyReply) {
    reply.code(201);
    const { username, email, password } = request.body;
    const query: string = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
    const values = [username, email, password];
    // @ts-ignore
    return this.pg.query(query, values).then((result) => {
        console.log(result.rows);
        return {
            status: "success",
            message: "user created successfully",
            data: {
                id: result.rows[0].id,
                // @ts-ignore
                username: result.rows[0].username,
                // @ts-ignore
                email: result.rows[0].email
            }
        };
        // @ts-ignore
    }).catch((err) => {
        console.error('Error inserting user:', err);
        reply.code(500);
        return { error: 'Database error' };
    })
}



export default createUser;