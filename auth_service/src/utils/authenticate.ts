import type { FastifyRequest, FastifyReply } from 'fastify';

interface JwtPayload {
    jti: string;
    iat: number;
    exp: number;
}

interface AuthResponse {
    status: 'error';
    message: string;
}

async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const authHeader: string | undefined = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.code(401).send({
            status: 'error',
            message: 'Missing or invalid Authorization header'
        });
    }

    const token: string = authHeader.split(' ')[1];
    try {
        const decoded: JwtPayload = await request.server.jwt.verify<JwtPayload>(token);
        request.jwt_payload = decoded;
        request.session_id = decoded.jti;
    } catch (error) {
        return reply.code(401).send({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unauthorized'
        });
    }
}

export default authenticate;