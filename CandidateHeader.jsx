import { MapPin, Phone, Languages, Check, X } from "lucide-react";
import { LANGUAGES } from "@/lib/i18n";
import { rankOf } from "@/lib/intelligence/evidenceModel";

export default function CandidateHeader({ worker }) {
  const p = worker.profile;
  const c = p.consent || {};
  const backed = worker.skills.filter((s) => rankOf(s.state) >= 2).length;
  const shared = [["Work history", c.share_work_history !== false], ["Evidence", c.share_evidence !== false], ["Scenarios", c.share_assessments !== false], ["Contact", !!c.share_contact]];
  return (
    <div className="rounded-3xl bg-ink p-6 text-white md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand font-heading text-2xl font-semibold">{p.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Candidate 360</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">{p.name}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
            <span>{p.current_role}{p.current_employer && ` · ${p.current_employer}`}</span>
            {p.city && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{p.city}</span>}
            <span className="inline-flex items-center gap-1"><Languages className="h-3.5 w-3.5" />{LANGUAGES.find((l) => l.code === p.language)?.label}</span>
            {c.share_contact && p.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{p.phone}</span>}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["Years", p.years_experience || "—"], ["Skills", worker.skills.length], ["Evidenced", backed]].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-white/5 px-4 py-3"><p className="font-heading text-2xl font-semibold">{v}</p><p className="text-[11px] text-white/60">{l}</p></div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs">
        <span className="text-white/50">Shared with consent:</span>
        {shared.map(([l, on]) => <span key={l} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${on ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5 text-white/40"}`}>{on ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}{l}</span>)}
      </div>
    </div>
  );
}