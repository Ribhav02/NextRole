import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getWorkerIntelligence, getWorkerSkillGraph } from "../controllers/intelligence.controller.js";

const router = Router();

router.get("/worker", requireAuth, getWorkerIntelligence);
router.get("/worker/graph", requireAuth, getWorkerSkillGraph);

export default router;
