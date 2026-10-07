import { Router } from "express";
import {
  getSkills,
  getSkillProfile,
} from "../controllers/skill.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getSkills);
router.get("/profile", requireAuth, getSkillProfile);

export default router;
