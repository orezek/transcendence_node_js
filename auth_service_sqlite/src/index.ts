import fastify from 'fastify';
import type {FastifyInstance} from 'fastify';
import sqlite from './route.js';


const app: FastifyInstance = fastify({logger: true});

// @ts-ignore
app.route(sqlite);

app.ready().then(() => {
    console.log('Server is ready.');
})

app.listen({port: 3000, host: '0.0.0.0'}).catch((error) => {
    console.log(error);
});
