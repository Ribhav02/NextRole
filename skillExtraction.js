const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };


import { SKILLS, SKILL_MAP } from "./skillTaxonomy";

// Deterministic keyword extraction from free text (work history).
// Explainable by design: each skill is tied to words the worker actually used.
export function extractSkillsFromText(text = "") {
  const t = text.toLowerCase();
  return SKILLS.filter((s) => s.keywords.some((k) => new RegExp(`\\b${k}`).test(t))).map((s) => s.id);
}

// AI-assisted extraction from uploaded evidence. Output is constrained to the taxonomy
// and always reviewed by the worker before saving.
export async function extractSkillsFromEvidence({ file_url, title, description, evidence_type }) {
  const res = await db.integrations.Core.InvokeLLM({
    prompt: `You are the skill-extraction assistant for NextRole, a workforce mobility platform for India's frontline and gig workers.
A worker uploaded work evidence. Identify ONLY the skills from the taxonomy that the evidence clearly supports.
Evidence title: ${title}
Evidence type: ${evidence_type}
Worker's note: ${description || "none"}

Taxonomy (id: name): ${SKILLS.map((s) => `${s.id}: ${s.name}`).join("; ")}

Also return:
- summary: one neutral sentence on what the evidence appears to show.
- caution: one sentence noting limits (e.g. the document is not independently authenticated, image unclear).
Never state that the document is authentic or verified.`,
    file_urls: file_url ? [file_url] : undefined,
    response_json_schema: {
      type: "object",
      properties: {
        skills: { type: "array", items: { type: "string", enum: SKILLS.map((s) => s.id) } },
        summary: { type: "string" },
        caution: { type: "string" },
      },
    },
  });
  return { skills: (res.skills || []).filter((id) => SKILL_MAP[id]), summary: res.summary, caution: res.caution };
}