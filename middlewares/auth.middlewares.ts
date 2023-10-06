import jwt from "jsonwebtoken";

import { NotAuthException } from "../errors";
import { userService } from "../services";

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = jwt.decode(token);
    userService.getUserByEmail(payload.email).then((result) => {
      req.user = result;
      console.log(req.user);
      next();
    });
  } catch (e) {
    throw new NotAuthException();
  }
}
