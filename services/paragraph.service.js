import { pgPool } from "../db/postgres";
import { Paragraph } from "../entities";
import { tagService } from "./tag.service";

export const paragraphService = {
  getParagraph(id) {
    return pgPool.getRepository(Paragraph).findOneBy({ id });
  },

  createParagraph(newParagraph) {
    return pgPool.getRepository(Paragraph).insert(newParagraph);
  },

  async copyParagraph(originParagraph) {
    const newParagraph = await this.createParagraph(originParagraph);
    const newParagraphId = newParagraph.raw[0].id;
    const createTagPromises = originParagraph.tags.map((tag) =>
      tagService.createTag({ ...tag, paragraph: { id: newParagraphId } }),
    );

    return Promise.all(createTagPromises);
  },

  updateParagraph(updatedParargraph) {
    return pgPool
      .getRepository(Paragraph)
      .update({ id: updatedParargraph.id }, updatedParargraph);
  },

  deleteParagraph(id) {
    return pgPool.getRepository(Paragraph).delete({ id });
  },
};
