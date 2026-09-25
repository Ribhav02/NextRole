import { CircleDashed, FileText, UserCheck, Award, ShieldCheck } from "lucide-react";
import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";

const ICONS = { self_declared: CircleDashed, document_supported: FileText, verified: UserCheck, demonstrated: Award, platform_verified: ShieldCheck };

export default function EvidenceBadge({ state, useStatus = false }) {
  const s = EVIDENCE_STATES[state] || EVIDENCE_STATES.self_declared;
  const Icon = ICONS[state] || CircleDashed;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold ${s.chip}`}>
      <Icon className="h-3.5 w-3.5" />
      {useStatus ? s.status : s.label}
    </span>
  );
}