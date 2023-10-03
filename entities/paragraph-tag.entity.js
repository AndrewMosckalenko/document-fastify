import { EntitySchema } from "typeorm";

export const ParagraphTag = new EntitySchema({
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
      joinColumn: {
        name: "tag_id",
      },
    },
    paragraph: {
      target: "paragraphs",
      type: "many-to-one",
      joinColumn: {
        name: "paragraph_id",
      },
    },
  },
});
