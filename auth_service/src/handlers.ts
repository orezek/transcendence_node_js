
import type {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";


// function loginUser(request: FastifyRequest, reply: FastifyReply) {
//     return {endpoint: 'loginUser'};
// }

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

export {logoutUser, getUserInfo, refreshToken, logoutAll, getAllSessions, deleteUser, updateUser};