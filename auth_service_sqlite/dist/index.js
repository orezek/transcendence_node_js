import fastify from 'fastify';
import defaultRoute from './route.js';
const app = fastify({ logger: true });
// @ts-ignore
app.route(defaultRoute);
app.ready().then(() => {
    console.log('Server is ready.');
});
app.listen({ port: 3000, host: '0.0.0.0' }).catch((error) => {
    console.log(error);
});
// app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
//     return 'hello world'
// })
