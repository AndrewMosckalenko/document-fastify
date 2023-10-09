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

export function documentRouter(fastify: any, opts: any, done: any) {
  fastify.post("/:id", createDocumentDesc, (req: any, res: any) => {
    (async () => {
      const response = await documentService.createDocument(
        req.params["id"],
        req.body,
        req.body.file[0],
      );
      res.status(200).send(response);
    })();
  });

  fastify.post("/:id/copy", copyDocumentDesc, (req: any, res: any) => {
    documentService.copyDocument(req.params["id"]).then((result) => {
      res.status(200).send(result);
    });
  });
  fastify.get("", getDocumentsDesc, (_: any, res: any) => {
    documentService.getDocuments().then((result: any) => {
      res.status(200).send(result);
    });
  });

  fastify.get("/:id", getDocumentDesc, (req: any, res: any) => {
    documentService.getDocumentById(req.params["id"]).then((result: any) => {
      res.status(200).send(result);
    });
  });

  fastify.get(
    "/:id/paragraphs",
    getDocumentWithParagraphsDesc,
    (req: any, res: any) => {
      documentService
        .getDocumentWithParagraphsById(req.params["id"])
        .then((result) => {
          res.status(200).send(result);
        });
    },
  );

  fastify.patch("/:id", patchDocumentDesc, (req: any, res: any) => {
    documentService
      .updateDocument({ ...req.body, id: req.params["id"] })
      .then((result: any) => {
        res.status(200).send(result);
      });
  });

  fastify.delete("/:id", deleteDocumentDesc, (req: any, res: any) => {
    documentService.deleteDocument(req.params["id"]).then((result: any) => {
      res.status(200).send(result);
    });
  });

  done();
}
