import { pgPool } from "../db/postgres";
import { Document } from "../entities";
import { paragraphService } from "./paragraph.service";

export const documentService = {
  getDocuments() {
    return pgPool.getRepository(Document).find();
  },

  getDocumentById(id) {
    return pgPool.getRepository(Document).findOneBy({ id });
  },

  async getDocumentWithParagraphsById(id) {
    const document = await pgPool.getRepository(Document).findOne({
      relations: [
        "paragraphs",
        "paragraphs.paragraphTags",
        "paragraphs.paragraphTags.tag",
        "project",
      ],
      where: { id },
    });

    let currentParagraph = document.paragraphs.filter(
      (paragraph) => !paragraph.prevParagraph,
    );
    const paragraphs = [];

    while (currentParagraph) {
      paragraphs.push(currentParagraph);
      currentParagraph = currentParagraph.nextParagraph;
    }

    return { ...document, paragraphs };
  },

  async createDocument(id, newDocument, file) {
    const createdDocument = await pgPool
      .getRepository(Document)
      .insert({ ...newDocument, project: { id } });
    const newDocumentId = createdDocument.raw[0].id;

    if (file) {
      const newParagraphs = file.data.toString().split("\n");
      for (const content of newParagraphs) {
        await paragraphService.createParagraph({
          content,
          name: `paragraph`,
          document: { id: newDocumentId },
        });
      }
    }

    return createdDocument;
  },

  deleteDocument(id) {
    return pgPool.getRepository(Document).delete({ id });
  },

  updateDocument(updateDocument) {
    return pgPool
      .getRepository(Document)
      .update({ id: updateDocument.id }, updateDocument);
  },

  async copyDocument(id) {
    const originDocument = await this.getDocumentWithParagraphsById(id);

    const newDocument = await this.createDocument(originDocument.project.id, {
      name: originDocument.name + "-copy",
    });
    const newDocumentId = newDocument.raw[0].id;

    const createParargraphPromises = originDocument.paragraphs.map(
      (paragraph) =>
        paragraphService.copyParagraph({
          ...paragraph,
          document: { id: newDocumentId },
        }),
    );

    return Promise.all(createParargraphPromises);
  },
};
