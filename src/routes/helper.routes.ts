import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as helperController from "../controllers/helper.controller";

const router = Router();

router.post("/upload-url", catchAsync(helperController.getUploadUrl));

export default router;
