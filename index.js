import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import middie from "@fastify/middie";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import { createPgPool } from "./db/postgres";
import { documentRouter, userRouter } from "./routes";
import { authMiddleware } from "./middlewares";

dotenv.config();

const app = fastify({ logger: true });

(async () => {
  await app.register(cors);
  await app.register(middie);
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Document app by fastify",
        description: "Document app by fastify",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });
  await app.register(swaggerUI, {
    routePrefix: "/doc",
    uiConfig: {
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  });
  await app.register(multipart, { addToBody: true });

  await app.use(
    ["/api/document/(.*)", "/api/user/whoami", "/api/document"],
    authMiddleware,
  );

  await app.register(userRouter, { prefix: "/api/user" });
  await app.register(documentRouter, { prefix: "/api/document" });

  await createPgPool();

  app.listen({ port: 5000 });
})();
