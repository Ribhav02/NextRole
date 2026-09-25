const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin, ArrowRight } from "lucide-react";

import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";
import { rankCandidates } from "@/lib/intelligence/matching";

const STATUS = { open: "bg-emerald-50 text-emerald-700", draft: "bg-stone-100 text-stone-600", closed: "bg-rose-50 text-rose-700" };
const NEXT = { open: "closed", closed: "open", draft: "open" };

export default function RoleCard({ role, workers }) {
  const qc = useQueryClient();
  const ranked = rankCandidates(workers, role);
  const near = ranked.filter((r) => r.match.readiness === "ready" || r.match.readiness === "assess").length;
  const toggle = async () => { await db.entities.Role.update(role.id, { status: NEXT[role.status] }); qc.invalidateQueries({ queryKey: ["orgRoles"] }); qc.invalidateQueries({ queryKey: ["openRoles"] }); };
  return (
    <div className="flex flex-col rounded-2xl border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-xl font-semibold">{role.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">{role.department}{role.location && <><span className="mx-1">·</span><MapPin className="h-3.5 w-3.5" />{role.location}</>}</p>
        </div>
        <button onClick={toggle} title="Toggle status" className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS[role.status]}`}>{role.status}</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(role.required_skills || []).map((r) => SKILL_MAP[r.skill] && (
          <span key={r.skill} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${r.importance === "preferred" ? "border-dashed text-muted-foreground" : "bg-secondary font-medium"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${EVIDENCE_STATES[r.min_evidence || "document_supported"].dot}`} />{SKILL_MAP[r.skill].name}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">Solid = core · dashed = preferred · dot = minimum evidence</p>
      <div className="mt-auto flex items-center justify-between border-t pt-4 mt-5">
        <p className="text-sm"><b>{near}</b> <span className="text-muted-foreground">near-ready internal candidates</span></p>
        <Link to={`/employer/talent?role=${role.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand">Find talent <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}