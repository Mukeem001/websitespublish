import { Router } from "express";

import authMiddleware from "../middleware/auth";
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  updateTemplate,
} from "../controllers/template.controller";

const router = Router();

router.get("/", getTemplates);
router.get("/:id", getTemplateById);
router.post("/", authMiddleware, createTemplate);
router.put("/:id", authMiddleware, updateTemplate);
router.delete("/:id", authMiddleware, deleteTemplate);

export default router;
