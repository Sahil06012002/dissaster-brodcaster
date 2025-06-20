import supabase from "../supabaseClient";
import { Report } from "../interfaces/reports.interface";

export const createReport = async (newReport: Report) => {
  const { data, error } = await supabase
    .from("reports")
    .insert([newReport])
    .select();
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data[0];
};

export const getAllReports = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("*, Users (name)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data;
};

export const getReportById = async (id: string) => {
  const { data, error } = await supabase
    .from("reports")
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

export const updateReport = async (
  id: string,
  updatedReport: Partial<Report>
) => {
  const { data, error } = await supabase
    .from("reports")
    .update(updatedReport)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  return data[0];
};

export const deleteReport = async (id: string) => {
  const { error } = await supabase.from("reports").delete().eq("id", id);
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
};
