import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getCandidateIntelligence } from "../controllers/candidate.controller.js";

const router = Router();
router.get("/:workerId/intelligence", requireAuth, getCandidateIntelligence);
export default router;
