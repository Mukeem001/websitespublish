import { Router } from "express";

import authMiddleware from "../middleware/auth";
import {
  getAllUsers,
  getCurrentUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";

const router = Router();

router.get("/me", authMiddleware, getCurrentUserProfile);
router.put("/me", authMiddleware, updateUserProfile);
router.get("/", authMiddleware, getAllUsers);

export default router;
