export function errorHandlerMiddleWare(
  err: any,
  req: any,
  res: any,
  next: any,
) {
  res.status(err.status || 500).send(err.message);
}
