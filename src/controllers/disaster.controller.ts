import { Request, Response, NextFunction } from "express";
import * as disasterService from "../services/disaster.service";
import { Disaster } from "../interfaces/disaster.interface";

export const submitDisaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, location, description, tags, user_id } = req.body;

    const disasterData: Disaster = req.body;

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
  } catch (error: any) {
    next(error);
  }
};

export const getAllDisasters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const disasters = await disasterService.getAllDisasters();
    res.json({
      message: "Reports retrieved successfully",
      data: disasters,
      count: disasters.length,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getDisasterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const disaster = await disasterService.getDisasterById(id);
    if (!disaster) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({
      message: "Report retrieved successfully",
      data: disaster,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateDisaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, location, description, tags }: Disaster = req.body;
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
  } catch (error: any) {
    next(error);
  }
};

export const deleteDisaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await disasterService.deleteDisaster(id);
    res.json({ message: "Disaster deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};
