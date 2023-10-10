import { IsNull } from "typeorm";

import { paragraphRepository } from "../db/postgres";
import { paragraphTagService } from "./paragraph-tag.service";
import { IParagraph, IParagraphTag } from "../entities";

import { CreateParagraphDTO, UpdateParagraphDTO } from "./dtos/paragraph";

export const paragraphService = {
  getParagraph(id: number) {
    return paragraphRepository.findOneBy({ id });
  },

  async createParagraph(
    newParagraph: CreateParagraphDTO,
    fatherParagraphId: number = -1,
  ) {
    let realFather: IParagraph | null;
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
          { nextParagraph: undefined },
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

  async copyParagraph(originParagraph: CreateParagraphDTO) {
    const newParagraph = await this.createParagraph(originParagraph);
    const newParagraphId = newParagraph?.raw[0].id;
    const createTagPromises =
      originParagraph.paragraphTags?.map((localTag: IParagraphTag) =>
        paragraphTagService.addTagForParagraph(localTag.tag.id, newParagraphId),
      ) || [];

    return Promise.all(createTagPromises);
  },

  updateParagraph(updatedParargraph: UpdateParagraphDTO) {
    return paragraphRepository.update(
      { id: updatedParargraph.id },
      updatedParargraph,
    );
  },

  deleteParagraph(id: number) {
    return paragraphRepository.delete({ id });
  },
};
