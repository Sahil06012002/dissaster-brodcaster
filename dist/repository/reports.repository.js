"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReport = exports.updateReport = exports.getReportById = exports.getAllReports = exports.createReport = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const createReport = async (newReport) => {
    const { data, error } = await supabaseClient_1.default
        .from("reports")
        .insert([newReport])
        .select();
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
    return data[0];
};
exports.createReport = createReport;
const getAllReports = async () => {
    const { data, error } = await supabaseClient_1.default
        .from("reports")
        .select("*, Users (name)")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
    return data;
};
exports.getAllReports = getAllReports;
const getReportById = async (id) => {
    const { data, error } = await supabaseClient_1.default
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
exports.getReportById = getReportById;
const updateReport = async (id, updatedReport) => {
    const { data, error } = await supabaseClient_1.default
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
exports.updateReport = updateReport;
const deleteReport = async (id) => {
    const { error } = await supabaseClient_1.default.from("reports").delete().eq("id", id);
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
};
exports.deleteReport = deleteReport;
