import { EntitySchema } from "typeorm";
import { IDocument } from "./document.entity";
import { ITag } from "./tag.entity";
import { IUserProject } from "./user_projects.entity";

export interface IProject {
  id: number;
  name: string;
  documents: IDocument[];
  tags: ITag[];
  userProjects: IUserProject[];
}

export const Project = new EntitySchema<IProject>({
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
    },
  },
  relations: {
    documents: {
      target: "documents",
      type: "one-to-many",
      inverseSide: "project",
    },
    tags: {
      target: "tags",
      type: "one-to-many",
      inverseSide: "project",
    },
    userProjects: {
      target: "user-projects",
      type: "one-to-many",
      inverseSide: "project",
    },
  },
});
