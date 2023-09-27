import { authService } from "../../services";

export function userRouter(fastify, opts, done) {
  fastify.get("/whoami", (request, reply) => {
    reply.send(request.raw.user);
  });

  fastify.post("/sign-in", (request, reply) => {
    authService.signIn(request.body).then((res) => {
      reply.send(res);
    });
  });

  fastify.post("/sign-up", (request, reply) => {
    authService.signUp(request.body).then((res) => {
      reply.send(res);
    });
  });

  done();
}
