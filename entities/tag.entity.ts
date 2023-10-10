import { EntitySchema } from "typeorm";
import { IParagraphTag } from "./paragraph-tag.entity";
import { IProject } from "./project.entity";

export interface ITag {
  id: number;
  title: string;
  paragraphTags: IParagraphTag[];
  project: IProject;
}

export const Tag = new EntitySchema<ITag>({
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
