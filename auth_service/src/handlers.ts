
import type {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";


// function createUser(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
//     reply.code(201);
//     // @ts-ignore
//     const { username, email, password } = request.body;
//     const query: string = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
//     const values = [username, email, password];
//         // @ts-ignore
//     return this.pg.query(query, values).then((result) => {
//         console.log(result.rows);
//         return {
//             status: "success",
//             message: "user created successfully",
//             data: {
//                 id: result.rows[0].id,
//                 // @ts-ignore
//                 username: result.rows[0].username,
//                 // @ts-ignore
//                 email: result.rows[0].email,
//             }
//         };
//         // @ts-ignore
//     }).catch((err) => {
//         console.error('Error inserting user:', err);
//         reply.code(500);
//         return { error: 'Database error' };
//     })
// }

function loginUser(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'loginUser'};
}

function logoutUser(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'logoutUser'};
}

function getUserInfo(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'getUserInfo'};
}

function refreshToken(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'refreshToken'};
}

function logoutAll(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'logoutAll'};
}

function getAllSessions(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'getAllSessions'};
}

function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'deleteUser'};
}

function updateUser(request: FastifyRequest, reply: FastifyReply) {
    return {endpoint: 'updateUser'};
}

export {loginUser, logoutUser, getUserInfo, refreshToken, logoutAll, getAllSessions, deleteUser, updateUser};