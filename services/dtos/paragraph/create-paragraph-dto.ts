import { IParagraphTag } from "../../../entities";

export interface CreateParagraphDTO {
  name: string;
  content: string;
  document: { id: number };
  paragraphTags?: IParagraphTag[];
}
