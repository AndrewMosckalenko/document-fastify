import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "users",
  tableName: "users",
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
    email: {
      type: "text",
      nullable: false,
      default: "untitled",
      type: "text",
      unique: true,
    },
    password: {
      type: "text",
      nullable: false,
      default: "untitled",
      type: "text",
    },
  },
});
