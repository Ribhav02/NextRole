import prisma from "../config/db.js";
import { recordCompanyFeedback, recordManagerReview } from "../services/integrations/companyData.service.js";

export async function addCompanyFeedback(req, res, next) {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ success: false, message: "Employer account required." });
    }

    const feedback = await recordCompanyFeedback({
      workerId: req.body.workerId,
      organizationId: req.user.organizationId,
      sourceType: req.body.sourceType || "company_portal",
      title: req.body.title || "Company performance feedback",
      summary: req.body.summary,
      overallScore: req.body.overallScore == null ? null : Number(req.body.overallScore),
      payload: req.body.payload,
      consentId: req.body.consentId,
    });

    res.status(201).json({ success: true, feedback });
  } catch (error) { next(error); }
}

export async function addManagerReview(req, res, next) {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ success: false, message: "Employer account required." });
    }

    const review = await recordManagerReview({
      workerId: req.body.workerId,
      organizationId: req.user.organizationId,
      managerId: req.user.id,
      title: req.body.title || "Manager review",
      summary: req.body.summary,
      overallScore: req.body.overallScore == null ? null : Number(req.body.overallScore),
      strengths: req.body.strengths,
      improvements: req.body.improvements,
      payload: req.body.payload,
      consentId: req.body.consentId,
    });

    res.status(201).json({ success: true, review });
  } catch (error) { next(error); }
}

export async function getWorkerReviews(req, res, next) {
  try {
    const [feedback, reviews] = await Promise.all([
      prisma.companyFeedback.findMany({ where: { workerId: req.params.workerId } }),
      prisma.managerReview.findMany({ where: { workerId: req.params.workerId } }),
    ]);
    res.json({ success: true, feedback, managerReviews: reviews });
  } catch (error) { next(error); }
}
