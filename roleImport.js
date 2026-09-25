import { SKILLS } from "@/lib/intelligence/skillTaxonomy";
import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";

const toSkillId = (v = "") => {
  const s = v.trim().toLowerCase();
  return SKILLS.find((k) => k.id === s || k.name.toLowerCase() === s)?.id;
};
const norm = (raw, imp, min) => ({
  skill: toSkillId(raw), raw: (raw || "").trim(),
  importance: (imp || "").trim() === "preferred" ? "preferred" : "core",
  min_evidence: EVIDENCE_STATES[(min || "").trim()] ? min.trim() : "document_supported",
});

function parseSkills(val) {
  if (Array.isArray(val)) return val.map((r) => (typeof r === "string" ? norm(r) : norm(r.skill || r.name, r.importance, r.min_evidence)));
  return String(val || "").split(";").filter((p) => p.trim()).map((p) => norm(...p.split(":")));
}

function splitRow(line) {
  const out = []; let cur = "", q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = splitRow(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((l) => { const c = splitRow(l); return Object.fromEntries(headers.map((h, i) => [h, (c[i] || "").trim()])); });
}

export function parseRoles(text) {
  const t = text.trim();
  let rows;
  if (t.startsWith("[") || t.startsWith("{")) { const d = JSON.parse(t); rows = Array.isArray(d) ? d : d.roles || [d]; }
  else rows = parseCSV(t);
  return rows.filter((r) => r.title).map((r) => {
    const skills = parseSkills(r.required_skills);
    return {
      title: r.title, department: r.department || "", location: r.location || "", shift: r.shift || "", description: r.description || "",
      required_skills: skills.filter((s) => s.skill).map(({ raw, ...s }) => s),
      unknown: skills.filter((s) => !s.skill).map((s) => s.raw),
    };
  });
}

export const SAMPLE_CSV = `title,department,location,shift,description,required_skills
Hub Supervisor,Hub Operations,Thane Hub,Night,Lead night sort team,Shift Supervision:core:verified;Parcel Sorting:core;Basic Reporting (Sheets/Excel):preferred
Returns Associate,Reverse Logistics,Bhiwandi,Day,Process returns and RTO,returns_processing:core;quality_checks:core;scanning_systems:preferred`;