import { Router } from "express";
import reportRoutes from "./report.routes";
import healthRoutes from "./health.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/reports", reportRoutes);
router.use("/health", healthRoutes);
router.use("/users", userRoutes);

export default router;
