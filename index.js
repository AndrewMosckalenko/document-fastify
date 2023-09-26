import fastify from "fastify";
import dotenv from "dotenv";

import { createPgPool } from "./db/postgres";
import { userRouter } from "./routes";

dotenv.config();

const app = fastify({ logger: true });

app.register(userRouter, { prefix: "/api/user" });

(async () => {
  await createPgPool();
  app.listen({ port: 5000 });
})();
