import fastify from "fastify";
import dotenv from 'dotenv';

import { createPgPool } from "./db/postgres";

dotenv.config()

const app = fastify({ logger: true });

(async () => {
    await createPgPool();
    app.listen({ port: 5000 });
})()