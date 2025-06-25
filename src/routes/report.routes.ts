import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as reportController from "../controllers/report.controller";

const router = Router();

router.post("/", catchAsync(reportController.addReport));
export default router;
