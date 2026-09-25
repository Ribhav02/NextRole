import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Lock, Eye, Briefcase } from "lucide-react";
import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";
import EvidenceBadge from "@/components/shared/EvidenceBadge";
import EvidenceDetailDrawer from "@/components/shared/EvidenceDetailDrawer";
import { relatedExperience } from "@/lib/intelligence/skillExplanation";

// Employer view of the evidence behind a single skill — consent-aware.
export default function SkillEvidenceDrawer({ skill, worker, open, onOpenChange }) {
  const [sel, setSel] = useState(null);
  if (!skill) return null;
  const consent = worker.profile.consent || {};
  const canSee = consent.share_evidence !== false;
  const items = worker.evidence.filter((e) => (e.extracted_skills || []).includes(skill.id));
  const exp = relatedExperience(skill, worker.profile);
  const seeExp = consent.share_work_history !== false;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left">Evidence for {skill.name}</SheetTitle>
          <div className="mt-1"><EvidenceBadge state={skill.state} useStatus /></div>
        </SheetHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-xl border bg-secondary/50 px-3 py-2 text-xs">
            {canSee ? <><Eye className="h-3.5 w-3.5 text-emerald-600" /><span className="font-medium">Worker shared evidence details</span></> : <><Lock className="h-3.5 w-3.5" /><span className="font-medium">Worker has not shared evidence details</span></>}
          </div>
          {canSee ? (
            items.length ? (
              <ul className="space-y-2">
                {items.map((e) => (
                  <li key={e.id}><button onClick={() => setSel(e)} className="w-full rounded-xl border p-3 text-left hover:bg-secondary/50">
                    <div className="flex items-center justify-between gap-2"><span className="text-sm font-medium">{e.title}</span><EvidenceBadge state={e.evidence_state} useStatus /></div>
                    <p className="text-xs capitalize text-muted-foreground">{e.evidence_type.replace("_", " ")}{e.verifier_name ? ` · ${e.verifier_name}` : ""}</p>
                  </button></li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted-foreground">No evidence items shared for this skill.</p>
          ) : (
            <p className="text-sm text-muted-foreground">Evidence details are private. The skill state remains visible: <b>{EVIDENCE_STATES[skill.state].label}</b>.</p>
          )}
          {exp.length > 0 && (seeExp ? (
            <div><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Relevant experience</h4><ul className="space-y-2">{exp.map((h, i) => (<li key={i} className="flex gap-2.5 text-sm"><Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div><p className="font-medium">{h.role}</p><p className="text-xs text-muted-foreground">{h.employer}</p></div></li>))}</ul></div>
          ) : <p className="text-xs text-muted-foreground">Relevant experience not shared by worker.</p>)}
        </div>
        <EvidenceDetailDrawer item={sel} open={!!sel} onOpenChange={(o) => !o && setSel(null)} mode="employer" consent={consent} />
      </SheetContent>
    </Sheet>
  );
}