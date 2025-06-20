import { Router, Request, Response } from "express";
import supabase from "../supabaseClient";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await supabase.from("reports").select("count").limit(1);
    if (error) {
      res.status(500).json({
        status: "error",
        message: "Database connection failed",
        error: error.message,
      });
      return;
    }
    res.json({
      status: "healthy",
      message: "Database connection successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
