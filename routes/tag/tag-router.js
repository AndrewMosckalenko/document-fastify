import { tagService } from "../../services";

export function tagRouter(fastify, opts, done) {
  fastify.post("/:id", (req, res) => {
    tagService
      .createTag({ ...req.body, project: { id: req.params["id"] } })
      .then((result) => {
        res.send(result);
      });
  });

  fastify.delete("/:id", (req, res) => {
    tagService.deleteTag(req.params["id"]).then((result) => {
      res.send(result);
    });
  });

  done();
}
