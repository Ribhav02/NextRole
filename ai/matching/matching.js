import { SKILL_MAP } from "../skills/skillTaxonomy.js";
import { rankOf } from "../evidence/evidenceModel.js";

export const READINESS = {
  ready: { tier: 0, label: "Ready now" },
  assess: { tier: 1, label: "Ready after assessment" },
  upskill: { tier: 2, label: "Ready with upskilling" },
  explore: { tier: 3, label: "Longer-term path" },
};

export function matchRole(workerSkills = [], role = {}) {
  const byId = Object.fromEntries(workerSkills.map((s) => [s.id || s.skillId, s]));
  const present = [], assess = [], missing = [];

  for (const requirement of role.required_skills || role.requiredSkills || []) {
    const skill = SKILL_MAP[requirement.skill || requirement.skillId];
    if (!skill) continue;
    const minimum = requirement.min_evidence || requirement.minEvidence || "document_supported";
    const workerSkill = byId[skill.id];

    if (workerSkill && rankOf(workerSkill.state || workerSkill.evidenceState) >= rankOf(minimum)) {
      present.push(skill.id);
    } else if (workerSkill) {
      assess.push(skill.id);
    } else {
      const transferable = (skill.related || []).some((relatedId) => {
        const related = byId[relatedId];
        return related && rankOf(related.state || related.evidenceState) >= 2;
      });
      if (transferable) assess.push(skill.id);
      else missing.push(skill.id);
    }
  }

  const total = present.length + assess.length + missing.length;
  let readiness = "explore";
  if (!missing.length && !assess.length) readiness = "ready";
  else if (!missing.length) readiness = "assess";
  else if (missing.length <= 2) readiness = "upskill";

  return {
    readiness,
    present,
    assess,
    missing,
    score: Math.round((present.length / Math.max(1, total)) * 100),
  };
}

export function rankCandidates(workers, role) {
  return workers.map((worker) => ({
    worker,
    match: matchRole(worker.skills || [], role),
  })).sort((a, b) => b.match.score - a.match.score);
}
