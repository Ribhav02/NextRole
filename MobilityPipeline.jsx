import { Link } from "react-router-dom";
import { rankCandidates, READINESS } from "@/lib/intelligence/matching";
import ReadinessBadge from "@/components/shared/ReadinessBadge";

const BAR = { ready: "bg-emerald-500", assess: "bg-amber-400", upskill: "bg-sky-400", explore: "bg-stone-300" };

export default function MobilityPipeline({ roles, workers }) {
  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold">Mobility pipeline</h2>
      <p className="mt-1 text-sm text-muted-foreground">Internal candidates per role, grouped by readiness.</p>
      <div className="mt-5 space-y-5">
        {roles.map((role) => {
          const ranked = rankCandidates(workers, role);
          const counts = Object.keys(READINESS).map((k) => [k, ranked.filter((r) => r.match.readiness === k).length]);
          return (
            <div key={role.id} className="border-t pt-5 first:border-0 first:pt-0">
              <div className="flex items-center justify-between gap-2">
                <Link to={`/employer/talent?role=${role.id}`} className="font-semibold hover:text-brand">{role.title}</Link>
                <span className="text-xs text-muted-foreground">{role.department}</span>
              </div>
              <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-secondary">
                {counts.map(([k, n]) => n > 0 && <div key={k} className={BAR[k]} style={{ width: `${(n / ranked.length) * 100}%` }} />)}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {ranked.slice(0, 3).map(({ worker, match }) => (
                  <Link key={worker.profile.id} to={`/employer/candidate/${worker.profile.id}?role=${role.id}`} className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs hover:bg-secondary">
                    <span className="font-medium">{worker.profile.name}</span><ReadinessBadge readiness={match.readiness} />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        {!roles.length && <p className="text-sm text-muted-foreground">Create a role to see your pipeline.</p>}
      </div>
    </section>
  );
}