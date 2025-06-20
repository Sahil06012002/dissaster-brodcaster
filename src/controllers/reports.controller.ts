import { Request, Response, NextFunction } from "express";
import * as reportService from "../services/reports.service";
import { Report } from "../interfaces/reports.interface";

export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, location, description, tags, user_id } = req.body;
    const reportData: Report = req.body;
    if (!title || !location || !description || !tags || !user_id) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["title", "location", "description", "tags", "user_id"],
      });
    }
    const newReport = await reportService.createReport(reportData);
    res.status(201).json({
      message: "Report saved successfully",
      data: newReport,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await reportService.getAllReports();
    res.json({
      message: "Reports retrieved successfully",
      data: reports,
      count: reports.length,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error: any) {
    next(error);
  }
};

export const updateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, location, description, tags }: Report = req.body;
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
  } catch (error: any) {
    next(error);
  }
};

export const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await reportService.deleteReport(id);
    res.json({ message: "Report deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};
