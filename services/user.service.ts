import { userRepository } from "../db/postgres";

export const userService = {
  getUserByEmail(email) {
    return userRepository.findOneBy({ email });
  },

  createUser(newUser) {
    return userRepository.insert(newUser);
  },
};
