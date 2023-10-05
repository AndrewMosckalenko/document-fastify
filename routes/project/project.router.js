import { projectService } from "../../services";

export function projectRouter(fastify, opt, done) {
  fastify.post("/", (req, res) => {
    projectService.createProject(req.body, req.raw.user).then((result) => {
      res.send(result);
    });
  });

  fastify.get("/", (req, res) => {
    projectService.getProjects(req.raw.user.id).then((result) => {
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

  fastify.get("/summary/:id", (req, res) => {
    projectService.getProjectSummary(req.params["id"]).then((result) => {
      res.send(result);
    });
  });

  done();
}
