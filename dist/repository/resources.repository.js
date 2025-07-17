"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllResources = exports.deleteResource = exports.addResource = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const addResource = async (resource) => {
    const { data, error } = await supabaseClient_1.default
        .from("resources")
        .insert([resource])
        .select();
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
    return data[0];
};
exports.addResource = addResource;
const deleteResource = async (id) => {
    const { error } = await supabaseClient_1.default.from("resources").delete().eq("id", id);
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
};
exports.deleteResource = deleteResource;
const getAllResources = async () => {
    const { data, error } = await supabaseClient_1.default
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
    return data;
};
exports.getAllResources = getAllResources;
