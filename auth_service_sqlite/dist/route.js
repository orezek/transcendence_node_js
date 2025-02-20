import sqliteHandler from './handler.js';
const defaultRoute = {
    path: '/',
    method: 'GET',
    handler: sqliteHandler
};
export default defaultRoute;
