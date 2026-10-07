import prisma from "../../config/db.js";

export async function recordCompanyFeedback({ workerId, organizationId, sourceType, title, summary, overallScore, payload, consentId }) {
  return prisma.companyFeedback.create({
    data: {
      workerId,
      organizationId,
      sourceType,
      title,
      summary,
      overallScore,
      payload: payload || null,
      consentId: consentId || null,
    },
  });
}

export async function recordManagerReview({ workerId, organizationId, managerId, title, summary, overallScore, strengths, improvements, payload, consentId }) {
  return prisma.managerReview.create({
    data: {
      workerId,
      organizationId,
      managerId,
      title,
      summary,
      overallScore,
      strengths: strengths || [],
      improvements: improvements || [],
      payload: payload || null,
      consentId: consentId || null,
    },
  });
}
