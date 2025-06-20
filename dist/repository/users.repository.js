"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const createUser = async (userData) => {
    const { data, error } = await supabaseClient_1.default
        .from("users")
        .insert([userData])
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data[0];
};
exports.createUser = createUser;
