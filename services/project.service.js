import { projectRepository, userProjectRepository } from "../db/postgres";
import { tagService } from "../services";

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
      'SELECT\
      jsonb_build_object(\
        \'id\', document_id,\
        \'name\', document_name\
      ) as document,\
      jsonb_agg(\
        jsonb_build_object(\
          \'tag\', jsonb_build_object(\
            \'id\', tag_id,\
            \'title\', tag_title\
          ),\
          \'count\', paragraps_count\
        )\
      ) as tags\
      FROM (SELECT\
        documents.id as document_id,\
        documents.name as document_name,\
        tags.id AS tag_id,\
        tags.title AS tag_title,\
        COUNT(paragraphs.id) as paragraps_count\
      FROM documents\
      full outer join "tags" on "tags"."project_id" = "documents"."project_id"\
      left join "paragraph-tags" on "paragraph-tags"."tag_id" = "tags"."id"\
      left join "paragraphs" on "paragraphs"."id" = "paragraph-tags"."paragraph_id"\
      where "documents"."project_id" = $1\
      group by documents.id, tags.id) t\
      group by document_id, document_name;',
      [id],
    );

    return { table, header };
  },
};
