import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { speechToTextEndpoint, translateEndpoint, textToSpeechEndpoint } from "../controllers/voice.controller.js";

const router = Router();
router.use(requireAuth);
router.post("/speech-to-text", speechToTextEndpoint);
router.post("/translate", translateEndpoint);
router.post("/text-to-speech", textToSpeechEndpoint);
export default router;
