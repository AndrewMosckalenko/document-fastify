import { pgPool } from "../db/postgres";
import { Paragraph } from "../entities";
import { paragraphTagService } from "./paragraph-tag.service";

export const paragraphService = {
  getParagraph(id) {
    return pgPool.getRepository(Paragraph).findOneBy({ id });
  },

  createParagraph(newParagraph) {
    if (newParagraph.content.length > 0)
      return pgPool.getRepository(Paragraph).insert(newParagraph);
    return null;
  },

  async copyParagraph(originParagraph) {
    const newParagraph = await this.createParagraph(originParagraph);
    const newParagraphId = newParagraph.raw[0].id;
    const createTagPromises = originParagraph.paragraphTags.map((localTag) =>
      paragraphTagService.addTagForParagraph(localTag.tag.id, newParagraphId),
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
