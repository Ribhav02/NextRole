import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createInterviewRequest, updateInterviewRequest } from "../controllers/interview.controller.js";

const router = Router();
router.use(requireAuth);
router.post("/", createInterviewRequest);
router.patch("/:id", updateInterviewRequest);
export default router;
