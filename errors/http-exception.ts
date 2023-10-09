export class HttpExceprtion extends Error {
  message;
  status;

  constructor(message: any, status: any) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
