import { format } from "date-fns";
import { DECISIONS } from "@/components/employer/DecisionPanel";

export default function RecentDecisions({ decisions, roles, workers }) {
  const name = (id) => workers.find((w) => w.profile.id === id)?.profile.name || "Worker";
  const role = (id) => roles.find((r) => r.id === id)?.title || "Role";
  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold">Recent decisions</h2>
      <p className="mt-1 text-sm text-muted-foreground">Made by your team — NextRole only recommends.</p>
      <ul className="mt-5 space-y-3">
        {decisions.slice(0, 6).map((d) => (
          <li key={d.id} className="text-sm">
            <p><b>{name(d.worker_profile_id)}</b> · {role(d.role_id)}</p>
            <p className="text-xs text-muted-foreground">{DECISIONS.find((x) => x.id === d.decision)?.label} · {format(new Date(d.created_date), "d MMM")}</p>
          </li>
        ))}
        {!decisions.length && <p className="text-sm text-muted-foreground">No decisions yet.</p>}
      </ul>
    </section>
  );
}