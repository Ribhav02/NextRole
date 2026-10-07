import prisma from "../config/db.js";
import { buildWorkerIntelligence } from "../services/ai/workerIntelligence.service.js";
import { buildWorkerSkillGraph } from "../services/ai/skillGraph.service.js";

export async function getCandidateIntelligence(req, res, next) {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ success: false, message: "Employer account required." });
    }

    const workerId = req.params.workerId;

    const consent = await prisma.consent.findFirst({
      where: {
        workerId,
        organizationId: req.user.organizationId || undefined,
        scope: { contains: "profile" },
        status: "GRANTED",
      },
    });

    if (!consent) {
      return res.status(403).json({
        success: false,
        message: "Worker has not granted this employer access to their profile.",
      });
    }

    const [worker, workHistory, evidence, workerSkills, companyFeedback, managerReviews, assessments] = await Promise.all([
      prisma.user.findUnique({ where: { id: workerId }, select: { id: true, name: true, locationText: true } }),
      prisma.workHistory.findMany({ where: { userId: workerId } }),
      prisma.evidence.findMany({ where: { userId: workerId } }),
      prisma.workerSkill.findMany({ where: { userId: workerId }, include: { skill: true } }),
      prisma.companyFeedback.findMany({ where: { workerId } }),
      prisma.managerReview.findMany({ where: { workerId } }),
      prisma.assessmentResponse.findMany({ where: { userId: workerId } }),
    ]);

    if (!worker) return res.status(404).json({ success: false, message: "Worker not found." });

    const intelligence = buildWorkerIntelligence({
      profile: worker,
      workHistory,
      evidence,
      workerSkills,
      companyFeedback,
      managerReviews,
      assessments,
    });

    const graph = buildWorkerSkillGraph({
      workerSkills,
      workHistory,
      evidence,
      companyFeedback,
      managerReviews,
    });

    res.json({
      success: true,
      worker,
      intelligence,
      graph,
    });
  } catch (error) { next(error); }
}
