import { EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";
import EvidenceBadge from "@/components/shared/EvidenceBadge";

export default function EvidenceLegend({ compact = false }) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-wider">How each skill is known</span>
        {STATE_ORDER.map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${EVIDENCE_STATES[k].dot}`} />
            {EVIDENCE_STATES[k].label}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {STATE_ORDER.map((k) => (
        <div key={k} className="rounded-xl border bg-card p-4">
          <EvidenceBadge state={k} />
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{EVIDENCE_STATES[k].desc}</p>
        </div>
      ))}
    </div>
  );
}