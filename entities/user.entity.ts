import { EntitySchema } from "typeorm";
import { IUserProject } from "./user_projects.entity";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  userProjects: IUserProject;
}

export const User = new EntitySchema<IUser>({
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
    },
    email: {
      type: "text",
      nullable: false,
      default: "untitled",
      unique: true,
    },
    password: {
      type: "text",
      nullable: false,
      default: "untitled",
    },
  },
  relations: {
    userProjects: {
      target: "user-projects",
      type: "one-to-many",
      inverseSide: "user",
    },
  },
});
