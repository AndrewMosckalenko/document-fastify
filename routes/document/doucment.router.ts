import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { documentService } from "../../services";
import { IDocument } from "../../entities";
import {
  createDocumentDesc,
  getDocumentsDesc,
  getDocumentDesc,
  deleteDocumentDesc,
  patchDocumentDesc,
  getDocumentWithParagraphsDesc,
  copyDocumentDesc,
} from "./document.descriptor";
import {
  CreateDocumentDTO,
  UpdateDocumentDTO,
} from "../../services/dtos/document";

export function documentRouter(
  fastify: FastifyInstance,
  _opts: Object,
  done: (err?: Error) => void,
) {
  fastify.post(
    "/:id",
    createDocumentDesc,
    (
      req: FastifyRequest<{ Params: { id: number }; Body: CreateDocumentDTO }>,
      res: FastifyReply,
    ) => {
      (async () => {
        const response = await documentService.createDocument(
          req.params["id"],
          req.body,
          req.body.file?.[0],
        );
        res.status(200).send(response);
      })();
    },
  );

  fastify.post(
    "/:id/copy",
    copyDocumentDesc,
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      documentService.copyDocument(req.params["id"]).then((result) => {
        res.status(200).send(result);
      });
    },
  );
  fastify.get("", getDocumentsDesc, (_: FastifyRequest, res: FastifyReply) => {
    documentService.getDocuments().then((result: IDocument[]) => {
      res.status(200).send(result);
    });
  });

  fastify.get(
    "/:id",
    getDocumentDesc,
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      documentService
        .getDocumentById(req.params["id"])
        .then((result: IDocument | null) => {
          res.status(200).send(result);
        });
    },
  );

  fastify.get(
    "/:id/paragraphs",
    getDocumentWithParagraphsDesc,
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      documentService
        .getDocumentWithParagraphsById(req.params["id"])
        .then((result: IDocument | null) => {
          res.status(200).send(result);
        });
    },
  );

  fastify.patch(
    "/:id",
    patchDocumentDesc,
    (
      req: FastifyRequest<{ Params: { id: number }; Body: UpdateDocumentDTO }>,
      res: FastifyReply,
    ) => {
      documentService
        .updateDocument({ ...req.body, id: req.params["id"] })
        .then((result) => {
          res.status(200).send(result);
        });
    },
  );

  fastify.delete(
    "/:id",
    deleteDocumentDesc,
    (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
      documentService.deleteDocument(req.params["id"]).then((result) => {
        res.status(200).send(result);
      });
    },
  );
  done();
}
