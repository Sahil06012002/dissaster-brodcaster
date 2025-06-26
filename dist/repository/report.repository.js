"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportsByDisasterId = exports.addReport = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const addReport = async (report) => {
    const { error, data } = await supabaseClient_1.default
        .from("reports")
        .insert([report])
        .select();
    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }
    return data[0];
};
exports.addReport = addReport;
const getReportsByDisasterId = async (disaster_id) => {
    const { error, data } = await supabaseClient_1.default
        .from("reports")
        .select(`
      *,
      Users(name)
    `)
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
exports.getReportsByDisasterId = getReportsByDisasterId;
