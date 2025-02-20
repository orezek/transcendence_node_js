import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres'
import sqlite from 'fastify-sqlite-typed'

import type {FastifyInstance} from 'fastify'

import routesPlugin from "./routesPlugin.js"
import schemas from "./schemas.js";

const app: FastifyInstance = Fastify();

// @ts-ignore
app.register(sqlite, {
    dbFilename: '/sqlite_db_data/auth_service.sqlite',
    driverSettings: {
        verbose: true,
    }
})

await app.register(fastifyPostgres, {
    connectionString: 'postgres://auth_user:securepassword@auth_service_db:5432/auth_db'
})

app.register(routesPlugin);

Object.values(schemas).forEach((schema) => {
    app.addSchema(schema);
})


app.ready()
.then(():void => {
    console.log(`Server has loaded all plugins and routes!`);
})

app.listen({port: 3000, host: '0.0.0.0'}).then((address: string): void => {
    console.log(`Server is running with : ${address}`);
})
export {app};