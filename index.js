import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import middie from "@fastify/middie";
import multipart from "@fastify/multipart";

import { createPgPool } from "./db/postgres";
import { documentRouter, userRouter } from "./routes";
import { authMiddleware, uploadFileMiddleware } from "./middlewares";

dotenv.config();

const app = fastify({ logger: true });

(async () => {
  await app.register(cors);
  await app.register(middie);
  await app.register(multipart, { addToBody: true });
  await app.use(["/api/document/(.*)", "/api/user/whoami"], authMiddleware);
  await app.register(userRouter, { prefix: "/api/user" });
  await app.register(documentRouter, { prefix: "/api/document" });
  await createPgPool();
  app.listen({ port: 5000 });
})();
