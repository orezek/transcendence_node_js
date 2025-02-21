// types/fastify.d.ts
import { Knex } from 'knex';

declare module 'fastify' {
    interface FastifyInstance {
        dbSqlite: Knex;
        dbPg: Knex;
    }
}