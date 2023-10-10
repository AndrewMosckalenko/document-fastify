import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { projectService } from "../../services";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../services/dtos/project";
import { IUser } from "../../entities";

export function projectRouter(
  fastify: FastifyInstance,
  _opts: Object,
  done: (err?: Error) => void,
) {
  fastify.post(
    "/",
    (req: FastifyRequest<{ Body: CreateProjectDTO }>, res: FastifyReply) => {
      if ("user" in req.raw) {
        projectService
          .createProject(req.body, req.raw.user as IUser)
          .then((result) => {
            res.send(result);
          });
      } else {
        res.status(401);
      }
    },
  );

  fastify.get("/", (req: FastifyRequest, res: FastifyReply) => {
    if ("user" in req.raw) {
      projectService.getProjects((req.raw.user as IUser).id).then((result) => {
        res.send(result);
      });
    } else {
      res.status(401);
    }
  });

  fastify.get(
    "/:id",
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      projectService.getProject(req.params["id"]).then((result) => {
        res.send(result);
      });
    },
  );

  fastify.patch(
    "/:id",
    (
      req: FastifyRequest<{ Params: { id: number }; Body: UpdateProjectDTO }>,
      res: FastifyReply,
    ) => {
      projectService
        .updateProject(req.params["id"], req.body)
        .then((result) => {
          res.send(result);
        });
    },
  );

  fastify.delete(
    "/:id",
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      projectService.deleteProject(req.params["id"]).then((result) => {
        res.send(result);
      });
    },
  );

  fastify.get(
    "/summary/:id",
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      projectService.getProjectSummary(req.params["id"]).then((result) => {
        res.send(result);
      });
    },
  );

  done();
}
