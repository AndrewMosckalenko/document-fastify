import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { paragraphService, paragraphTagService } from "../../services";
import {
  CreateParagraphDTO,
  UpdateParagraphDTO,
} from "../../services/dtos/paragraph";

export function paragraphRouter(
  fastify: FastifyInstance,
  _opts: Object,
  done: (err?: Error) => void,
) {
  fastify.post(
    "/:id",
    (
      req: FastifyRequest<{ Params: { id: number }; Body: CreateParagraphDTO }>,
      res: FastifyReply,
    ) => {
      paragraphService
        .createParagraph(
          { ...req.body, document: { id: req.params["id"] } },
          req.body.nextParagraphId,
        )
        .then((result) => {
          res.send(result);
        });
    },
  );
  fastify.get(
    "/",
    (
      req: FastifyRequest<{
        Querystring: { documentId: number; tagId: number };
      }>,
      res: FastifyReply,
    ) => {
      paragraphService
        .getParagraphsForSummaryTable(
          Number(req.query.documentId),
          Number(req.query.tagId),
        )
        .then((result) => {
          res.send(result);
        });
    },
  );
  fastify.patch(
    "/:id",
    (
      req: FastifyRequest<{ Params: { id: number }; Body: UpdateParagraphDTO }>,
      res: FastifyReply,
    ) => {
      paragraphService
        .updateParagraph({ ...req.body, id: req.params["id"] })
        .then((result) => {
          res.send(result);
        });
    },
  );
  fastify.delete(
    "/:id",
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      paragraphService.deleteParagraph(req.params["id"]).then((result) => {
        res.send(result);
      });
    },
  );
  fastify.post(
    "/:id/tag/:tagId",
    (
      req: FastifyRequest<{ Params: { id: number; tagId: number } }>,
      res: FastifyReply,
    ) => {
      paragraphTagService
        .addTagForParagraph(req.params["tagId"], req.params["id"])
        .then((result) => {
          res.send(result);
        });
    },
  );
  fastify.delete(
    "/tag/:id",
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      paragraphTagService
        .deleteTagFromParagraph(req.params["id"])
        .then((result) => {
          res.send(result);
        });
    },
  );
  done();
}
