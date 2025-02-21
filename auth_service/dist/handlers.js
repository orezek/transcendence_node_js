function loginUser(request, reply) {
    return { endpoint: 'loginUser' };
}
function logoutUser(request, reply) {
    return { endpoint: 'logoutUser' };
}
function getUserInfo(request, reply) {
    return { endpoint: 'getUserInfo' };
}
function refreshToken(request, reply) {
    return { endpoint: 'refreshToken' };
}
function logoutAll(request, reply) {
    return { endpoint: 'logoutAll' };
}
function getAllSessions(request, reply) {
    return { endpoint: 'getAllSessions' };
}
function deleteUser(request, reply) {
    return { endpoint: 'deleteUser' };
}
function updateUser(request, reply) {
    return { endpoint: 'updateUser' };
}
export { loginUser, logoutUser, getUserInfo, refreshToken, logoutAll, getAllSessions, deleteUser, updateUser };
