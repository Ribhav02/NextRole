import prisma from "../config/db.js";

export async function createEvidence(req, res, next) {
  try {
    const { title, description, type, sourceUrl, metadata } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Evidence title is required.",
      });
    }

    const evidence = await prisma.evidence.create({
      data: {
        userId: req.user.id,
        title,
        description: description || null,
        type: type || "OTHER",
        sourceUrl: sourceUrl || null,
        metadata: metadata || null,
      },
    });

    res.status(201).json({
      success: true,
      evidence,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEvidence(req, res, next) {
  try {
    const evidence = await prisma.evidence.findMany({
      where: { userId: req.user.id },
      include: {
        skillRelationships: {
          include: { skill: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      evidence,
    });
  } catch (error) {
    next(error);
  }
}
