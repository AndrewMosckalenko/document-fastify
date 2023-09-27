import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

import { createPgPool } from "./db/postgres";
import { documentRouter, userRouter } from "./routes";

dotenv.config();

const app = fastify({ logger: true });

app.register(cors);
app.register(userRouter, { prefix: "/api/user" });
app.register(documentRouter, { prefix: "/api/document" });

(async () => {
  await createPgPool();
  app.listen({ port: 5000 });
})();
