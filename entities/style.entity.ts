import { EntitySchema } from "typeorm";
import { ITag } from "./tag.entity";

export interface IStyle {
  id: number;
  color: string;
  tag: ITag[];
}

export const Style = new EntitySchema<IStyle>({
  name: "styles",
  tableName: "styles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    color: {
      type: "text",
      nullable: false,
      default: "untitled",
    },
  },
  relations: {
    tag: {
      target: "paragraphs",
      type: "one-to-many",
      inverseSide: "style",
    },
  },
});
