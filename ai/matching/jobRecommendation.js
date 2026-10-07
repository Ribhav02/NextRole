import { matchRole } from "./matching.js";

const distanceKm = (a, b) => {
  if (![a?.lat, a?.lng, b?.lat, b?.lng].every(Number.isFinite)) return null;
  const r = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return r * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

export function recommendJobs({ worker, jobs, radiusKm = 100 }) {
  return jobs.map((job) => {
    const distance = distanceKm(worker.location, job.location);
    const match = matchRole(worker.skills || [], job);
    const locationScore = distance == null ? 0.5 : distance <= 50 ? 1 : distance <= radiusKm ? 0.75 : 0.35;
    const readinessScore = { ready: 1, assess: 0.85, upskill: 0.65, explore: 0.4 }[match.readiness] || 0;
    return {
      job,
      distanceKm: distance,
      match,
      score: Math.round((readinessScore * 0.65 + locationScore * 0.35) * 100),
    };
  }).filter((x) => x.distanceKm == null || x.distanceKm <= radiusKm)
    .sort((a, b) => b.score - a.score);
}
