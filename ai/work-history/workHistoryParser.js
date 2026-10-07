import { extractSkillsFromText } from "../skills/skillExtraction.js";

export function parseWorkHistoryText(text = "") {
  const cleaned = String(text).trim();
  if (!cleaned) return [];

  const chunks = cleaned
    .split(/\n+|[.!?]+/)
    .map((x) => x.trim())
    .filter(Boolean);

  return chunks.map((chunk, index) => ({
    id: `experience-${index + 1}`,
    role: inferRole(chunk),
    employer: inferEmployer(chunk),
    durationMonths: inferDurationMonths(chunk),
    tasks: [chunk],
    extractedSkills: extractSkillsFromText(chunk),
    source: "worker_chat",
  }));
}

function inferRole(text) {
  const match = text.match(/(?:worked as|working as|role was|job was)\s+([^,.;]+)/i);
  return match?.[1]?.trim() || "Worker";
}

function inferEmployer(text) {
  const match = text.match(/(?:at|for|with)\s+([A-Z][A-Za-z0-9& .-]{2,40})/);
  return match?.[1]?.trim() || null;
}

function inferDurationMonths(text) {
  const monthMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:months?|mos?)/i);
  if (monthMatch) return Math.round(Number(monthMatch[1]));

  const yearMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:years?|yrs?)/i);
  if (yearMatch) return Math.round(Number(yearMatch[1]) * 12);

  return null;
}
