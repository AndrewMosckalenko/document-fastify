import fastify from "fastify";

const app = fastify({ logger: true });

app.listen({ port: 5000 });
