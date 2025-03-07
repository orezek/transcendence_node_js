import Fastify from 'fastify';
import fp from 'fastify-plugin';
import fastifyPostgres from '@fastify/postgres';
import sqlite from 'fastify-sqlite-typed';
import knexPlugin from "./plugins/knexPlugin.js";
import routesPlugin from "./plugins/routesPlugin.js";
import schemas from "./schemas.js";
import authPlugin from "./plugins/authPlugin.js";
const app = Fastify();
await app.register(authPlugin);
// Register JWT plugin with configuration
await app.register(import('@fastify/jwt'), {
    secret: 'my-super-secret-key', // Hardcoded for testing
    sign: {
        expiresIn: '1h' // Initial expiration: 1 hour
    }
});
// @ts-ignore
app.register(sqlite, {
    dbFilename: '/sqlite_db_data/auth_service.sqlite',
    driverSettings: {
        verbose: true,
    }
});
await app.register(fastifyPostgres, {
    connectionString: 'postgres://auth_user:securepassword@auth_service_db:5432/auth_db'
});
// Look at the plugin options and maybe move the database connection settings to options to have direct access to it
await app.register(knexPlugin);
app.register(fp(routesPlugin));
Object.values(schemas).forEach((schema) => {
    app.addSchema(schema);
});
app.ready()
    .then(() => {
    console.log(`Server has loaded all plugins and routes!`);
});
app.listen({ port: 3000, host: '0.0.0.0' }).then((address) => {
    console.log(`Server is running with : ${address}`);
});
export { app };
