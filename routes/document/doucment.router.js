import { documentService, paragraphService, tagService } from "../../services";
import {
  createDocumentDesc,
  getDocumentsDesc,
  getDocumentDesc,
  deleteDocumentDesc,
  patchDocumentDesc,
  getDocumentWithParagraphsDesc,
  copyDocumentDesc,
} from "./document.descriptor";
import { createTagDesc, deleteTagDesc } from "./tag.descriptor";
import {
  createParagraphDesc,
  deleteParagraphDesc,
  patchParagraphDesc,
} from "./paragraph.descriptor";

export function documentRouter(fastify, opts, done) {
  fastify.post("", createDocumentDesc, (req, res) => {
    (async () => {
      const response = await documentService.createDocument(
        req.body,
        req.body.file[0],
      );
      res.status(200).send(response);
    })();
  });

  fastify.post("/:id", createParagraphDesc, (req, res) => {
    paragraphService
      .createParagraph({ ...req.body, document: { id: req.params["id"] } })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.post("/:id/tag", createTagDesc, (req, res) => {
    tagService
      .createTag({ ...req.body, paragraph: { id: req.params["id"] } })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.post("/:id/copy", copyDocumentDesc, (req, res) => {
    documentService.copyDocument(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });
  fastify.get("", getDocumentsDesc, (_, res) => {
    documentService.getDocuments().then((result) => {
      res.status(200).send(result);
    });
  });

  fastify.get("/:id", getDocumentDesc, (req, res) => {
    documentService.getDocumentById(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });

  fastify.get("/:id/paragraphs", getDocumentWithParagraphsDesc, (req, res) => {
    documentService
      .getDocumentWithParagraphsById(req.params["id"])
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.patch("/:id", patchDocumentDesc, (req, res) => {
    documentService
      .updateDocument({ ...req.body, id: req.params["id"] })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.patch("/paragraph/:id", patchParagraphDesc, (req, res) => {
    paragraphService
      .updateParagraph({ ...req.body, id: req.params["id"] })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.delete("/:id", deleteDocumentDesc, (req, res) => {
    documentService
      .deleteDocument(req.params["id"])
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => errorHandler(res, error));
  });

  fastify.delete("/paragraph/:id", deleteParagraphDesc, (req, res) => {
    paragraphService.deleteParagraph(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });

  fastify.delete("/:id/tag", deleteTagDesc, (req, res) => {
    tagService.deleteTag(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });

  done();
}
