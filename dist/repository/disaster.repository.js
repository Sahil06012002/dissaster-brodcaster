"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDisaster = exports.updateDisaster = exports.getDisasterById = exports.getAllDisasters = exports.submitDisaster = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const submitDisaster = async (newDisaster) => {
    console.log("original:", newDisaster);
    // const lng = newDisaster.coordinates?.coordinates[0];
    // const lat = newDisaster.coordinates?.coordinates[1];
    // const geometryWKT = `POINT(${lng} ${lat})`;
    const payload = {
        ...newDisaster,
        // coordinates: geometryWKT,
    };
    const { data, error } = await supabaseClient_1.default
        .from("disasters")
        .insert([payload])
        .select("*, Users (name)");
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
    return data[0];
};
exports.submitDisaster = submitDisaster;
const getAllDisasters = async () => {
    const { data, error } = await supabaseClient_1.default
        .from("disasters")
        .select("*, Users (name)")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
    return data;
};
exports.getAllDisasters = getAllDisasters;
const getDisasterById = async (id) => {
    const { data, error } = await supabaseClient_1.default
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
exports.getDisasterById = getDisasterById;
const updateDisaster = async (id, updatedDisaster) => {
    const { data, error } = await supabaseClient_1.default
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
exports.updateDisaster = updateDisaster;
const deleteDisaster = async (id) => {
    const { error } = await supabaseClient_1.default.from("disasters").delete().eq("id", id);
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
};
exports.deleteDisaster = deleteDisaster;
