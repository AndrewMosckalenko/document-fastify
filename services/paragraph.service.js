import { IsNull } from "typeorm";
import { pgPool } from "../db/postgres";
import { Paragraph } from "../entities";
import { paragraphTagService } from "./paragraph-tag.service";

export const paragraphService = {
  getParagraph(id) {
    return pgPool.getRepository(Paragraph).findOneBy({ id });
  },

  async createParagraph(newParagraph, fatherParagraphId = -1) {
    console.log(newParagraph, fatherParagraphId);
    let realFather = {};
    if (fatherParagraphId < 0) {
      realFather = await pgPool.getRepository(Paragraph).findOne({
        relations: ["document", "nextParagraph"],
        where: { document: newParagraph.document, nextParagraph: IsNull() },
      });
    } else {
      realFather = await pgPool.getRepository(Paragraph).findOne({
        relations: ["document", "nextParagraph"],
        where: { document: newParagraph.document, id: fatherParagraphId },
      });
    }
    if (newParagraph.content.length > 0) {
      console.log(
        realFather,
        "gsjkdgfkjsgdkjfgksdfgkjsgdfkjsgdkfgskjdfgkjsdfkjsgdfjkgsfdkj",
      );
      if (realFather?.nextParagraph?.id) {
        await pgPool
          .getRepository(Paragraph)
          .update({ id: realFather?.id }, { nextParagraph: IsNull() });
        const newParagraphId = await pgPool.getRepository(Paragraph).insert({
          ...newParagraph,
          nextParagraph: { id: realFather?.nextParagraph?.id },
        });

        return newParagraphId;
      }

      const newParagraphId = await pgPool.getRepository(Paragraph).insert({
        ...newParagraph,
      });
      await pgPool
        .getRepository(Paragraph)
        .update(
          { id: realFather?.id },
          { nextParagraph: { id: newParagraphId.raw[0].id } },
        );

      return newParagraphId;
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
