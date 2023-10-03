import { pgPool } from "../db/postgres";
import { Project } from "../entities";

export const projectService = {
  createProject(newProject) {
    return pgPool.getRepository(Project).insert(newProject);
  },
  deleteProject(id) {
    return pgPool.getRepository(Project).delete({ id });
  },
  updateProject(id, updatedProject) {
    return pgPool.getRepository(Project).update({ id }, updatedProject);
  },
  getProject(id) {
    return pgPool.getRepository(Project).findOne({
      id,
      relations: ["documents"],
    });
  },
  getProjects() {
    return pgPool.getRepository(Project).find();
  },
};
