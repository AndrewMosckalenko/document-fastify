import { pgPool } from "../db/postgres";
import { Project, userProjects } from "../entities";
import { HttpExceprtion } from "../errors";
import { simpleDocument, simpleProject, simpleTag } from "../utils";

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

  async getProjectSummary(id) {
    const project = await pgPool.getRepository(Project).findOne({
      relations: [
        "documents",
        "tags",
        "documents.paragraphs",
        "documents.paragraphs.paragraphTags",
        "documents.paragraphs.paragraphTags.tag",
      ],
      where: { id },
    });

    if (!project) throw new HttpExceprtion("Bad request", 400);

    const documentTagTable = {};
    for (const document of project.documents) {
      documentTagTable[document.id] = {};
      for (const tag of project.tags) {
        documentTagTable[document.id][tag.id] = 0;
      }
      for (const paragraph of document.paragraphs) {
        for (const paragraphTag of paragraph.paragraphTags) {
          documentTagTable[document.id][paragraphTag.tag.id] += 1;
        }
      }
    }

    const summary = {
      project: simpleProject(project),
      header: { tags: project.tags.map(simpleTag) },
      table: project.documents.map((document) => ({
        document: simpleDocument(document),
        tags: project.tags.map((tag) => ({
          tag: simpleTag(tag),
          count: documentTagTable[document.id][tag.id],
        })),
      })),
    };

    return summary;
  },
};
