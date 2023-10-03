import { projectService } from "../../services";

export function projectRouter(fastify, opt, done) {
  fastify.post("/", (req, res) => {
    projectService.createProject(req.body).then((result) => {
      res.send(result);
    });
  });

  fastify.get("/", (_, res) => {
    projectService.getProjects().then((result) => {
      res.send(result);
    });
  });

  fastify.get("/:id", (req, res) => {
    projectService.getProject(req.params["id"]).then((result) => {
      res.send(result);
    });
  });

  fastify.patch("/:id", (req, res) => {
    projectService.updateProject(req.params["id"], req.body).then((result) => {
      res.send(result);
    });
  });

  fastify.delete("/:id", (req, res) => {
    projectService.deleteProject(req.params["id"]).then((result) => {
      res.send(result);
    });
  });

  done();
}
