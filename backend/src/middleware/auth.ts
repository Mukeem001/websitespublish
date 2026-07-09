import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header =
      req.headers.authorization;

    if (
      !header ||
      !header.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = header.split(" ")[1];

    const payload =
      verifyAccessToken(token);

    const user = await User.findById(
      payload.userId
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;