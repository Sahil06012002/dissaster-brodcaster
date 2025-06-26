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
exports.getDisasterReports = exports.addReport = void 0;
const reportService = __importStar(require("../services/report.service"));
const addReport = async (req, res, next) => {
    try {
        const { user_id, disaster_id, title, description, image_link } = req.body;
        if (!user_id || !title || !disaster_id || !description || !title) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["title", "location", "description", "tags"],
            });
        }
        const newReport = await reportService.addReports(req.body);
        res.status(201).json({
            message: "Report saved successfully",
            data: newReport,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addReport = addReport;
const getDisasterReports = async (req, res, next) => {
    try {
        const { disaster_id } = req.query;
        console.log(disaster_id);
        const reports = await reportService.getReportsByDisasterId(parseInt(disaster_id));
        if (!reports) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.json({
            message: "Report retrieved successfully",
            data: reports,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDisasterReports = getDisasterReports;
