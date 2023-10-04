import { EntitySchema } from "typeorm";

export const userProjects = new EntitySchema({
  name: "user-projects",
  tableName: "user-projects",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
  },
  relations: {
    user: {
      target: "users",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
      },
    },
    project: {
      target: "projects",
      type: "many-to-one",
      joinColumn: {
        name: "project_id",
      },
    },
  },
});
