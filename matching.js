import { SKILL_MAP } from "./skillTaxonomy";
import { EVIDENCE_STATES, rankOf } from "./evidenceModel";
import { extractSkillsFromText } from "./skillExtraction";

// Explainable matching — no percentages. Every requirement lands in exactly one bucket
// with a human-readable reason.
export const READINESS = {
  ready: { tier: 0, label: "Ready now", cls: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  assess: { tier: 1, label: "Ready after assessment", cls: "bg-amber-50 text-amber-900 border-amber-200" },
  upskill: { tier: 2, label: "Ready with upskilling", cls: "bg-sky-50 text-sky-800 border-sky-200" },
  explore: { tier: 3, label: "Longer-term path", cls: "bg-stone-100 text-stone-700 border-stone-200" },
};

const names = (list) => list.map((i) => i.skill.name).join(", ");
const lbl = (s) => EVIDENCE_STATES[s].label.toLowerCase();

function collectEvidence(items) {
  const map = {};
  items.forEach(({ have, via }) => {
    const src = have || via;
    if (!src) return;
    src.sources.filter((s) => s.kind !== "history").forEach((s) => {
      const e = (map[s.ref] ||= { ...s, skills: [] });
      if (!e.skills.includes(src.name)) e.skills.push(src.name);
    });
  });
  return Object.values(map).sort((a, b) => rankOf(b.state) - rankOf(a.state));
}

function decide(coreMissing, coreAssess, missing, assessment) {
  const learn = missing.length ? ` Plan learning for ${names(missing)}.` : "";
  if (!coreMissing.length && !coreAssess.length)
    return { readiness: "ready", title: "Consider a supervised trial shift", employer: `All core skills are evidence-backed.${learn}`, worker: `You have evidence for every core skill. Talk to your supervisor about this role.${learn}` };
  if (!coreMissing.length)
    return { readiness: "assess", title: `Assess: ${names(coreAssess)}`, employer: `Schedule a short practical assessment for ${names(coreAssess)}.${learn}`, worker: `Take a scenario or get supervisor confirmation for ${names(coreAssess)}.${learn}` };
  if (coreMissing.length <= 2)
    return { readiness: "upskill", title: `Learn: ${names(coreMissing)}`, employer: `Assign learning for ${names(coreMissing)}, then assess.${assessment.length ? ` Also verify ${names(assessment)}.` : ""}`, worker: `Build ${names(coreMissing)} through the Learning Hub, then show it in a scenario.` };
  return { readiness: "explore", title: "Longer-term development path", employer: `Several core skills are not yet evidenced (${names(coreMissing)}). Not a near-term move.`, worker: `This role needs ${names(coreMissing)}. Consider a closer role first.` };
}

export function matchRole(skills, role, profile) {
  const byId = Object.fromEntries(skills.map((s) => [s.id, s]));
  const present = [], assessment = [], missing = [];
  (role.required_skills || []).forEach((req) => {
    const skill = SKILL_MAP[req.skill];
    if (!skill) return;
    const min = req.min_evidence || "document_supported";
    const have = byId[req.skill];
    if (have && rankOf(have.state) >= rankOf(min)) present.push({ req, skill, have });
    else if (have) assessment.push({ req, skill, have, reason: `Currently ${lbl(have.state)} — role needs ${lbl(min)} or stronger` });
    else {
      const via = (skill.related || []).map((r) => byId[r]).find((s) => s && rankOf(s.state) >= 2);
      if (via) assessment.push({ req, skill, via, reason: `Transferable from ${via.name} (${lbl(via.state)})` });
      else missing.push({ req, skill });
    }
  });
  const reqIds = new Set((role.required_skills || []).map((r) => r.skill));
  const experience = (profile?.work_history || [])
    .map((h) => ({ ...h, overlap: extractSkillsFromText(`${h.role} ${h.tasks}`).filter((id) => reqIds.has(id)) }))
    .filter((h) => h.overlap.length);
  const core = (l) => l.filter((i) => i.req.importance !== "preferred");
  const nextAction = decide(core(missing), core(assessment), missing, assessment);
  return { present, assessment, missing, evidence: collectEvidence([...present, ...assessment]), experience, nextAction, readiness: nextAction.readiness };
}

export const compareMatches = (a, b) =>
  READINESS[a.readiness].tier - READINESS[b.readiness].tier || b.present.length - a.present.length || a.missing.length - b.missing.length;

export const rankCandidates = (workers, role) =>
  workers.map((w) => ({ worker: w, match: matchRole(w.skills, role, w.profile) })).sort((a, b) => compareMatches(a.match, b.match));