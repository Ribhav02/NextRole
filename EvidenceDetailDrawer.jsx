const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Image, FileText, Award, UserCheck, Database, Users, History, ClipboardCheck, ExternalLink, ShieldAlert, CheckCircle2, Lock, Eye, Info } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";
import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import EvidenceBadge from "@/components/shared/EvidenceBadge";
import SkillChip from "@/components/shared/SkillChip";

const ICON = { screenshot: Image, document: FileText, certificate: Award, supervisor_confirmation: UserCheck, peer_confirmation: Users, work_history: History, scenario: ClipboardCheck, platform_data: Database };
const FLAG = {
  consistent: { icon: CheckCircle2, label: "Consistent", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  minor_discrepancy: { icon: ShieldAlert, label: "Minor discrepancy — flagged for review", cls: "bg-amber-50 text-amber-800 border-amber-200" },
  pending: { icon: Info, label: "Awaiting review", cls: "bg-sky-50 text-sky-700 border-sky-200" },
};

function Section({ title, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
        {hint && <span className="text-[10px] text-muted-foreground/70">· {hint}</span>}
      </div>
      {children}
    </div>
  );
}

// Worker (full) and employer (consent-aware) evidence detail.
export default function EvidenceDetailDrawer({ item, open, onOpenChange, mode = "worker", consent = {} }) {
  if (!item) return null;
  const Icon = ICON[item.evidence_type] || FileText;
  const employer = mode === "employer";
  const canSeeDetails = !employer || consent.share_evidence !== false;
  const flag = FLAG[item.verification_flag];
  const view = async () => { const { signed_url } = await db.integrations.Core.CreateFileSignedUrl({ file_uri: item.file_uri, expires_in: 300 }); window.open(signed_url, "_blank"); };
  const showFile = item.file_uri && (employer ? canSeeDetails : true);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-secondary p-2.5"><Icon className="h-5 w-5 text-foreground/70" /></div>
            <div>
              <SheetTitle className="text-left">{item.title}</SheetTitle>
              <p className="text-xs capitalize text-muted-foreground">{(item.evidence_type || "").replace("_", " ")}{item.date ? ` · ${item.date}` : ""}</p>
            </div>
          </div>
        </SheetHeader>
        <div className="space-y-5">
          <div className="flex items-center gap-2 rounded-xl border bg-secondary/50 px-3 py-2 text-xs">
            {canSeeDetails ? <><Eye className="h-3.5 w-3.5 text-emerald-600" /><span className="font-medium">Shared with employer</span></> : <><Lock className="h-3.5 w-3.5" /><span className="font-medium">Private — not shared with employer</span></>}
          </div>

          <Section title="Status"><EvidenceBadge state={item.evidence_state} useStatus /></Section>

          {canSeeDetails && (item.extracted_data?.length || item.extraction_notes) && (
            <Section title="Extracted from evidence" hint="AI-assisted · not authenticated">
              {item.extracted_data?.length ? (
                <dl className="space-y-1.5">{item.extracted_data.map((d, i) => (<div key={i} className="flex justify-between text-sm"><dt className="text-muted-foreground">{d.label}</dt><dd className="font-medium">{d.value}</dd></div>))}</dl>
              ) : <p className="text-sm text-muted-foreground">{item.extraction_notes}</p>}
            </Section>
          )}

          {canSeeDetails && item.worker_declared && (
            <Section title="Worker declared"><p className="text-sm">{item.worker_declared}</p></Section>
          )}

          {canSeeDetails && flag && (
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium ${flag.cls}`}><flag.icon className="h-4 w-4" />{flag.label}</div>
          )}

          <Section title="Skills supported">
            <div className="flex flex-wrap gap-1.5">
              {(item.extracted_skills || []).map((id) => SKILL_MAP[id] && <SkillChip key={id} name={SKILL_MAP[id].name} state={item.evidence_state} size="sm" />)}
              {!item.extracted_skills?.length && <span className="text-sm text-muted-foreground">None</span>}
            </div>
          </Section>

          <Section title="Verification">
            {item.verifier_name ? (
              <div className="text-sm"><p><b>{item.verifier_name}</b>{item.verifier_role && `, ${item.verifier_role}`}</p>{item.verifier_contact && <p className="text-xs text-muted-foreground">{item.verifier_contact}</p>}</div>
            ) : <p className="text-sm text-muted-foreground">{item.verification_status === "pending" ? "Awaiting confirmation." : "No verifier — self-declared or document-supported only."}</p>}
          </Section>

          {showFile && <button onClick={view} className="inline-flex items-center gap-1 text-sm font-semibold text-brand"><ExternalLink className="h-3.5 w-3.5" />View file</button>}

          {item.caution && <p className="flex gap-1.5 text-xs text-muted-foreground"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />{item.caution}</p>}
        </div>
      </SheetContent>
    </Sheet>
  );
}