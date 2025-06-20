import { Router } from "express";
import * as reportController from "../controllers/reports.controller";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

router.post("/", catchAsync(reportController.createReport));
router.get("/", catchAsync(reportController.getAllReports));
router.get("/:id", catchAsync(reportController.getReportById));
router.put("/:id", catchAsync(reportController.updateReport));
router.delete("/:id", catchAsync(reportController.deleteReport));

export default router;
