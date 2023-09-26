import { EntitySchema } from "typeorm";

export const Document = new EntitySchema({
  name: "documents",
  tableName: "documents",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
      nullable: false,
      default: "untitled",
      type: "text",
    },
  },
  relations: {
    paragraphs: {
      target: "paragraphs",
      type: "one-to-many",
      inverseSide: "document",
    },
  },
});
