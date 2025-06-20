import { User } from "../interfaces/users.interface";
import * as userRepository from "../repository/users.repository";

export const createUser = async (userData: User): Promise<User> => {
  return await userRepository.createUser(userData);
};
