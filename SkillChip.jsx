import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";

export default function SkillChip({ name, state = "self_declared", size = "md", showLabel = false, muted = false }) {
  const s = EVIDENCE_STATES[state] || EVIDENCE_STATES.self_declared;
  const sizing = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-[13px]";
  const tone = muted ? "bg-white text-muted-foreground border-dashed border-border" : s.chip;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizing} ${tone}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${muted ? "bg-stone-300" : s.dot}`} />
      {name}
      {showLabel && <span className="opacity-60">· {s.label}</span>}
    </span>
  );
}