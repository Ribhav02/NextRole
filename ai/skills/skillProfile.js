import { SKILL_MAP } from "./skillTaxonomy.js";
import { rankOf } from "../evidence/evidenceModel.js";
import { extractSkillsFromText } from "./skillExtraction.js";

export function buildSkillProfile(profile, evidence = [], assessments = []) {
  const map = {};
  const add = (id, state, source) => {
    const skill = SKILL_MAP[id];
    if (!skill) return;
    const entry = (map[id] ||= { ...skill, state, sources: [] });
    entry.sources.push({ state, ...source });
    if (rankOf(state) > rankOf(entry.state)) entry.state = state;
  };

  (profile?.work_history || []).forEach((history, index) => {
    extractSkillsFromText(`${history.role} ${history.tasks || ""}`)
      .forEach((id) => add(id, "self_declared", {
        kind: "work_history",
        ref: history.id || `history-${index}`,
        label: history.role,
      }));
  });

  evidence.forEach((item) => {
    (item.extractedSkills || item.extracted_skills || [])
      .forEach((id) => add(id, item.state || item.evidenceState || "document_supported", {
        kind: "evidence", ref: item.id, label: item.title,
      }));
  });

  assessments.forEach((item) => {
    (item.demonstratedSkills || item.demonstrated_skills || [])
      .forEach((id) => add(id, "demonstrated", {
        kind: "assessment", ref: item.id, label: item.title || "Scenario assessment",
      }));
  });

  return Object.values(map).sort(
    (a, b) => rankOf(b.state) - rankOf(a.state) || b.sources.length - a.sources.length
  );
}
