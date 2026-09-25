import { Link } from "react-router-dom";
import { rankCandidates } from "@/lib/intelligence/matching";

export default function RoleGapTable({ role, workers }) {
  const ranked = rankCandidates(workers, role);
  const gapMap = {};
  ranked.forEach(({ match }) => [...match.missing, ...match.assessment].forEach((i) => {
    const k = i.skill.id;
    gapMap[k] ||= { skill: i.skill, missing: 0, assess: 0 };
    if (match.missing.includes(i)) gapMap[k].missing += 1; else gapMap[k].assess += 1;
  }));
  const gaps = Object.values(gapMap).sort((a, b) => (b.missing + b.assess) - (a.missing + a.assess));
  const near = ranked.filter((r) => r.match.readiness === "ready" || r.match.readiness === "assess").length;
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold">{role.title}</h3>
        <Link to={`/employer/talent?role=${role.id}`} className="text-sm font-medium text-brand">Find talent →</Link>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{near} near-ready · {ranked.length} total candidates</p>
      <table className="mt-4 w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-2">Skill</th><th className="p-2">Missing</th><th className="p-2">To assess</th><th className="p-2">Suggested</th></tr></thead>
        <tbody className="divide-y">
          {gaps.map((g) => (
            <tr key={g.skill.id}><td className="p-2 font-medium">{g.skill.name}</td><td className="p-2">{g.missing || "—"}</td><td className="p-2">{g.assess || "—"}</td><td className="p-2 text-muted-foreground">{g.missing > 0 ? "Learn" : "Assess"}</td></tr>
          ))}
        </tbody>
      </table>
      {!gaps.length && <p className="mt-3 text-sm text-muted-foreground">No gaps — the workforce covers this role.</p>}
    </div>
  );
}