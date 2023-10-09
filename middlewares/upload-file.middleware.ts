export function uploadFileMiddleware(req: any, res: any, next: any) {
  (async () => {
    if (req.file) {
      const data = await req.file();
      req.files = { file: { ...data, buffer: await data.toBuffer } };
      console.log(req.files);
    }
    console.log(req);
    next();
  })();
}
