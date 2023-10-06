import { authService } from "../../services";
import { whoAmIDesc, signInDesc, signUpDesc } from "./user.descriptor";

export function userRouter(fastify, opts, done) {
  fastify.get("/whoami", whoAmIDesc, (request, reply) => {
    reply.send(request.raw.user);
  });

  fastify.post("/sign-in", signInDesc, (request, reply) => {
    authService.signIn(request.body).then((res) => {
      reply.send(res);
    });
  });

  fastify.post("/sign-up", signUpDesc, (request, reply) => {
    authService.signUp(request.body).then((res) => {
      reply.send(res);
    });
  });

  done();
}
