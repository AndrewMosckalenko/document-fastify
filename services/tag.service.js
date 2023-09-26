import { pgPool } from "../db/postgres";
import { Tag } from "../entities";

export const tagService = {
  createTag(newTag) {
    return pgPool.getRepository(Tag).insert(newTag);
  },

  deleteTag(id) {
    return pgPool.getRepository(Tag).delete({ id });
  },
};
