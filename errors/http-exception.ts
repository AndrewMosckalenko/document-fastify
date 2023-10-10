export class HttpExceprtion extends Error {
  message;
  status;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
