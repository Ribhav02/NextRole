const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };


import { SKILL_MAP } from "./skillTaxonomy";

// AI scenario analysis against a rubric. Judges practical judgement — never language,
// grammar or accent-related transcription errors.
export async function analyzeScenarioResponse(scenario, response) {
  const ids = scenario.target_skills;
  const res = await db.integrations.Core.InvokeLLM({
    prompt: `You assess practical workplace judgement for India's frontline workers on NextRole.
Scenario: ${scenario.context}
Question: ${scenario.prompt}
Rubric: ${scenario.rubric}
Target skills: ${ids.map((id) => `${id} (${SKILL_MAP[id].name})`).join(", ")}

Worker's response (may be Hindi, Hinglish or other Indian languages, possibly from speech-to-text):
"""${response}"""

Rules:
- Evaluate practical judgement only. Do NOT penalise language, grammar, spelling or transcription errors.
- demonstrated_skills: target skills clearly shown.
- partial_skills: target skills partly shown.
- strengths: 2-3 short, specific points. improvements: 1-2 short, respectful suggestions.
- feedback: 2 sentences, encouraging, in simple English.
- Be honest; do not over-claim.`,
    response_json_schema: {
      type: "object",
      properties: {
        demonstrated_skills: { type: "array", items: { type: "string", enum: ids } },
        partial_skills: { type: "array", items: { type: "string", enum: ids } },
        strengths: { type: "array", items: { type: "string" } },
        improvements: { type: "array", items: { type: "string" } },
        feedback: { type: "string" },
      },
    },
  });
  const demonstrated = (res.demonstrated_skills || []).filter((id) => ids.includes(id));
  return { ...res, demonstrated_skills: demonstrated, partial_skills: (res.partial_skills || []).filter((id) => ids.includes(id) && !demonstrated.includes(id)) };
}