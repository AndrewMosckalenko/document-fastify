import { MultipartFile } from "@fastify/multipart";

export interface CreateDocumentDTO {
  name: string;
  file?: MultipartFile[];
}
