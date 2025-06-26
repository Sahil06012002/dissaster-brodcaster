import { Report } from "../interfaces/report.interface";
import supabase from "../supabaseClient";

export const addReport = async (report: Report) => {
  const { error, data } = await supabase
    .from("reports")
    .insert([report])
    .select("*, Users (name)");
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data[0];
};

export const getReportsByDisasterId = async (disaster_id: number) => {
  const { error, data } = await supabase
    .from("reports")
    .select(
      `
      *,
      Users(name)
    `
    )
    .eq("disaster_id", disaster_id);
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  const flattened = data.map((item) => {
    const { Users, image_link, ...rest } = item;
    let images = [];

    if (image_link) {
      images = image_link.split("|");
    }
    return {
      ...rest,
      images,
      user_name: Users?.name || null,
    };
  });

  return flattened;
};
