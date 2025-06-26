import { Router } from "express";
import disasterRoutes from "./disaster.routes";
import healthRoutes from "./health.routes";
import userRoutes from "./user.routes";
import reportRouters from "./report.routes";
import helperRoutes from "./helper.routes";

const router = Router();

router.use("/disasters", disasterRoutes);
router.use("/health", healthRoutes);
router.use("/users", userRoutes);
router.use("/helper", helperRoutes);
router.use("/reports", reportRouters);

export default router;
