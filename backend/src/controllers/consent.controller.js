import prisma from "../config/db.js";

export async function listConsents(req, res, next) {
  try {
    const consents = await prisma.consent.findMany({
      where: { workerId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, consents });
  } catch (error) { next(error); }
}

export async function createConsent(req, res, next) {
  try {
    const { organizationId, scope } = req.body;
    const consent = await prisma.consent.create({
      data: { workerId: req.user.id, organizationId: organizationId || null, scope },
    });
    res.status(201).json({ success: true, consent });
  } catch (error) { next(error); }
}

export async function updateConsent(req, res, next) {
  try {
    const { status } = req.body;
    const consent = await prisma.consent.update({
      where: { id: req.params.id },
      data: {
        status,
        grantedAt: status === "GRANTED" ? new Date() : undefined,
        revokedAt: status === "REVOKED" ? new Date() : undefined,
      },
    });
    res.json({ success: true, consent });
  } catch (error) { next(error); }
}
