import { projectRepository, userProjectRepository } from "../db/postgres";
import { IUser } from "../entities";
import { tagService } from "../services";
import { CreateProjectDTO, UpdateProjectDTO } from "./dtos/project";
import { projectSummaryQuery } from "./queries/project-summary-query";

export const projectService = {
  async createProject(newProject: CreateProjectDTO, user: IUser) {
    const newProjectId = await projectRepository.insert(newProject);
    return userProjectRepository.insert({
      user: { id: user.id },
      project: { id: newProjectId.raw[0].id },
    });
  },
  deleteProject(id: number) {
    return projectRepository.delete({ id });
  },
  updateProject(id: number, updatedProject: UpdateProjectDTO) {
    return projectRepository.update({ id }, updatedProject);
  },
  getProject(id: number) {
    return projectRepository.findOne({
      where: { id },
      relations: ["documents", "tags"],
    });
  },
  getProjects(userId: number) {
    return projectRepository.find({
      relations: ["userProjects", "userProjects.user"],
      where: { userProjects: { user: { id: userId } } },
    });
  },

  async getProjectSummary(id: number) {
    const header = await tagService.getTagByProjectId(id);
    const table = await projectRepository.query(projectSummaryQuery, [id]);

    return { table, header };
  },
};
