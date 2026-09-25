import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";

const COLS = [
  { key: "present", title: "Present skills", icon: CheckCircle2, tone: "text-emerald-600", bg: "bg-emerald-50/60 border-emerald-100" },
  { key: "assessment", title: "Assessment needed", icon: HelpCircle, tone: "text-amber-600", bg: "bg-amber-50/60 border-amber-100" },
  { key: "missing", title: "Missing skills", icon: XCircle, tone: "text-rose-500", bg: "bg-rose-50/50 border-rose-100" },
];

const reasonFor = (key, item) => {
  if (key === "present") {
    const src = item.have.sources.find((s) => s.state === item.have.state);
    return `${EVIDENCE_STATES[item.have.state].label}${src ? ` · ${src.label}` : ""}`;
  }
  if (key === "assessment") return item.reason;
  return "No evidence yet";
};

export default function MatchColumns({ match }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {COLS.map((c) => (
        <div key={c.key} className={`rounded-2xl border p-4 ${c.bg}`}>
          <div className="mb-3 flex items-center gap-2">
            <c.icon className={`h-4 w-4 ${c.tone}`} />
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <span className="ml-auto text-xs font-semibold text-muted-foreground">{match[c.key].length}</span>
          </div>
          <ul className="space-y-2.5">
            {match[c.key].map((item) => (
              <li key={item.skill.id} className="rounded-xl bg-white/80 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{item.skill.name}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{item.req.importance === "preferred" ? "Preferred" : "Core"}</span>
                </div>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{reasonFor(c.key, item)}</p>
              </li>
            ))}
            {!match[c.key].length && <li className="text-xs text-muted-foreground">None</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}