import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createJob, listJobsForWorker, listEmployerJobs } from "../controllers/job.controller.js";

const router = Router();
router.get("/recommended", requireAuth, listJobsForWorker);
router.get("/mine", requireAuth, listEmployerJobs);
router.post("/", requireAuth, createJob);
export default router;
