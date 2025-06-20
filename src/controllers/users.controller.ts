import { Request, Response, NextFunction } from "express";
import * as userService from "../services/users.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name"],
      });
    }
    const newUser = await userService.createUser({ name });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    next(error);
  }
};
