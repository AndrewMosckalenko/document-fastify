import { NextFunction } from "@fastify/middie";
import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";

import { NotAuthException } from "../errors";
import { userService } from "../services";
import { IUser } from "../entities";

export interface AuthIncomingMessage extends IncomingMessage {
  user: IUser | null;
}

export function authMiddleware(
  req: AuthIncomingMessage,
  _res: ServerResponse,
  next: NextFunction,
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const payload = jwt.decode(token || "");
    if (typeof payload === "object") {
<<<<<<< Updated upstream
      userService.getUserByEmail(payload?.email).then((result: any) => {
        req.user = result;
        console.log(req.user);
        next();
      });
=======
      userService
        .getUserByEmail(payload?.email)
        .then((result: IUser | null) => {
          req.user = result;
          next();
        });
    } else {
      throw new NotAuthException();
>>>>>>> Stashed changes
    }
    throw new NotAuthException();
  } catch (e) {
    throw new NotAuthException();
  }
}
