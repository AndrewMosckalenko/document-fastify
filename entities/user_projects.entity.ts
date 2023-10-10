import { EntitySchema } from "typeorm";
import { IProject } from "./project.entity";
import { IUser } from "./user.entity";

export interface IUserProject {
  id: number;
  user: IUser;
  project: IProject;
}

export const UserProject = new EntitySchema<IUserProject>({
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
      onDelete: "CASCADE",
      joinColumn: {
        name: "user_id",
      },
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
