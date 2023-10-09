import { EntitySchema } from "typeorm";
import { IParagraph } from "./paragraph.entity";
import { IProject } from "./project.entity";

export interface IDocument {
  id: number;
  name: string;
  paragraphs: IParagraph[];
  project: IProject;
}

export const Document = new EntitySchema<IDocument>({
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
