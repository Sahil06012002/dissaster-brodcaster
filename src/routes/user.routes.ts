import { Router } from "express";
import { createUser } from "../controllers/users.controller";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

router.post("/", catchAsync(createUser));

export default router;
