import { userRepository } from "../db/postgres";
import { CreateUserDTO } from "./dtos/user";

export const userService = {
  getUserByEmail(email: string) {
    return userRepository.findOneBy({ email });
  },

  createUser(newUser: CreateUserDTO) {
    return userRepository.insert(newUser);
  },
};
