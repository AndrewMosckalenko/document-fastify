import { HttpExceprtion } from "./http-exception";

export class NotAuthException extends HttpExceprtion {
  message = "Not authed";
  status = 401;

  constructor() {
    super("Not authed", 401);
  }
}
