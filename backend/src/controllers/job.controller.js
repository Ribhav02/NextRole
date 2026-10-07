import prisma from "../config/db.js";
import { recommendJobs } from "../../../ai/matching/jobRecommendation.js";

export async function createJob(req, res, next) {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ success: false, message: "Employer account required." });
    }

    const {
      title, description, locationText, latitude, longitude,
      salaryMin, salaryMax, roleId, requiredSkills = []
    } = req.body;

    const job = await prisma.job.create({
      data: {
        organizationId: req.user.organizationId || null,
        roleId: roleId || null,
        sourceType: "EMPLOYER_POST",
        title,
        description: description || null,
        locationText: locationText || null,
        latitude: latitude == null ? null : Number(latitude),
        longitude: longitude == null ? null : Number(longitude),
        salaryMin: salaryMin == null ? null : Number(salaryMin),
        salaryMax: salaryMax == null ? null : Number(salaryMax),
        rawPayload: { requiredSkills },
      },
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
}

export async function listEmployerJobs(req, res, next) {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ success: false, message: "Employer account required." });
    }

    const jobs = await prisma.job.findMany({
      where: { organizationId: req.user.organizationId || undefined },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, jobs });
  } catch (error) {
    next(error);
  }
}

export async function listJobsForWorker(req, res, next) {
  try {
    if (req.user.role !== "WORKER") {
      return res.status(403).json({ success: false, message: "Worker account required." });
    }

    const radiusKm = Number(req.query.radiusKm || req.user.locationPreference?.maxDistanceKm || 100);

    const [jobs, workerSkills] = await Promise.all([
      prisma.job.findMany({
        where: { status: "ACTIVE" },
        include: { role: { include: { skillRequirements: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.workerSkill.findMany({ where: { userId: req.user.id }, include: { skill: true } }),
    ]);

    const normalizedJobs = jobs.map((job) => ({
      ...job,
      required_skills: (job.role?.skillRequirements || []).map((r) => ({
        skill: r.skillId,
        minEvidence: r.minEvidence,
      })),
    }));

    const results = recommendJobs({
      worker: {
        location: { lat: req.user.latitude, lng: req.user.longitude },
        skills: workerSkills.map((s) => ({
          id: s.skillId,
          state: s.evidenceState,
        })),
      },
      jobs: normalizedJobs,
      radiusKm,
    });

    res.json({ success: true, radiusKm, jobs: results });
  } catch (error) {
    next(error);
  }
}
