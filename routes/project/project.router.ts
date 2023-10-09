import { projectService } from "../../services";

export function projectRouter(fastify: any, opt: any, done: any) {
  fastify.post("/", (req: any, res: any) => {
    projectService.createProject(req.body, req.raw.user).then((result) => {
      res.send(result);
    });
  });

  fastify.get("/", (req: any, res: any) => {
    projectService.getProjects(req.raw.user.id).then((result: any) => {
      res.send(result);
    });
  });

  fastify.get("/:id", (req: any, res: any) => {
    projectService.getProject(req.params["id"]).then((result: any) => {
      res.send(result);
    });
  });

  fastify.patch("/:id", (req: any, res: any) => {
    projectService
      .updateProject(req.params["id"], req.body)
      .then((result: any) => {
        res.send(result);
      });
  });

  fastify.delete("/:id", (req: any, res: any) => {
    projectService.deleteProject(req.params["id"]).then((result: any) => {
      res.send(result);
    });
  });

  fastify.get("/summary/:id", (req: any, res: any) => {
    projectService.getProjectSummary(req.params["id"]).then((result) => {
      res.send(result);
    });
  });

  done();
}
