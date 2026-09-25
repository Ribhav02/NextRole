import { extractSkillsFromText } from "./skillExtraction";

// Explainable, human-readable reasons for why a worker is considered to have a skill.
export function skillReason(skill) {
  const kinds = new Set(skill.sources.map((s) => s.kind));
  const parts = [];
  if (kinds.has("assessment")) parts.push("demonstrated this skill in a scenario assessment");
  if (kinds.has("evidence")) parts.push("is supported by uploaded evidence");
  if (kinds.has("history")) parts.push("described it in their work history");
  if (!parts.length) return "Self-declared by the worker — not yet backed by evidence.";
  return `Worker ${parts.join(", ")}.`;
}

export function relatedExperience(skill, profile) {
  return (profile?.work_history || []).filter((h) => extractSkillsFromText(`${h.role} ${h.tasks}`).includes(skill.id));
}

export function supportingEvidence(skill, evidence) {
  return (evidence || []).filter((e) => (e.extracted_skills || []).includes(skill.id));
}