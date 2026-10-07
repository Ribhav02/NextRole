import prisma from "../config/db.js";

export async function updateLocation(req, res, next) {
  try {
    const { latitude, longitude, locationText, granted } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        locationText: locationText || null,
        locationGranted: Boolean(granted),
      },
      select: { id: true, latitude: true, longitude: true, locationText: true, locationGranted: true },
    });
    res.json({ success: true, user });
  } catch (error) { next(error); }
}

export async function updateWorkerPreferences(req, res, next) {
  try {
    if (req.user.role !== "WORKER") {
      return res.status(403).json({ success: false, message: "Worker account required." });
    }

    const data = {
      desiredJobTypes: req.body.desiredJobTypes || [],
      preferredTitles: req.body.preferredTitles || [],
      preferredIndustries: req.body.preferredIndustries || [],
      willingToRelocate: Boolean(req.body.willingToRelocate),
      remotePreferred: Boolean(req.body.remotePreferred),
      minSalary: req.body.minSalary == null ? null : Number(req.body.minSalary),
      maxDistanceKm: req.body.maxDistanceKm == null ? 100 : Number(req.body.maxDistanceKm),
    };

    const preference = await prisma.workerPreference.upsert({
      where: { userId: req.user.id },
      create: { userId: req.user.id, ...data },
      update: data,
    });

    res.json({ success: true, preference });
  } catch (error) { next(error); }
}
