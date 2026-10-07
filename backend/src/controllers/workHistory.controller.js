import prisma from "../config/db.js";

export async function createWorkHistory(req, res, next) {
  try {
    const { role, employer, durationMonths, tasks, source = "manual" } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required.",
      });
    }

    const workHistory = await prisma.workHistory.create({
      data: {
        userId: req.user.id,
        role,
        employer: employer || null,
        durationMonths: durationMonths ? Number(durationMonths) : null,
        tasks: Array.isArray(tasks) ? tasks : [],
        source,
      },
    });

    res.status(201).json({
      success: true,
      workHistory,
    });
  } catch (error) {
    next(error);
  }
}

export async function getWorkHistory(req, res, next) {
  try {
    const workHistory = await prisma.workHistory.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      workHistory,
    });
  } catch (error) {
    next(error);
  }
}
