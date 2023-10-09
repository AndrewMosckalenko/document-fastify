import jwt from "jsonwebtoken";

import { NotAuthException } from "../errors";
import { userService } from "./user.service";

export const authService = {
  async signIn({ email, password }: any) {
    try {
      const user = await userService.getUserByEmail(email);

      if (user?.password !== password || !user) throw new NotAuthException();
      let token;
      if (process.env.JWT_SECRET) {
        token = await jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
      } else {
        throw new NotAuthException();
      }

      return {
        access_token: token,
      };
    } catch (_) {
      throw new NotAuthException();
    }
  },

  async signUp(newUser: any) {
    try {
      await userService.createUser(newUser);
      let token;
      if (process.env.JWT_SECRET) {
        token = await jwt.sign(
          { email: newUser.email },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRE,
          },
        );
      } else {
        throw new NotAuthException();
      }

      return {
        access_token: token,
      };
    } catch (_) {
      throw new NotAuthException();
    }
  },
};
