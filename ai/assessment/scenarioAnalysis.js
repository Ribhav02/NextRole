import { SKILL_MAP } from "../skills/skillTaxonomy.js";

export function analyzeScenarioResponse(scenario, response = "") {
  const text = String(response).toLowerCase();
  const demonstratedSkills = [];
  const partialSkills = [];

  for (const skillId of scenario.targetSkills || []) {
    const skill = SKILL_MAP[skillId];
    if (!skill) continue;

    const hits = skill.keywords.filter((keyword) => text.includes(keyword.toLowerCase())).length;

    if (hits >= 2) demonstratedSkills.push(skillId);
    else if (hits === 1) partialSkills.push(skillId);
  }

  return {
    demonstratedSkills,
    partialSkills: partialSkills.filter((id) => !demonstratedSkills.includes(id)),
    strengths: demonstratedSkills.map((id) => `Shows evidence of ${SKILL_MAP[id].name}.`),
    improvements: partialSkills.map((id) => `Build stronger evidence for ${SKILL_MAP[id].name} through practice or supervisor confirmation.`),
    score: Math.round((demonstratedSkills.length / Math.max(1, (scenario.targetSkills || []).length)) * 100),
    note: "The initial rule-based evaluator focuses on workplace judgement signals; multilingual wording should not reduce a worker's score.",
  };
}
