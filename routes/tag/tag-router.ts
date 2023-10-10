import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { tagService } from "../../services";
import { CreateTagDTO } from "../../services/dtos/tag";

export function tagRouter(
  fastify: FastifyInstance,
  _opts: Object,
  done: (err?: Error) => void,
) {
  fastify.post(
    "/:id",
    (
      req: FastifyRequest<{ Params: { id: number }; Body: CreateTagDTO }>,
      res: FastifyReply,
    ) => {
      tagService
        .createTag({ ...req.body, project: { id: req.params["id"] } })
        .then((result) => {
          res.send(result);
        });
    },
  );

  fastify.delete(
    "/:id",
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      tagService.deleteTag(req.params["id"]).then((result) => {
        res.send(result);
      });
    },
  );
  done();
}
