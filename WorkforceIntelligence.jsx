import { Link } from "react-router-dom";
import useEmployerData from "@/hooks/useEmployerData";
import { CATEGORIES, SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import { rankOf, EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";
import PageHeader from "@/components/shared/PageHeader";

export default function WorkforceIntelligence() {
  const { workers } = useEmployerData();
  const all = workers.flatMap((w) => w.skills);
  const counts = {};
  all.forEach((s) => { counts[s.id] = (counts[s.id] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const max = top[0]?.[1] || 1;
  const catCoverage = CATEGORIES.map((c) => {
    const ids = Object.values(SKILL_MAP).filter((s) => s.category === c).map((s) => s.id);
    return { c, workersWith: workers.filter((w) => w.skills.some((s) => ids.includes(s.id) && rankOf(s.state) >= 2)).length };
  });
  const dist = STATE_ORDER.map((k) => all.filter((s) => s.state === k).length);
  return (
    <div>
      <PageHeader eyebrow="Workforce intelligence" title="Skill supply across your workforce" description="A skill-centric view: what skills your people have, how strongly evidenced, and where coverage is thin." />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border bg-card p-6 lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold">Top evidenced skills</h2>
          <p className="mt-1 text-sm text-muted-foreground">Workers per skill, coloured by the strongest evidence present.</p>
          <ul className="mt-5 space-y-2.5">
            {top.map(([id, n]) => {
              const holders = workers.filter((w) => w.skills.some((s) => s.id === id));
              const strongest = Math.max(...holders.map((w) => rankOf(w.skills.find((s) => s.id === id).state)));
              const stateKey = STATE_ORDER.find((k) => rankOf(k) === strongest);
              return (
                <li key={id} className="flex items-center gap-3">
                  <span className="w-40 truncate text-sm">{SKILL_MAP[id].name}</span>
                  <div className="h-2 flex-1 rounded-full bg-secondary"><div className="h-full rounded-full" style={{ width: `${(n / max) * 100}%`, background: EVIDENCE_STATES[stateKey]?.color }} /></div>
                  <span className="w-6 text-right text-sm font-semibold">{n}</span>
                </li>
              );
            })}
            {!top.length && <p className="text-sm text-muted-foreground">No evidenced skills yet.</p>}
          </ul>
        </section>
        <section className="rounded-2xl border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold">Evidence strength</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {STATE_ORDER.map((k, i) => <li key={k} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${EVIDENCE_STATES[k].dot}`} /><span className="flex-1">{EVIDENCE_STATES[k].label}</span><b>{dist[i]}</b></li>)}
          </ul>
          <div className="mt-5 space-y-2 border-t pt-4 text-sm">
            <Link to="/employer/evidence" className="block font-medium text-brand">Explore evidence →</Link>
            <Link to="/employer/gaps" className="block font-medium text-brand">Skill gap analysis →</Link>
          </div>
        </section>
      </div>
      <section className="mt-6 rounded-2xl border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">Coverage by category</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {catCoverage.map(({ c, workersWith }) => (
            <div key={c} className="rounded-xl border p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c}</p>
              <p className="mt-2 font-heading text-2xl font-semibold">{workersWith}</p>
              <p className="text-xs text-muted-foreground">workers with evidenced skills</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}