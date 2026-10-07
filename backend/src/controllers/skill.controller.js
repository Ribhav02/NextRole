import prisma from "../config/db.js";

export async function getSkills(_req, res, next) {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    res.json({
      success: true,
      skills,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSkillProfile(req, res, next) {
  try {
    const workerSkills = await prisma.workerSkill.findMany({
      where: { userId: req.user.id },
      include: {
        skill: true,
      },
      orderBy: { score: "desc" },
    });

    res.json({
      success: true,
      skills: workerSkills,
    });
  } catch (error) {
    next(error);
  }
}
