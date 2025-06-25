import { Request, Response, NextFunction } from "express";
import * as reportService from "../services/report.service";
import multer from "multer";

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
