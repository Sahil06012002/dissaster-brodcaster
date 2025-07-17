import supabase from "../supabaseClient";
import { Resource } from "../interfaces/resources.interface";

export const addResource = async (resource: Resource) => {
  const { data, error } = await supabase
    .from("resources")
    .insert([resource])
    .select();
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data[0];
};

export const deleteResource = async (id: string) => {
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
};

export const getAllResources = async () => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data;
};
