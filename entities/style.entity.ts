import { EntitySchema } from "typeorm";

export const Style = new EntitySchema({
  name: "styles",
  tableName: "styles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    color: {
      type: "text",
      nullable: false,
      default: "untitled",
      type: "text",
    },
  },
  relations: {
    tag: {
      target: "paragraphs",
      type: "one-to-many",
      inverseSide: "style",
    },
  },
});
