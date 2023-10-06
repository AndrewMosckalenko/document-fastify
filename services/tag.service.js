import { tagRepository } from "../db/postgres";

export const tagService = {
  createTag(newTag) {
    return tagRepository.insert(newTag);
  },

  deleteTag(id) {
    return tagRepository.delete({ id });
  },

  getTagByProjectId(id) {
    return tagRepository.findBy({ project: { id } });
  },
};
