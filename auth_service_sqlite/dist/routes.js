import getUserHandler from './handlers/get_user.js';
import createUserHandler from './handlers/create_user.js';
import createUserKnexHandler from './handlers/create_user_knex.js';
import createUserKnexPgHandler from './handlers/create_user_knex_pg.js';
// @ts-ignore
const getUser = {
    url: '/',
    method: 'GET',
    handler: getUserHandler,
};
const createUser = {
    url: '/user',
    method: 'POST',
    handler: createUserHandler,
};
const createUserKnex = {
    url: '/user/knex',
    method: 'POST',
    handler: createUserKnexHandler,
};
const createUserKnexPg = {
    url: '/user/pg',
    method: 'POST',
    handler: createUserKnexPgHandler,
};
export { getUser, createUser, createUserKnex, createUserKnexPg };
