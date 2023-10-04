import { EntitySchema } from "typeorm";

export const Paragraph = new EntitySchema({
  name: "paragraphs",
  tableName: "paragraphs",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    serial: {
      type: "int",
      nullable: false,
      default: 0,
    },
    name: {
      type: "text",
      nullable: false,
      default: "untitled",
      type: "text",
    },
    content: {
      type: "text",
      nullable: false,
      default: "untitled",
      type: "text",
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
