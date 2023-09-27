import { HttpExceprtion } from "../errors";

export function txtFileCheckerMiddleware(req, _, next) {
  console.log(req.files?.file);
  if (!req.files?.file || req.files?.file.mimetype.split("/")[0] !== "text") {
    throw new HttpExceprtion("file is not found", 400);
  }
  next();
}
