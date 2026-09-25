const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };


// Turns a spoken/free-text work story into structured history entries.
export async function parseWorkHistory(transcript) {
  const res = await db.integrations.Core.InvokeLLM({
    prompt: `A frontline worker in India described their work history by voice (may be Hindi, Hinglish or another Indian language; speech-to-text may contain errors).
Extract each distinct job as an entry. Write role, employer and tasks in simple English, keeping the worker's real meaning. Do not invent facts.
duration_months: best estimate from what they said (0 if unknown).
tasks: 2-4 short sentences describing daily work in their own terms.

Transcript:
"""${transcript}"""`,
    response_json_schema: {
      type: "object",
      properties: {
        entries: {
          type: "array",
          items: {
            type: "object",
            properties: { role: { type: "string" }, employer: { type: "string" }, duration_months: { type: "number" }, tasks: { type: "string" } },
          },
        },
      },
    },
  });
  return (res.entries || []).map((e) => ({ ...e, source: "voice" }));
}