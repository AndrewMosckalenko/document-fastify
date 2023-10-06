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
    project: {
      target: "projects",
      type: "many-to-one",
      onDelete: "CASCADE",
      joinColumn: {
        name: "project_id",
      },
    },
    paragraphs: {
      target: "paragraphs",
      type: "one-to-many",
      inverseSide: "document",
    },
  },
});
