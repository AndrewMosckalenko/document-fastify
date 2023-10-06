import { IsNull } from "typeorm";

import { paragraphRepository } from "../db/postgres";

import { paragraphTagService } from "./paragraph-tag.service";

export const paragraphService = {
  getParagraph(id) {
    return paragraphRepository.findOneBy({ id });
  },

  async createParagraph(newParagraph, fatherParagraphId = -1) {
    let realFather = {};
    if (fatherParagraphId < 0) {
      realFather = await paragraphRepository.findOne({
        relations: ["document", "nextParagraph"],
        where: { document: newParagraph.document, nextParagraph: IsNull() },
      });
    } else {
      realFather = await paragraphRepository.findOne({
        relations: ["document", "nextParagraph"],
        where: { document: newParagraph.document, id: fatherParagraphId },
      });
    }
    if (newParagraph.content.length > 0) {
      if (realFather?.nextParagraph?.id) {
        await paragraphRepository.update(
          { id: realFather?.id },
          { nextParagraph: IsNull() },
        );
        const newParagraphId = await paragraphRepository.insert({
          ...newParagraph,
          nextParagraph: { id: realFather?.nextParagraph?.id },
        });

        return newParagraphId;
      }

      const newParagraphId = await paragraphRepository.insert({
        ...newParagraph,
      });
      await paragraphRepository.update(
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
    return paragraphRepository.update(
      { id: updatedParargraph.id },
      updatedParargraph,
    );
  },

  deleteParagraph(id) {
    return paragraphRepository.delete({ id });
  },
};
