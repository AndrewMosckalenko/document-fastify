import { pgPool } from "../db/postgres";
import { User } from "../entities";

export const userService = {
  getUserByEmail(email) {
    return pgPool.getRepository(User).findOneBy({ email });
  },

  createUser(newUser) {
    return pgPool.getRepository(User).insert(newUser);
  },
};
