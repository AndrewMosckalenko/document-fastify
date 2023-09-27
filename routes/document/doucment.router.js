import { documentService, paragraphService, tagService } from "../../services";

export function documentRouter(fastify, opts, done) {
  fastify.post("", (req, res) => {
    (async () => {
      const response = await documentService.createDocument(
        req.body,
        req.body.file[0],
      );
      res.status(200).send(response);
    })();
  });

  fastify.post("/:id", (req, res) => {
    paragraphService
      .createParagraph({ ...req.body, document: { id: req.params["id"] } })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.post("/:id/tag", (req, res) => {
    tagService
      .createTag({ ...req.body, paragraph: { id: req.params["id"] } })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.post("/:id/copy", (req, res) => {
    documentService.copyDocument(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });
  fastify.get("", (_, res) => {
    documentService.getDocuments().then((result) => {
      res.status(200).send(result);
    });
  });

  fastify.get("/:id", (req, res) => {
    documentService.getDocumentById(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });

  fastify.get("/:id/paragraphs", (req, res) => {
    documentService
      .getDocumentWithParagraphsById(req.params["id"])
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.patch("/:id", (req, res) => {
    documentService
      .updateDocument({ ...req.body, id: req.params["id"] })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.patch("/paragraph/:id", (req, res) => {
    paragraphService
      .updateParagraph({ ...req.body, id: req.params["id"] })
      .then((result) => {
        res.status(200).send(result);
      });
  });

  fastify.delete("/:id", (req, res) => {
    documentService
      .deleteDocument(req.params["id"])
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => errorHandler(res, error));
  });

  fastify.delete("/paragraph/:id", (req, res) => {
    paragraphService.deleteParagraph(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });

  fastify.delete("/:id/tag", (req, res) => {
    tagService.deleteTag(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });

  done();
}
