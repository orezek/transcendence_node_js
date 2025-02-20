import getUserHandler from './handlers/get_user.js';
import createUserHandler from './handlers/create_user.js';

// @ts-ignore
const getUser = {
    url: '/',
    method: 'GET',
    handler: getUserHandler,
}

const createUser = {
    url: '/user',
    method: 'POST',
    handler: createUserHandler,
}

export {getUser, createUser};