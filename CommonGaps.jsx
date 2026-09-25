import { rankCandidates } from "@/lib/intelligence/matching";

export default function CommonGaps({ roles, workers }) {
  const counts = {};
  roles.forEach((role) => rankCandidates(workers, role).forEach(({ match }) =>
    match.missing.filter((m) => m.req.importance !== "preferred").forEach((m) => { counts[m.skill.name] = (counts[m.skill.name] || 0) + 1; })
  ));
  const list = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 7);
  const max = list[0]?.[1] || 1;
  return (
    <section className="h-full rounded-2xl border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold">Most common core gaps</h2>
      <p className="mt-1 text-sm text-muted-foreground">Where a training programme would unlock the most moves.</p>
      <ul className="mt-5 space-y-3">
        {list.map(([name, n]) => (
          <li key={name}>
            <div className="flex justify-between text-sm"><span>{name}</span><span className="text-muted-foreground">{n}</span></div>
            <div className="mt-1.5 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-rose-400" style={{ width: `${(n / max) * 100}%` }} /></div>
          </li>
        ))}
        {!list.length && <p className="text-sm text-muted-foreground">No core gaps found.</p>}
      </ul>
    </section>
  );
}