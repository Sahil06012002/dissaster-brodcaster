import express from "express";
import * as resourcesController from "../controllers/resources.controller";
import { catchAsync } from "../utils/catchAsync";

const router = express.Router();

router.post("/", catchAsync(resourcesController.addResource));
router.delete("/:id", catchAsync(resourcesController.deleteResource));
router.get("/", catchAsync(resourcesController.getAllResources));
router.get(
  "/nearby/by-disaster",
  catchAsync(resourcesController.getNearbyResourcesByDisaster)
);
router.post(
  "/nearby/by-geography",
  catchAsync(resourcesController.getNearbyResourcesByGeography)
);

export default router;
