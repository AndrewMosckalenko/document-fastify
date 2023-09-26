export class HttpExceprtion extends Error {
  message;
  status;

  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
