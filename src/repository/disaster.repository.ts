import supabase from "../supabaseClient";
import { Disaster } from "../interfaces/disaster.interface";

export const submitDisaster = async (newDisaster: Disaster) => {
  console.log("original:", newDisaster);

  // const lng = newDisaster.coordinates?.coordinates[0];
  // const lat = newDisaster.coordinates?.coordinates[1];

  // const geometryWKT = `POINT(${lng} ${lat})`;

  const payload = {
    ...newDisaster,
    // coordinates: geometryWKT,
  };

  const { data, error } = await supabase
    .from("disasters")
    .insert([payload])
    .select("*, Users (name)");

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }

  return data[0];
};

export const getAllDisasters = async () => {
  const { data, error } = await supabase
    .from("disasters")
    .select("*, Users (name)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data;
};

export const getDisasterById = async (id: string) => {
  const { data, error } = await supabase
    .from("disasters")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data;
};

export const updateDisaster = async (
  id: string,
  updatedDisaster: Partial<Disaster>
) => {
  const { data, error } = await supabase
    .from("disasters")
    .update(updatedDisaster)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data[0];
};

export const deleteDisaster = async (id: string) => {
  const { error } = await supabase.from("disasters").delete().eq("id", id);
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
};
