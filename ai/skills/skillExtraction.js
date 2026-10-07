import { SKILLS } from "./skillTaxonomy.js";

export function extractSkillsFromText(text = "") {
  const normalized = String(text).toLowerCase();
  return SKILLS
    .filter((s) => s.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())))
    .map((s) => s.id);
}

export function scoreSkillsFromText(text = "") {
  return extractSkillsFromText(text).map((skillId) => ({
    skillId,
    confidence: 0.65,
    source: "text_extraction",
  }));
}
