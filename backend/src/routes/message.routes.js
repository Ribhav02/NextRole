import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createConversation, sendMessage, getConversation } from "../controllers/message.controller.js";

const router = Router();
router.use(requireAuth);
router.post("/conversations", createConversation);
router.get("/conversations/:id", getConversation);
router.post("/conversations/:id/messages", sendMessage);
export default router;
