import { tagRepository } from "../db/postgres";
import { CreateTagDTO } from "./dtos/tag";

export const tagService = {
  createTag(newTag: CreateTagDTO) {
    return tagRepository.insert(newTag);
  },

  deleteTag(id: number) {
    return tagRepository.delete({ id });
  },

  getTagByProjectId(id: number) {
    return tagRepository.findBy({ project: { id } });
  },
};
