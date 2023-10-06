import { documentRepository } from "../db/postgres";

import { paragraphService } from "./paragraph.service";

export const documentService = {
  getDocuments() {
    return documentRepository.find();
  },

  getDocumentById(id) {
    return documentRepository.findOneBy({ id });
  },

  async getDocumentWithParagraphsById(id) {
    const document = await documentRepository.findOne({
      relations: [
        "paragraphs",
        "paragraphs.paragraphTags",
        "paragraphs.paragraphTags.tag",
        "paragraphs.nextParagraph",
        "paragraphs.prevParagraph",
        "project",
      ],
      where: { id },
    });

    let currentParagraph = document.paragraphs.find(
      (paragraph) => !paragraph.prevParagraph,
    );
    const paragraphs = [];

    while (currentParagraph) {
      paragraphs.push(currentParagraph);
      currentParagraph = document.paragraphs.find(
        (paragraph) => currentParagraph.nextParagraph?.id === paragraph.id,
      );
    }

    return { ...document, paragraphs };
  },

  async createDocument(id, newDocument, file) {
    const createdDocument = await documentRepository.insert({
      ...newDocument,
      project: { id },
    });
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
    return documentRepository.delete({ id });
  },

  updateDocument(updateDocument) {
    return documentRepository.update({ id: updateDocument.id }, updateDocument);
  },

  async copyDocument(id) {
    const originDocument = await this.getDocumentWithParagraphsById(id);

    const newDocument = await this.createDocument(originDocument.project.id, {
      name: originDocument.name + "-copy",
    });
    const newDocumentId = newDocument.raw[0].id;

    for (const paragraph of originDocument.paragraphs) {
      await paragraphService.copyParagraph({
        ...paragraph,
        document: { id: newDocumentId },
        nextParagraph: null,
        prevParagraph: null,
      });
    }

    return newDocument;
  },
};
