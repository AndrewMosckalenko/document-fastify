import { paragraphTagRepository } from "../db/postgres";

export const paragraphTagService = {
  addTagForParagraph(tagId, paragraphId) {
    return paragraphTagRepository.insert({
      tag: { id: tagId },
      paragraph: { id: paragraphId },
    });
  },

  deleteTagFromParagraph(id) {
    return paragraphTagRepository.delete({ id });
  },
};
