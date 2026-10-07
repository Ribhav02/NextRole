import prisma from "../config/db.js";

export async function createInterviewRequest(req, res, next) {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ success: false, message: "Employer account required." });
    }

    const { workerId, jobId, message, proposedAt } = req.body;
    const request = await prisma.interviewRequest.create({
      data: {
        employerId: req.user.id,
        workerId,
        jobId: jobId || null,
        message: message || null,
        proposedAt: proposedAt ? new Date(proposedAt) : null,
      },
    });

    res.status(201).json({ success: true, request });
  } catch (error) { next(error); }
}

export async function updateInterviewRequest(req, res, next) {
  try {
    const request = await prisma.interviewRequest.findUnique({ where: { id: req.params.id } });
    if (!request) return res.status(404).json({ success: false, message: "Interview request not found." });

    if (request.workerId !== req.user.id && request.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    const updated = await prisma.interviewRequest.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });

    res.json({ success: true, request: updated });
  } catch (error) { next(error); }
}
