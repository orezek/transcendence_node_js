import fastify from 'fastify';
import type {FastifyInstance} from 'fastify';
import {getUser, createUser, createUserKnex, createUserKnexPg} from './routes.js';
// @ts-ignore
import sqlite from "fastify-sqlite-typed";
import multiKnexPlugin from "./knex_plugin.js"
const app: FastifyInstance = fastify({logger: true});

// @ts-ignore
app.register(sqlite, {
    dbFilename: '/sqlite_db_data/auth_service.sqlite',
    driverSettings: {
        //verbose: true,
    }
})
app.register(multiKnexPlugin);
// @ts-ignore
app.route(getUser);
app.route(createUser);
app.route(createUserKnex);
app.route(createUserKnexPg);

app.ready().then(() => {
    console.log('Server is ready.');
})

app.listen({port: 3000, host: '0.0.0.0'}).catch((error) => {
    console.log(error);
});
