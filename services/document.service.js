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
      relations: ["paragraphs", "paragraphs.tags"],
      where: { id },
    });

    document.paragraphs.sort((paragraph1, paragraph2) =>
      paragraph1.serial > paragraph2.serial ? 1 : -1,
    );
    return document;
  },

  async createDocument(newDocument, file) {
    const createdDocument = await pgPool
      .getRepository(Document)
      .insert(newDocument);
    const newDocumentId = createdDocument.raw[0].id;

    if (file) {
      const newParagraphs = file.data.toString().split("\n");
      newParagraphs.map((content, index) =>
        paragraphService.createParagraph({
          content,
          name: `paragraph-${index}`,
          document: newDocumentId,
          serial: index,
        }),
      );
    }

    return newDocument;
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

    const newDocument = await this.createDocument({
      ...originDocument,
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
