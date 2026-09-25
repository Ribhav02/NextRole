import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight, Users } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

export default function CandidatePipeline({ rows }) {
  if (!rows.length) return <EmptyState icon={Users} title="No candidates yet" description="When workers express interest or your team makes decisions, they'll appear here." />;
  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-3">Worker</th><th className="p-3">Role</th><th className="p-3">Type</th><th className="p-3">Status</th><th className="p-3">Date</th><th></th></tr></thead>
        <tbody className="divide-y">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-secondary/30">
              <td className="p-3 font-medium">{r.worker}</td>
              <td className="p-3 text-muted-foreground">{r.role}</td>
              <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.tone}`}>{r.kind}</span></td>
              <td className="p-3">{r.status}</td>
              <td className="p-3 text-xs text-muted-foreground">{format(new Date(r.date), "d MMM, HH:mm")}</td>
              <td className="p-3 text-right"><Link to={`/employer/candidate/${r.workerId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-brand">360 <ArrowRight className="h-3.5 w-3.5" /></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}