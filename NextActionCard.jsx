import { ArrowUpRight } from "lucide-react";
import ReadinessBadge from "@/components/shared/ReadinessBadge";

export default function NextActionCard({ action, perspective = "worker" }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-ink p-5 text-white md:flex-row md:items-center">
      <div className="rounded-xl bg-brand/20 p-2.5 self-start"><ArrowUpRight className="h-5 w-5 text-brand" /></div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Recommended next action</p>
          <ReadinessBadge readiness={action.readiness} />
        </div>
        <p className="mt-1 font-heading text-lg font-semibold">{action.title}</p>
        <p className="mt-0.5 text-sm text-white/70">{perspective === "employer" ? action.employer : action.worker}</p>
      </div>
    </div>
  );
}