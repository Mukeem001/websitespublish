import { NextFunction, Response } from "express";

import { AuthRequest } from "./auth";

const adminMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  next();
};

export default adminMiddleware;
