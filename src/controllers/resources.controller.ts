import { Request, Response, NextFunction } from "express";
import * as resourcesService from "../services/resources.service";
import { Resource } from "../interfaces/resources.interface";

export const addResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req.body");
    console.log(req.body);
    const { name, resource_type, location } = req.body;
    const address = location.address;
    const lat = location.lat;
    const lng = location.lng;

    const geometryWKT = `POINT(${lng} ${lat})`;
    const resourceData: Resource = {
      ...req.body,
      location: address,
      coordinates: geometryWKT,
    };
    if (!name || !resource_type || !location) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name", "resource_type", "location"],
      });
    }
    const newResource = await resourcesService.addResource(resourceData);
    res.status(201).json({
      message: "Resource added successfully",
      data: newResource,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await resourcesService.deleteResource(id);
    res.status(200).json({
      message: "Resource deleted successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resources = await resourcesService.getAllResources();
    res.json({
      message: "Resources retrieved successfully",
      data: resources,
      count: resources.length,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getNearbyResourcesByDisaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("getNearbyResourcesByDisaster");
    console.log("req.query");
    console.log(req.query);
    const { disasterId, radiusKm } = req.query;
    console.log("disasterId");
    console.log(disasterId);
    console.log("radiusKm");
    console.log(radiusKm);
    if (!disasterId) {
      return res
        .status(400)
        .json({ error: "Missing disasterId query parameter" });
    }
    const resources = await resourcesService.findNearbyResourcesByDisasterId(
      disasterId as string,
      radiusKm ? Number(radiusKm) : 10
    );
    res.json({
      message: "Nearby resources retrieved successfully",
      data: resources,
      count: resources.length,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getNearbyResourcesByGeography = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { geographyBinary, radiusKm, resourceType } = req.body;
    if (!geographyBinary) {
      return res
        .status(400)
        .json({ error: "Missing geographyBinary in request body" });
    }
    const resources = await resourcesService.findNearbyResourcesByGeography(
      geographyBinary,
      radiusKm ? Number(radiusKm) : 10,
      resourceType
    );
    res.json({
      message: "Nearby resources retrieved successfully",
      data: resources,
      count: resources.length,
    });
  } catch (error: any) {
    next(error);
  }
};
