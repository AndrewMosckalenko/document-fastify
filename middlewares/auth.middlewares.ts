import { NextFunction } from "@fastify/middie";
import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";

import { NotAuthException } from "../errors";
import { userService } from "../services";

export function authMiddleware(
  req: IncomingMessage,
  _res: ServerResponse,
  next: NextFunction,
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) throw new NotAuthException();
    const payload = jwt.decode(token);
    if (typeof payload === "object") {
      userService.getUserByEmail(payload?.email).then((result) => {
        // @ts-ignore
        req.user = result;
        next();
      });
    } else {
      throw new NotAuthException();
    }
  } catch (e) {
    throw new NotAuthException();
  }
}
