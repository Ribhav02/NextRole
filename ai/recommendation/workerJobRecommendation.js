import { recommendJobs } from "../matching/jobRecommendation.js";

export function generateWorkerRecommendations({ worker, jobs, preferences = {} }) {
  const radiusKm = Number(preferences.maxDistanceKm || 100);
  const results = recommendJobs({ worker, jobs, radiusKm });

  return results.map((result) => ({
    ...result,
    reasons: [
      `${result.match.score}% skill-readiness match`,
      result.distanceKm == null
        ? "Location distance unavailable"
        : `${Math.round(result.distanceKm)} km from your selected location`,
      result.match.readiness,
    ],
  }));
}
