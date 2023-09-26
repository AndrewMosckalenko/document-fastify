import { EntitySchema } from "typeorm";

export const Tag = new EntitySchema({
  name: "tags",
  tableName: "tags",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "text",
      nullable: false,
      default: "untitled",
      type: "text",
    },
  },
  relations: {
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
