import { SKILL_MAP } from "./skillTaxonomy";
import { rankOf } from "./evidenceModel";
import { extractSkillsFromText } from "./skillExtraction";

// Builds an evidence-backed skill profile. Each skill keeps its strongest state
// and a full list of sources for traceability.
export function buildSkillProfile(profile, evidence = [], assessments = []) {
  const map = {};
  const add = (id, state, source) => {
    const skill = SKILL_MAP[id];
    if (!skill) return;
    const entry = (map[id] ||= { ...skill, state, sources: [] });
    entry.sources.push({ state, ...source });
    if (rankOf(state) > rankOf(entry.state)) entry.state = state;
  };

  (profile?.work_history || []).forEach((h, i) =>
    extractSkillsFromText(`${h.role} ${h.tasks}`).forEach((id) =>
      add(id, "self_declared", { kind: "history", ref: `history-${i}`, label: `${h.role}${h.employer ? ` · ${h.employer}` : ""}` })
    )
  );
  evidence.forEach((ev) =>
    (ev.extracted_skills || []).forEach((id) =>
      add(id, ev.evidence_state, { kind: "evidence", ref: ev.id, label: ev.title, detail: ev.verifier_name ? `${ev.verifier_name}, ${ev.verifier_role}` : ev.extraction_notes })
    )
  );
  assessments.forEach((a) => {
    (a.demonstrated_skills || []).forEach((id) => add(id, "demonstrated", { kind: "assessment", ref: a.id, label: `Scenario: ${a.scenario_title}` }));
    (a.partial_skills || []).forEach((id) => add(id, "self_declared", { kind: "assessment", ref: `${a.id}-p`, label: `Scenario (partial): ${a.scenario_title}` }));
  });

  return Object.values(map).sort((a, b) => rankOf(b.state) - rankOf(a.state) || b.sources.length - a.sources.length);
}