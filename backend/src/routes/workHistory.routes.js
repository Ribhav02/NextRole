import { Router } from "express";
import {
  createWorkHistory,
  getWorkHistory,
} from "../controllers/workHistory.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.post("/", createWorkHistory);
router.get("/", getWorkHistory);

export default router;
