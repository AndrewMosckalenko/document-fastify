import { paragraphTagRepository } from "../db/postgres";

export const paragraphTagService = {
  addTagForParagraph(tagId: number, paragraphId: number) {
    return paragraphTagRepository.insert({
      tag: { id: tagId },
      paragraph: { id: paragraphId },
    });
  },

  deleteTagFromParagraph(id: number) {
    return paragraphTagRepository.delete({ id });
  },
};
