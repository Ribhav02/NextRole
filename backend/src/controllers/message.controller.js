import prisma from "../config/db.js";

export async function createConversation(req, res, next) {
  try {
    const participantIds = [...new Set([req.user.id, ...(req.body.participantIds || [])])];
    if (participantIds.length < 2) {
      return res.status(400).json({ success: false, message: "At least two participants are required." });
    }

    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: participantIds.map((userId) => ({ userId })),
        },
      },
      include: { participants: true },
    });

    res.status(201).json({ success: true, conversation });
  } catch (error) { next(error); }
}

export async function getConversation(req, res, next) {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: req.params.id,
        participants: { some: { userId: req.user.id } },
      },
      include: { messages: { orderBy: { createdAt: "asc" } }, participants: true },
    });

    if (!conversation) return res.status(404).json({ success: false, message: "Conversation not found." });
    res.json({ success: true, conversation });
  } catch (error) { next(error); }
}

export async function sendMessage(req, res, next) {
  try {
    const participant = await prisma.conversationParticipant.findFirst({
      where: { conversationId: req.params.id, userId: req.user.id },
    });

    if (!participant) return res.status(403).json({ success: false, message: "Not a conversation participant." });

    const message = await prisma.message.create({
      data: {
        conversationId: req.params.id,
        senderId: req.user.id,
        type: req.body.type || "TEXT",
        body: req.body.body,
        metadata: req.body.metadata || null,
      },
    });

    res.status(201).json({ success: true, message });
  } catch (error) { next(error); }
}
