import { EntitySchema } from "typeorm";
import { IDocument } from "./document.entity";
import { IParagraphTag } from "./paragraph-tag.entity";

export const Paragraph = new EntitySchema<IParagraph>({
  name: "paragraphs",
  tableName: "paragraphs",
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
    content: {
      type: "text",
      nullable: false,
      default: "untitled",
    },
  },
  relations: {
    document: {
      target: "documents",
      type: "many-to-one",
      onDelete: "CASCADE",
      joinColumn: {
        name: "document_id",
      },
    },
    paragraphTags: {
      target: "paragraph-tags",
      type: "one-to-many",
      inverseSide: "paragraph",
    },
    nextParagraph: {
      target: "paragraphs",
      type: "one-to-one",
      onDelete: "CASCADE",
      joinColumn: {
        name: "next_paragraph_id",
      },
    },
    prevParagraph: {
      target: "paragraphs",
      type: "one-to-one",
      inverseSide: "nextParagraph",
    },
  },
});

export interface IParagraph {
  id: number;
  name: string;
  content: string;
  document: IDocument;
  paragraphTags: IParagraphTag[];
  nextParagraph: IParagraph;
  prevParagraph: IParagraph;
}
