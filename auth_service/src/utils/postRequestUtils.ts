import type {FastifyRequest} from "fastify";

interface UserRequestBody{
    username: string;
    email: string;
    password: string;
}

function extractUsernameEmailPassword(request: FastifyRequest<{ Body: UserRequestBody }>) {
    const {username, email, password} = request.body;
    return {username, email, password};
}

export {extractUsernameEmailPassword}