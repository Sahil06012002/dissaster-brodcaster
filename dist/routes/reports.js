"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const router = express_1.default.Router();
// POST /report endpoint
router.post("/", async (req, res) => {
    try {
        const { title, location, description, tags } = req.body;
        if (!title || !location || !description || !tags) {
            res.status(400).json({
                error: "Missing required fields",
                required: ["title", "location", "description", "tags"],
            });
            return;
        }
        const newReport = {
            title,
            location,
            description,
            tags,
            created_at: new Date().toISOString(),
        };
        const { data, error } = await supabaseClient_1.default
            .from("reports")
            .insert([newReport])
            .select();
        if (error) {
            console.error("Supabase error:", error);
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({
            message: "Report saved successfully",
            data: data[0],
        });
    }
    catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// GET /reports endpoint
router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabaseClient_1.default
            .from("reports")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.error("Supabase error:", error);
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({
            message: "Reports retrieved successfully",
            data,
            count: data.length,
        });
    }
    catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// GET /reports/:id endpoint
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabaseClient_1.default
            .from("reports")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            if (error.code === "PGRST116") {
                res.status(404).json({ error: "Report not found" });
                return;
            }
            console.error("Supabase error:", error);
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({
            message: "Report retrieved successfully",
            data,
        });
    }
    catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// PUT /reports/:id endpoint
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, description, tags, reportedOn } = req.body;
        if (!title || !location || !description || !tags) {
            res.status(400).json({
                error: "Missing required fields",
                required: ["title", "location", "description", "tags"],
            });
            return;
        }
        const updatedReport = {
            title,
            location,
            description,
            tags,
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await supabaseClient_1.default
            .from("reports")
            .update(updatedReport)
            .eq("id", id)
            .select();
        if (error) {
            console.error("Supabase error:", error);
            res.status(500).json({ error: error.message });
            return;
        }
        if (data.length === 0) {
            res.status(404).json({ error: "Report not found" });
            return;
        }
        res.json({
            message: "Report updated successfully",
            data: data[0],
        });
    }
    catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// DELETE /reports/:id endpoint
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabaseClient_1.default.from("reports").delete().eq("id", id);
        if (error) {
            console.error("Supabase error:", error);
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: "Report deleted successfully" });
    }
    catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
