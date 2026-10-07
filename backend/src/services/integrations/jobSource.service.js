export async function normalizeExternalJob(source, rawJob) {
  return {
    externalId: String(rawJob.id || rawJob.jobId || rawJob.url || crypto.randomUUID()),
    source,
    title: rawJob.title || rawJob.job_title || "Untitled role",
    description: rawJob.description || rawJob.job_description || "",
    companyName: rawJob.company || rawJob.companyName || null,
    locationText: rawJob.location || rawJob.locationText || null,
    latitude: Number.isFinite(Number(rawJob.latitude)) ? Number(rawJob.latitude) : null,
    longitude: Number.isFinite(Number(rawJob.longitude)) ? Number(rawJob.longitude) : null,
    applyUrl: rawJob.applyUrl || rawJob.url || null,
    rawPayload: rawJob,
  };
}
