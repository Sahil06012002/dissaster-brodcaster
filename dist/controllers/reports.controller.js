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
exports.deleteReport = exports.updateReport = exports.getReportById = exports.getAllReports = exports.createReport = void 0;
const reportService = __importStar(require("../services/reports.service"));
const createReport = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { title, location, description, tags } = req.body;
        const reportData = { ...req.body, userId };
        if (!title || !location || !description || !tags || !userId) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["title", "location", "description", "tags", "userId"],
            });
        }
        const newReport = await reportService.createReport(reportData);
        res.status(201).json({
            message: "Report saved successfully",
            data: newReport,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createReport = createReport;
const getAllReports = async (req, res, next) => {
    try {
        const reports = await reportService.getAllReports();
        res.json({
            message: "Reports retrieved successfully",
            data: reports,
            count: reports.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllReports = getAllReports;
const getReportById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const report = await reportService.getReportById(id);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.json({
            message: "Report retrieved successfully",
            data: report,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getReportById = getReportById;
const updateReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, location, description, tags } = req.body;
        if (!title || !location || !description || !tags) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["title", "location", "description", "tags"],
            });
        }
        const updatedReport = await reportService.updateReport(id, req.body);
        if (!updatedReport) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.json({
            message: "Report updated successfully",
            data: updatedReport,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateReport = updateReport;
const deleteReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        await reportService.deleteReport(id);
        res.json({ message: "Report deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteReport = deleteReport;
