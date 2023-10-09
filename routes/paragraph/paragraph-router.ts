import { paragraphService, paragraphTagService } from "../../services";

export function paragraphRouter(fastify: any, opts: any, done: any) {
  fastify.post("/:id", (req: any, res: any) => {
    paragraphService
      .createParagraph(
        { ...req.body, document: { id: req.params["id"] } },
        req.body.nextParagraphId,
      )
      .then((result) => {
        res.send(result);
      });
  });
  fastify.patch("/:id", (req: any, res: any) => {
    paragraphService
      .updateParagraph({ ...req.body, id: req.params["id"] })
      .then((result: any) => {
        res.send(result);
      });
  });
  fastify.delete("/:id", (req: any, res: any) => {
    paragraphService.deleteParagraph(req.params["id"]).then((result: any) => {
      res.send(result);
    });
  });
  fastify.post("/:id/tag/:tagId", (req: any, res: any) => {
    paragraphTagService
      .addTagForParagraph(req.params["tagId"], req.params["id"])
      .then((result: any) => {
        res.send(result);
      });
  });
  fastify.delete("/tag/:id", (req: any, res: any) => {
    paragraphTagService
      .deleteTagFromParagraph(req.params["id"])
      .then((result: any) => {
        res.send(result);
      });
  });
  done();
}
