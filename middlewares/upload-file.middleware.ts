export function uploadFileMiddleware(req, res, next) {
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
