import { pgPool } from "../db/postgres";
import { ParagraphTag } from "../entities";

export const paragraphTagService = {
  addTagForParagraph(tagId, paragraphId) {
    return pgPool
      .getRepository(ParagraphTag)
      .insert({ tag: { id, tagId }, paragraph: { id: paragraphId } });
  },

  deleteTagFromParagraph(id) {
    return pgPool.getRepository(ParagraphTag).delete({ id });
  },
};
