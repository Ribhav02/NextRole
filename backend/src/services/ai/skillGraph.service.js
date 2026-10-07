import { SKILL_MAP } from "../../../../ai/skills/skillTaxonomy.js";
import { rankOf } from "../../../../ai/evidence/evidenceModel.js";

export function buildWorkerSkillGraph({ workerSkills = [], workHistory = [], evidence = [], managerReviews = [], companyFeedback = [] }) {
  const nodes = [];
  const edges = [];
  const bySkill = new Map();

  for (const ws of workerSkills) {
    const skill = ws.skill || SKILL_MAP[ws.skillId];
    if (!skill) continue;

    const score = Math.max(0, Math.min(100, Number(ws.score || 0)));
    const evidenceRank = rankOf(ws.evidenceState);
    const node = {
      id: skill.id,
      label: skill.name,
      category: skill.category,
      score,
      evidenceState: ws.evidenceState,
      evidenceRank,
      confidence: Math.min(1, score / 100),
    };

    nodes.push(node);
    bySkill.set(skill.id, node);
  }

  for (const node of nodes) {
    const skill = SKILL_MAP[node.id];
    for (const relatedId of skill.related || []) {
      if (bySkill.has(relatedId) && node.id < relatedId) {
        edges.push({ source: node.id, target: relatedId, relationship: "related" });
      }
    }
  }

  const experienceSignals = workHistory.map((item) => ({
    type: "work_history",
    label: item.role,
    employer: item.employer,
    sourceId: item.id,
  }));

  const evidenceSignals = evidence.map((item) => ({
    type: "evidence",
    label: item.title,
    state: item.state,
    sourceId: item.id,
  }));

  const reviewSignals = [...managerReviews, ...companyFeedback].map((item) => ({
    type: item.managerId ? "manager_review" : "company_feedback",
    label: item.title || item.summary || "Workplace feedback",
    score: item.overallScore,
    sourceId: item.id,
  }));

  return {
    nodes,
    edges,
    signals: [...experienceSignals, ...evidenceSignals, ...reviewSignals],
    generatedAt: new Date().toISOString(),
  };
}
