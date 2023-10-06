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
    paragraphTags: {
      target: "paragraph-tags",
      type: "one-to-many",
      inverseSide: "tag",
    },
    project: {
      target: "projects",
      type: "many-to-one",
      onDelete: "CASCADE",
      joinColumn: {
        name: "project_id",
      },
    },
  },
});
