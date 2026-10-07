import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { addCompanyFeedback, addManagerReview, getWorkerReviews } from "../controllers/company.controller.js";

const router = Router();
router.use(requireAuth);
router.post("/feedback", addCompanyFeedback);
router.post("/manager-review", addManagerReview);
router.get("/worker/:workerId/reviews", getWorkerReviews);
export default router;
