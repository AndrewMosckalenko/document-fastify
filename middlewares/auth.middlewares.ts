import jwt from "jsonwebtoken";

import { NotAuthException } from "../errors";
import { userService } from "../services";

export function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = jwt.decode(token);
    if (typeof payload === "object") {
      userService.getUserByEmail(payload?.email).then((result: any) => {
        req.user = result;
        console.log(req.user);
        next();
      });
    }
    throw new NotAuthException();
  } catch (e) {
    throw new NotAuthException();
  }
}
