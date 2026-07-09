import { Router } from "express";

import authMiddleware from "../middleware/auth";

import {
  signup,
  login,
  logout,
  me,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post(
  "/reset-password",
  resetPassword
);

router.post("/logout", logout);

router.get(
  "/me",
  authMiddleware,
  me
);

export default router;