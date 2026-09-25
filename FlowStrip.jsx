import { ChevronRight } from "lucide-react";

const STEPS = ["Real work", "Evidence", "Skills", "Gaps", "Opportunities"];

export default function FlowStrip({ active = -1, dark = false }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {STEPS.map((s, i) => {
        const on = i <= active;
        const tone = dark
          ? on ? "bg-brand text-white" : "bg-white/10 text-white/70"
          : on ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground";
        return (
          <div key={s} className="flex items-center gap-1.5">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${tone}`}>{s}</span>
            {i < STEPS.length - 1 && <ChevronRight className={`h-3.5 w-3.5 ${dark ? "text-white/40" : "text-muted-foreground/60"}`} />}
          </div>
        );
      })}
    </div>
  );
}