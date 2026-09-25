import useEmployerData from "@/hooks/useEmployerData";
import { rankCandidates } from "@/lib/intelligence/matching";
import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import PageHeader from "@/components/shared/PageHeader";
import RoleGapTable from "@/components/employer/RoleGapTable";

export default function EmployerSkillGaps() {
  const { roles, workers } = useEmployerData();
  const open = roles.filter((r) => r.status === "open");
  const priorities = {};
  open.forEach((role) => rankCandidates(workers, role).forEach(({ match }) =>
    match.missing.filter((m) => m.req.importance !== "preferred").forEach((m) => { priorities[m.skill.id] = (priorities[m.skill.id] || 0) + 1; })
  ));
  const prioList = Object.entries(priorities).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const top = prioList[0]?.[1] || 1;
  return (
    <div>
      <PageHeader eyebrow="Skill gap analysis" title="What's blocking internal moves" description="For each open role, the core skills the workforce is missing or needs to assess — and where training would unlock the most mobility." />
      {prioList.length > 0 && (
        <section className="mb-6 rounded-2xl border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold">Training priorities</h2>
          <p className="mt-1 text-sm text-muted-foreground">Core gaps appearing across the most roles.</p>
          <ul className="mt-4 space-y-2">
            {prioList.map(([id, n]) => (
              <li key={id} className="flex items-center gap-3"><span className="w-48 truncate text-sm">{SKILL_MAP[id].name}</span><div className="h-2 flex-1 rounded-full bg-secondary"><div className="h-full rounded-full bg-rose-400" style={{ width: `${(n / top) * 100}%` }} /></div><span className="text-sm font-semibold">{n}</span></li>
            ))}
          </ul>
        </section>
      )}
      <div className="space-y-4">
        {open.map((role) => <RoleGapTable key={role.id} role={role} workers={workers} />)}
        {!open.length && <p className="text-sm text-muted-foreground">No open roles to analyse.</p>}
      </div>
    </div>
  );
}