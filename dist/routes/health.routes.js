"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const { error } = await supabaseClient_1.default.from("reports").select("count").limit(1);
        if (error) {
            res.status(500).json({
                status: "error",
                message: "Database connection failed",
                error: error.message,
            });
            return;
        }
        res.json({
            status: "healthy",
            message: "Database connection successful",
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Server error",
            error: error.message,
        });
    }
});
exports.default = router;
