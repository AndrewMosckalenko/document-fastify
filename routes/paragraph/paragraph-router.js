import { paragraphService, paragraphTagService } from "../../services";

export function paragraphRouter(fastify, opts, done) {
  fastify.post("/:id", (req, res) => {
    paragraphService
      .createParagraph({ ...req.body, document: { id: req.params["id"] } })
      .then((result) => {
        res.send(result);
      });
  });
  fastify.patch("/:id", (req, res) => {
    paragraphService
      .updateParagraph({ ...req.body, id: req.params["id"] })
      .then((result) => {
        res.send(result);
      });
  });
  fastify.delete("/:id", (req, res) => {
    paragraphService.deleteParagraph(req.params["id"]).then((result) => {
      res.send(result);
    });
  });
  fastify.post("/:id/tag/:tagId", (req, res) => {
    paragraphTagService
      .addTagForParagraph(req.params["tagId"], req.params["id"])
      .then((result) => {
        res.send(result);
      });
  });
  fastify.delete("/tag/:id", (req, res) => {
    paragraphTagService
      .deleteTagFromParagraph(req.params["id"])
      .then((result) => {
        res.send(result);
      });
  });
  done();
}
