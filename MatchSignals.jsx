import { FolderLock, Briefcase } from "lucide-react";
import EvidenceBadge from "@/components/shared/EvidenceBadge";
import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";

export default function MatchSignals({ match, hideEvidence = false }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-2xl border bg-card p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold"><FolderLock className="h-4 w-4 text-brand" />Relevant evidence</h4>
        {hideEvidence ? <p className="text-xs text-muted-foreground">The worker has chosen not to share evidence details. Skill states remain visible.</p> : (
          <ul className="space-y-2.5">
            {match.evidence.map((e) => (
              <li key={e.ref} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-medium">{e.label}</span><EvidenceBadge state={e.state} /></div>
                <p className="text-xs text-muted-foreground">Supports: {e.skills.join(", ")}</p>
              </li>
            ))}
            {!match.evidence.length && <p className="text-xs text-muted-foreground">No supporting evidence yet.</p>}
          </ul>
        )}
      </div>
      <div className="rounded-2xl border bg-card p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Briefcase className="h-4 w-4 text-brand" />Relevant experience</h4>
        <ul className="space-y-2.5">
          {match.experience.map((h, i) => (
            <li key={i}>
              <p className="text-sm font-medium">{h.role} <span className="font-normal text-muted-foreground">· {h.employer} · {Math.round((h.duration_months || 0) / 12 * 10) / 10} yrs</span></p>
              <p className="text-xs text-muted-foreground">Overlaps with: {h.overlap.map((id) => SKILL_MAP[id].name).join(", ")}</p>
            </li>
          ))}
          {!match.experience.length && <p className="text-xs text-muted-foreground">No directly overlapping work history shared.</p>}
        </ul>
      </div>
    </div>
  );
}