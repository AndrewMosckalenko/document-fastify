import { tagRepository } from "../db/postgres";
import { HttpExceprtion } from "../errors";
import { CreateTagDTO } from "./dtos/tag";
import { paragraphTagService } from "./paragraph-tag.service";

export const tagService = {
  createTag(newTag: CreateTagDTO) {
    return tagRepository.insert(newTag);
  },

  async createAndApplyTag(newTag: CreateTagDTO) {
    if (newTag.paragraphId) {
      const tagId = await this.createTag(newTag);
      return paragraphTagService.addTagForParagraph(
        tagId.raw[0].id,
        newTag.paragraphId,
      );
    }
    throw new HttpExceprtion("Bad request", 400);
  },

  deleteTag(id: number) {
    return tagRepository.delete({ id });
  },

  getTagByProjectId(id: number) {
    return tagRepository.find({
      where: { project: { id } },
      order: { id: "ASC" },
    });
  },
};
