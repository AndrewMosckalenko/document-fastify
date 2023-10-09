import { authService } from "../../services";
import { whoAmIDesc, signInDesc, signUpDesc } from "./user.descriptor";

export function userRouter(fastify: any, opts: any, done: any) {
  fastify.get("/whoami", whoAmIDesc, (request: any, reply: any) => {
    reply.send(request.raw.user);
  });

  fastify.post("/sign-in", signInDesc, (request: any, reply: any) => {
    authService.signIn(request.body).then((res) => {
      reply.send(res);
    });
  });

  fastify.post("/sign-up", signUpDesc, (request: any, reply: any) => {
    authService.signUp(request.body).then((res) => {
      reply.send(res);
    });
  });

  done();
}
