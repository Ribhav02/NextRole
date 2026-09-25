import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { rankOf } from "@/lib/intelligence/evidenceModel";
import SkillChip from "@/components/shared/SkillChip";
import ReadinessBadge from "@/components/shared/ReadinessBadge";

export default function TalentCard({ worker, match, role, blind, index, minEvidence }) {
  const p = worker.profile;
  const top = worker.skills.filter((s) => rankOf(s.state) >= Math.max(2, minEvidence)).slice(0, 6);
  const name = blind ? `Candidate ${String.fromCharCode(65 + (index % 26))}-${String(p.id).slice(-3).toUpperCase()}` : p.name;
  const years = p.years_experience ? `${p.years_experience} yrs` : null;
  return (
    <Link to={`/employer/candidate/${p.id}${role ? `?role=${role.id}` : ""}`} className="group flex flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary font-heading font-semibold">{blind ? "?" : p.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
        <div className="flex-1">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{[p.current_role, years, blind ? null : p.city].filter(Boolean).join(" · ")}</p>
        </div>
        {match && <ReadinessBadge readiness={match.readiness} />}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">{top.map((s) => <SkillChip key={s.id} name={s.name} state={s.state} size="sm" />)}{!top.length && <span className="text-xs text-muted-foreground">No evidence-backed skills yet</span>}</div>
      {match && (
        <div className="mt-4 border-t pt-3">
          <p className="flex gap-4 text-xs"><span><b className="text-emerald-600">{match.present.length}</b> present</span><span><b className="text-amber-600">{match.assessment.length}</b> assess</span><span><b className="text-rose-500">{match.missing.length}</b> missing</span></p>
          <p className="mt-1.5 text-sm">{match.nextAction.title}</p>
        </div>
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">Candidate 360 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
    </Link>
  );
}