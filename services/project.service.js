import { projectRepository, userProjectRepository } from "../db/postgres";
import { tagService } from "../services";
import { projectSummaryQuery } from './queries/project-summary-query'

export const projectService = {
  async createProject(newProject, user) {
    const newProjectId = await projectRepository.insert(newProject);
    return userProjectRepository.insert({
      user: { id: user.id },
      project: { id: newProjectId.raw[0].id },
    });
  },
  deleteProject(id) {
    return projectRepository.delete({ id });
  },
  updateProject(id, updatedProject) {
    return projectRepository.update({ id }, updatedProject);
  },
  getProject(id) {
    return projectRepository.findOne({
      where: { id },
      relations: ["documents", "tags"],
    });
  },
  getProjects(userId) {
    return projectRepository.find({
      relations: ["userProjects", "userProjects.user"],
      where: { userProjects: { user: { id: userId } } },
    });
  },

  async getProjectSummary(id) {
    const header = await tagService.getTagByProjectId(id);
    const table = await projectRepository.query(
      projectSummaryQuery,
      [id],
    );

    return { table, header };
  },
};
