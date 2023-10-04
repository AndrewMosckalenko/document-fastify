import { pgPool } from "../db/postgres";
import { Project, userProjects } from "../entities";

export const projectService = {
  async createProject(newProject, user) {
    const newProjectId = await pgPool.getRepository(Project).insert(newProject);
    return pgPool.getRepository(userProjects).insert({
      user: { id: user.id },
      project: { id: newProjectId.raw[0].id },
    });
  },
  deleteProject(id) {
    return pgPool.getRepository(Project).delete({ id });
  },
  updateProject(id, updatedProject) {
    return pgPool.getRepository(Project).update({ id }, updatedProject);
  },
  getProject(id) {
    return pgPool.getRepository(Project).findOne({
      where: { id },
      relations: ["documents", "tags"],
    });
  },
  getProjects(userId) {
    return pgPool.getRepository(Project).find({
      relations: ["userProjects", "userProjects.user"],
      where: { userProjects: { user: { id: userId } } },
    });
  },
};
