import { EntitySchema } from "typeorm";

export const Project = new EntitySchema({
  name: "projects",
  tableName: "projects",
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
    documents: {
      target: "documents",
      type: "one-to-many",
      inverseSide: "project",
    },
    tags: {
      target: 'tags',
      type: 'one-to-many',
      inverseSide: "project",
    },
    userProjects: {
      target: 'user-projects',
      type: 'one-to-many',
      inverseSide: "project",
    }
  },
});
