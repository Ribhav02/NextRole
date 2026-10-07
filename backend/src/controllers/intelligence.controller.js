import prisma from "../config/db.js";
import { buildWorkerIntelligence } from "../services/ai/workerIntelligence.service.js";
import { buildWorkerSkillGraph } from "../services/ai/skillGraph.service.js";

async function loadWorkerData(userId) {
  const [workHistory, evidence, workerSkills, companyFeedback, managerReviews, assessments] = await Promise.all([
    prisma.workHistory.findMany({ where: { userId } }),
    prisma.evidence.findMany({ where: { userId } }),
    prisma.workerSkill.findMany({ where: { userId }, include: { skill: true } }),
    prisma.companyFeedback.findMany({ where: { workerId: userId } }),
    prisma.managerReview.findMany({ where: { workerId: userId } }),
    prisma.assessmentResponse.findMany({ where: { userId } }),
  ]);

  return { workHistory, evidence, workerSkills, companyFeedback, managerReviews, assessments };
}

export async function getWorkerIntelligence(req, res, next) {
  try {
    const data = await loadWorkerData(req.user.id);
    const result = buildWorkerIntelligence({
      profile: req.user,
      ...data,
    });

    res.json({ success: true, intelligence: result });
  } catch (error) {
    next(error);
  }
}

export async function getWorkerSkillGraph(req, res, next) {
  try {
    const data = await loadWorkerData(req.user.id);
    const graph = buildWorkerSkillGraph(data);

    res.json({ success: true, graph });
  } catch (error) {
    next(error);
  }
}
