import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authService } from "../../services";
import { whoAmIDesc, signInDesc, signUpDesc } from "./user.descriptor";

export function userRouter(
  fastify: FastifyInstance,
  _opts: Object,
  done: (err?: Error) => void,
) {
  fastify.get(
    "/whoami",
    whoAmIDesc,
    (req: FastifyRequest, res: FastifyReply) => {
      if ("user" in req.raw) res.send(req.raw.user);
      else res.status(401);
    },
  );

  fastify.post(
    "/sign-in",
    signInDesc,
    (req: FastifyRequest, res: FastifyReply) => {
      authService.signIn(req.body).then((result) => {
        res.send(result);
      });
    },
  );

  fastify.post(
    "/sign-up",
    signUpDesc,
    (req: FastifyRequest, res: FastifyReply) => {
      authService.signUp(req.body).then((result) => {
        res.send(result);
      });
    },
  );

  done();
}
