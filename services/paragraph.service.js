import { IsNull } from "typeorm";
import { pgPool } from "../db/postgres";
import { Paragraph } from "../entities";
import { paragraphTagService } from "./paragraph-tag.service";

export const paragraphService = {
  getParagraph(id) {
    return pgPool.getRepository(Paragraph).findOneBy({ id });
  },

  async createParagraph(newParagraph, fatherParagraphId = -1) {
    let realFatherParagraphId = fatherParagraphId;

    if (realFatherParagraphId < 0) {
      const lastParagraph = await pgPool.getRepository(Paragraph).findOne({
        relations: ["document", "nextParagraph"],
        where: { document: newParagraph.document, nextParagraph: IsNull() },
      });
      realFatherParagraphId = lastParagraph?.id || null;
    }

    if (newParagraph.content.length > 0) {
      const newParagraphId = await pgPool.getRepository(Paragraph).insert({
        ...newParagraph,
        prevParagraph: { id: realFatherParagraphId },
      });
      return pgPool
        .getRepository(Paragraph)
        .update(
          { id: realFatherParagraphId },
          { nextParagraph: { id: newParagraphId.raw[0].id } },
        );
    }
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
