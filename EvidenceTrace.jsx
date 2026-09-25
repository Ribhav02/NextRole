import { useState } from "react";
import { History, FolderLock, ClipboardCheck, Lock, Eye } from "lucide-react";
import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";
import EvidenceBadge from "@/components/shared/EvidenceBadge";
import SkillEvidenceDrawer from "@/components/employer/SkillEvidenceDrawer";

const ICON = { history: History, evidence: FolderLock, assessment: ClipboardCheck };

export default function EvidenceTrace({ worker }) {
  const [sel, setSel] = useState(null);
  const showDetails = worker.profile.consent?.share_evidence !== false;
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border bg-card">
        {worker.skills.map((s) => (
          <div key={s.id} className="grid gap-3 border-b p-4 last:border-0 md:grid-cols-[200px_1fr]">
            <div>
              <p className="font-semibold">{s.name}</p>
              <div className="mt-1.5"><EvidenceBadge state={s.state} useStatus /></div>
              <button onClick={() => setSel(s)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand"><Eye className="h-3.5 w-3.5" />View evidence</button>
            </div>
            {showDetails ? (
              <ul className="space-y-1.5">
                {s.sources.map((src, i) => {
                  const Icon = ICON[src.kind];
                  return (
                    <li key={i} className="flex gap-2 text-sm">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1">
                        {src.label} <span className={`ml-1 inline-block h-1.5 w-1.5 rounded-full align-middle ${EVIDENCE_STATES[src.state].dot}`} />
                        {src.detail && <span className="block text-xs text-muted-foreground">{src.detail}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Lock className="h-3.5 w-3.5" />{s.sources.length} source{s.sources.length > 1 && "s"} · details not shared by worker</p>
            )}
          </div>
        ))}
        <p className="bg-secondary/50 px-4 py-3 text-xs text-muted-foreground">Document-supported evidence has not been independently authenticated. Verify originals before making a final decision.</p>
      </div>
      <SkillEvidenceDrawer skill={sel} worker={worker} open={!!sel} onOpenChange={(o) => !o && setSel(null)} />
    </div>
  );
}