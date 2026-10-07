import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createConsent, updateConsent, listConsents } from "../controllers/consent.controller.js";

const router = Router();
router.use(requireAuth);
router.get("/", listConsents);
router.post("/", createConsent);
router.patch("/:id", updateConsent);
export default router;
