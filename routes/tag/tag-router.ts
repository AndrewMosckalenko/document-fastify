import { tagService } from "../../services";

export function tagRouter(fastify: any, opts: any, done: any) {
  fastify.post("/:id", (req: any, res: any) => {
    tagService
      .createTag({ ...req.body, project: { id: req.params["id"] } })
      .then((result: any) => {
        res.send(result);
      });
  });

  fastify.delete("/:id", (req: any, res: any) => {
    tagService.deleteTag(req.params["id"]).then((result: any) => {
      res.send(result);
    });
  });

  done();
}
