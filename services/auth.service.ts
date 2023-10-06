import jwt from "jsonwebtoken";

import { NotAuthException } from "../errors";
import { userService } from "./user.service";

export const authService = {
  async signIn({ email, password }) {
    try {
      const user = await userService.getUserByEmail(email);

      if (user.password !== password || !user) throw new NotAuthException();

      const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      return {
        access_token: token,
      };
    } catch (_) {
      throw new NotAuthException();
    }
  },

  async signUp(newUser) {
    try {
      const user = await userService.createUser(newUser);

      const token = await jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE },
      );

      return {
        access_token: token,
      };
    } catch (_) {
      throw new NotAuthException();
    }
  },
};
