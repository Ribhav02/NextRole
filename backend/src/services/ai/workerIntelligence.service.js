import { buildSkillProfile } from "../../../../ai/skills/skillProfile.js";
import { extractSkillsFromText } from "../../../../ai/skills/skillExtraction.js";
import { rankOf } from "../../../../ai/evidence/evidenceModel.js";

const clamp = (n) => Math.max(0, Math.min(100, Number(n) || 0));

export function buildWorkerIntelligence({ profile, workHistory = [], evidence = [], assessments = [], companyFeedback = [], managerReviews = [] }) {
  const normalizedProfile = { ...profile, work_history: workHistory };
  const skills = buildSkillProfile(normalizedProfile, evidence, assessments);

  const feedbackScores = [...companyFeedback, ...managerReviews]
    .map((x) => Number(x.overallScore))
    .filter(Number.isFinite);

  const feedbackAverage = feedbackScores.length
    ? feedbackScores.reduce((a, b) => a + b, 0) / feedbackScores.length
    : null;

  const skillScores = skills.map((skill) => ({
    skillId: skill.id,
    name: skill.name,
    category: skill.category,
    score: clamp(
      rankOf(skill.state) * 20 +
      Math.min(20, skill.sources.length * 5)
    ),
    evidenceState: skill.state,
  }));

  const potentialSkills = new Map();

  for (const skill of skills) {
    for (const relatedId of skill.related || []) {
      if (!potentialSkills.has(relatedId)) {
        potentialSkills.set(relatedId, {
          skillId: relatedId,
          basis: [skill.id],
          potentialScore: clamp((skillScores.find((x) => x.skillId === skill.id)?.score || 0) * 0.72),
        });
      } else {
        potentialSkills.get(relatedId).basis.push(skill.id);
      }
    }
  }

  const transferableSkills = skillScores
    .filter((s) => s.score >= 60)
    .map((s) => s.skillId);

  return {
    skills: skillScores,
    potentialSkills: [...potentialSkills.values()],
    transferableSkills,
    feedbackAverage,
    summary: {
      totalSkills: skillScores.length,
      strongSkills: skillScores.filter((s) => s.score >= 80).length,
      emergingSkills: skillScores.filter((s) => s.score >= 50 && s.score < 80).length,
      evidenceBackedSkills: skillScores.filter((s) => rankOf(s.evidenceState) >= 2).length,
    },
  };
}

export function inferSkillsFromNewExperience(text) {
  return extractSkillsFromText(text).map((skillId) => ({
    skillId,
    source: "worker_experience",
    confidence: 0.7,
  }));
}
