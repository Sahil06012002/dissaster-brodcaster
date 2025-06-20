import { User } from "../interfaces/users.interface";
import supabase from "../supabaseClient";

export const createUser = async (userData: User): Promise<User> => {
  const { data, error } = await supabase
    .from("Users")
    .insert([userData])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};
