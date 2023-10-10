import { EntitySchema } from "typeorm";
import { IParagraph } from "./paragraph.entity";
import { ITag } from "./tag.entity";

export const ParagraphTag = new EntitySchema<IParagraphTag>({
  name: "paragraph-tags",
  tableName: "paragraph-tags",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
  },
  relations: {
    tag: {
      target: "tags",
      type: "many-to-one",
      onDelete: "CASCADE",
      joinColumn: {
        name: "tag_id",
      },
    },
    paragraph: {
      target: "paragraphs",
      type: "many-to-one",
      onDelete: "CASCADE",
      joinColumn: {
        name: "paragraph_id",
      },
    },
  },
});

export interface IParagraphTag {
  id: number;
  paragraph: IParagraph;
  tag: ITag;
}
