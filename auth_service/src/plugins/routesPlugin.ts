import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import createUser from '../handlers/createUser.js'
import loginUser from '../handlers/loginUser.js'
import getAllSessions from '../handlers/getAllSessions.js'
import logoutUser from '../handlers/logoutUser.js'
import getUserInfo from '../handlers/getUserInfo.js'
import deleteUser from '../handlers/deleteUser.js'
import updateUser from '../handlers/updateUser.js'
import refreshToken from '../handlers/refreshToken.js'
import logoutAll from '../handlers/logoutAll.js'

const routesPlugin: FastifyPluginAsync = async (app: FastifyInstance): Promise<void> => {
    const routes = [
        {
            // create user
            url: '/api/user',
            method: 'post',
            handler: createUser,
            schema: {
                body: app.getSchema('https://ponggame.com/schemas/api/v1/user/body.json'),
                response: {
                    201: app.getSchema('https://ponggame.com/schemas/api/v1/user/response-201.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/user/response-400.json'),
                    409: app.getSchema('https://ponggame.com/schemas/api/v1/user/response-409.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/user/response-500.json'),
                }
            }
        },
        {
            // login user
            url: '/api/login',
            method: 'post',
            handler: loginUser,
            schema: {
                body: app.getSchema('https://ponggame.com/schemas/api/v1/login/body.json'),
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/login/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/login/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/login/response-401.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/login/response-500.json'),
                }
            }
        },
        {
            // logout user
            url: '/api/logout',
            method: 'post',
            preHandler: app.authenticate,
            handler: logoutUser,
            schema: {
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/logout/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/logout/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/logout/response-401.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/logout/response-500.json')
                }
            }
        },
        {
            // user details
            url: '/api/user/info',
            method: 'get',
            preHandler: app.authenticate,
            handler: getUserInfo,
            schema: {
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/user/info/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/user/info/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/user/info/response-401.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/user/info/response-500.json')
                }
            }
        },
        {
            // refresh jwt token
            url: '/api/user/refresh',
            method: 'post',
            preHandler: app.authenticate,
            handler: refreshToken,
            schema: {
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/user/refresh/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/user/refresh/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/user/refresh/response-401.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/user/refresh/response-500.json'),
                }
            }
        },
        {
            // logout all user sessions
            url: '/api/sessions/logout/all',
            method: 'delete',
            preHandler: app.authenticate,
            handler: logoutAll,
            schema: {
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/logoutAll/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/logoutAll/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/logoutAll/response-401.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/logoutAll/response-500.json')
                }
            }
        },
        {
            // list all users sessions
            url: '/api/sessions',
            method: 'get',
            preHandler: app.authenticate,
            handler: getAllSessions,
            schema: {
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/response-401.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/sessions/response-500.json')
                }
            }
        },
        {
            // deactivate user
            url: '/api/user',
            method: 'delete',
            preHandler: app.authenticate,
            handler: deleteUser,
            schema: {
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/user/delete/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/user/delete/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/user/delete/response-401.json'),
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/user/delete/response-500.json')
                }
            }
        },
        {
            // update user profile data
            url: '/api/user',
            method: 'patch',
            preHandler: app.authenticate,
            handler: updateUser,
            schema: {
                body: app.getSchema('https://ponggame.com/schemas/api/v1/user/patch/body.json'),
                response: {
                    200: app.getSchema('https://ponggame.com/schemas/api/v1/user/patch/response-200.json'),
                    400: app.getSchema('https://ponggame.com/schemas/api/v1/user/patch/response-400.json'),
                    401: app.getSchema('https://ponggame.com/schemas/api/v1/user/patch/response-401.json'),
                    //409:app.getSchema(duplicate records error),it might happen
                    500: app.getSchema('https://ponggame.com/schemas/api/v1/user/patch/response-500.json')
                }
            }
        }
    ];
    routes.forEach(route => {
        app.route(route);
    });
}

export default routesPlugin;