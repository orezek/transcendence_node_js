import fastify from 'fastify';
import { getUser, createUser } from './route.js';
// @ts-ignore
import sqlite from "fastify-sqlite-typed";
const app = fastify({ logger: true });
// @ts-ignore
app.register(sqlite, {
    dbFilename: '/sqlite_db_data/auth_service.sqlite',
    driverSettings: {
        verbose: true,
    }
});
// @ts-ignore
app.route(getUser);
app.route(createUser);
app.ready().then(() => {
    console.log('Server is ready.');
});
app.listen({ port: 3000, host: '0.0.0.0' }).catch((error) => {
    console.log(error);
});
