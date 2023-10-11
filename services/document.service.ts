import { documentRepository } from "../db/postgres";
import { paragraphService } from "./paragraph.service";
import { HttpExceprtion } from "../errors";
import { IParagraph } from "../entities";

import { CreateDocumentDTO, UpdateDocumentDTO } from "./dtos/document";

export const documentService = {
  getDocuments() {
    return documentRepository.find();
  },

  getDocumentById(id: number) {
    return documentRepository.findOneBy({ id });
  },

  async getDocumentWithParagraphsById(id: number) {
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

    if (!document) throw new HttpExceprtion("Document not found", 400);

    let currentParagraph = document.paragraphs.find(
      (paragraph: IParagraph) => !paragraph.prevParagraph,
    );
    const paragraphs = [];

    while (currentParagraph) {
      paragraphs.push(currentParagraph);
      currentParagraph = document.paragraphs.find(
        (paragraph: IParagraph) =>
          currentParagraph?.nextParagraph?.id === paragraph.id,
      );
    }

    return { ...document, paragraphs };
  },

  async createDocument(
    id: number,
    newDocument: CreateDocumentDTO,
    file?: File,
  ) {
    const createdDocument = await documentRepository.insert({
      ...newDocument,
      project: { id },
    });
    const newDocumentId = createdDocument.raw[0].id;

    if (file && "data" in file && file.data) {
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

  deleteDocument(id: number) {
    return documentRepository.delete({ id });
  },

  updateDocument(updateDocument: UpdateDocumentDTO) {
    return documentRepository.update({ id: updateDocument.id }, updateDocument);
  },

  async copyDocument(id: number) {
    const originDocument = await this.getDocumentWithParagraphsById(id);

    const newDocument = await this.createDocument(originDocument.project.id, {
      name: originDocument.name + "-copy",
    });
    const newDocumentId = newDocument.raw[0].id;

    for (const paragraph of originDocument.paragraphs) {
      await paragraphService.copyParagraph({
        ...paragraph,
        document: { id: newDocumentId },
      });
    }

    return newDocument;
  },
};
