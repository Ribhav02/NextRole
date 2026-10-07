import { Router } from "express";
import {
  createEvidence,
  getEvidence,
} from "../controllers/evidence.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.post("/", createEvidence);
router.get("/", getEvidence);

export default router;
