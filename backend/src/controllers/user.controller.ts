import { Response } from "express";

import User from "../models/User";
import { AuthRequest } from "../middleware/auth";
import { errorResponse, successResponse } from "../utils/response";

export const getCurrentUserProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return errorResponse(res, "Unauthorized.", 401);
    }

    return successResponse(res, "Profile fetched successfully.", {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return errorResponse(res, "Unauthorized.", 401);
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      req.body,
      { new: true, runValidators: true }
    );

    return successResponse(
      res,
      "Profile updated successfully.",
      updatedUser
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getAllUsers = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const users = await User.find({}).select("-password");

    return successResponse(res, "Users fetched successfully.", users);
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};
