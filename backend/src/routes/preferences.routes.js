import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { updateLocation, updateWorkerPreferences } from "../controllers/preferences.controller.js";

const router = Router();
router.use(requireAuth);
router.patch("/location", updateLocation);
router.patch("/worker", updateWorkerPreferences);
export default router;
