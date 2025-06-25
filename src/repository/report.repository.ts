import { Report } from "../interfaces/report.interface";
import supabase from "../supabaseClient";

export const addReport = async (report: Report) => {
  const { error, data } = await supabase
    .from("reports")
    .insert([report])
    .select();
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data[0];
};

export const getReportsByDisasterId = async (disaster_id: number) => {
  const { error, data } = await supabase
    .from("reports")
    .select("*")
    .eq("disaster_id", disaster_id);
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data;
};
