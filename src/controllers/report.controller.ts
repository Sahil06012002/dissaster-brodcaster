import { Request, Response, NextFunction } from "express";
import * as reportService from "../services/report.service";

export const addReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error: any) {
    next(error);
  }
};

export const getDisasterReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { disaster_id } = req.query;
    const reports = await reportService.getReportsByDisasterId(
      parseInt(disaster_id as string)
    );
    if (!reports) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({
      message: "Report retrieved successfully",
      data: reports,
    });
  } catch (error: any) {
    next(error);
  }
};
