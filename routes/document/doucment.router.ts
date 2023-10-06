import {
  paragraphTagService,
  documentService,
  paragraphService,
  tagService,
} from "../../services";
import {
  createDocumentDesc,
  getDocumentsDesc,
  getDocumentDesc,
  deleteDocumentDesc,
  patchDocumentDesc,
  getDocumentWithParagraphsDesc,
  copyDocumentDesc,
} from "./document.descriptor";

export function documentRouter(fastify, opts, done) {
  fastify.post("/:id", createDocumentDesc, (req, res) => {
    (async () => {
      const response = await documentService.createDocument(
        req.params["id"],
        req.body,
        req.body.file[0],
      );
      res.status(200).send(response);
    })();
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

  fastify.delete("/:id", deleteDocumentDesc, (req, res) => {
    documentService
      .deleteDocument(req.params["id"])
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => errorHandler(res, error));
  });

  done();
}
