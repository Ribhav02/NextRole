import { Link } from "react-router-dom";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { exitDemo } from "@/lib/demo";
import useDemoIds from "@/hooks/useDemoIds";

const TOUR = [["Work history", "/worker/history"], ["Evidence", "/worker/evidence"], ["Skills", "/worker/skills"], ["Scenario", "/worker/assessment"], ["Roles", "/worker/roles"]];

export default function DemoBanner() {
  const { workerId, roleId } = useDemoIds();
  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-semibold text-amber-900">Ramesh Demo Mode</span>
          <span className="hidden text-amber-800/80 xl:inline">— sample worker, 3 years in delivery</span>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {TOUR.map(([l, to], i) => (
            <Link key={to} to={to} className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-amber-900 hover:bg-white">{i + 1}. {l}</Link>
          ))}
          {workerId && (
            <Link to={`/employer/candidate/${workerId}?role=${roleId || ""}`} className="inline-flex items-center gap-1 rounded-full bg-amber-900 px-3 py-1 text-xs font-semibold text-white">
              6. Employer view <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
        <button onClick={() => exitDemo("/")} className="inline-flex items-center gap-1 self-start text-xs font-medium text-amber-900/70 hover:text-amber-900 md:self-auto"><X className="h-3.5 w-3.5" />Exit demo</button>
      </div>
    </div>
  );
}