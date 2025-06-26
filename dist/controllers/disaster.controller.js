"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDisaster = exports.updateDisaster = exports.getDisasterById = exports.getAllDisasters = exports.submitDisaster = void 0;
const disasterService = __importStar(require("../services/disaster.service"));
const submitDisaster = async (req, res, next) => {
    try {
        const { title, location, description, tags, user_id } = req.body;
        const disasterData = req.body;
        if (!title || !location || !description || !tags || !user_id) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["title", "location", "description", "tags", "user_id"],
            });
        }
        const newDisaster = await disasterService.submitDisaster(disasterData);
        res.status(201).json({
            message: "Disaster saved successfully",
            data: newDisaster,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.submitDisaster = submitDisaster;
const getAllDisasters = async (req, res, next) => {
    try {
        const disasters = await disasterService.getAllDisasters();
        res.json({
            message: "Reports retrieved successfully",
            data: disasters,
            count: disasters.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllDisasters = getAllDisasters;
const getDisasterById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const disaster = await disasterService.getDisasterById(id);
        if (!disaster) {
            return res.status(404).json({ error: "Disasters not found" });
        }
        res.json({
            message: "Report retrieved successfully",
            data: disaster,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDisasterById = getDisasterById;
const updateDisaster = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, location, description, tags } = req.body;
        if (!title || !location || !description || !tags) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["title", "location", "description", "tags"],
            });
        }
        const updatedDisaster = await disasterService.updateDisaster(id, req.body);
        if (!updatedDisaster) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.json({
            message: "Report updated successfully",
            data: updatedDisaster,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateDisaster = updateDisaster;
const deleteDisaster = async (req, res, next) => {
    try {
        const { id } = req.params;
        await disasterService.deleteDisaster(id);
        res.json({ message: "Disaster deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDisaster = deleteDisaster;
