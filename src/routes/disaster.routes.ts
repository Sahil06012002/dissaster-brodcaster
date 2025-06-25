import { Router } from "express";
import * as disasterController from "../controllers/disaster.controller";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

router.post("/", catchAsync(disasterController.submitDisaster));
router.get("/", catchAsync(disasterController.getAllDisasters));
router.get("/:id", catchAsync(disasterController.getDisasterById));
router.put("/:id", catchAsync(disasterController.updateDisaster));
router.delete("/:id", catchAsync(disasterController.deleteDisaster));

export default router;
