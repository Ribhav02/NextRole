import useWorkerData from "@/hooks/useWorkerData";
import useWorkerApplications from "@/hooks/useWorkerApplications";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import RoleMatchCard from "@/components/worker/RoleMatchCard";
import { Compass } from "lucide-react";

export default function RecommendedRoles() {
  const { profile, matches } = useWorkerData();
  const { applications, express } = useWorkerApplications(profile?.id);
  const appFor = (roleId) => applications.find((a) => a.role_id === roleId && a.status !== "withdrawn");
  const active = applications.filter((a) => a.status !== "withdrawn");
  return (
    <div>
      <PageHeader eyebrow="Step 5 · Opportunities" title="Recommended internal roles" description="No match percentages. For every role we show which skills you have, which need to be checked, and what to learn — with the evidence behind it." />
      {active.length > 0 && <p className="mb-4 text-sm text-muted-foreground">You've expressed interest in <b className="text-foreground">{active.length}</b> role{active.length > 1 && "s"}.</p>}
      {matches.length ? (
        <div className="space-y-4">{matches.map((m, i) => <RoleMatchCard key={m.role.id} role={m.role} match={m.match} defaultOpen={i === 0} application={appFor(m.role.id)} onExpress={() => express(m.role)} />)}</div>
      ) : (
        <EmptyState icon={Compass} title="No open roles yet" description="When employers publish internal roles, they'll appear here with clear reasons." />
      )}
      <p className="mt-8 text-xs text-muted-foreground">Recommendations help you explore. Expressing interest lets the employer know — final decisions are made by people.</p>
    </div>
  );
}