import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";

export default function SkillSupplyChart({ workers }) {
  const map = {};
  workers.forEach((w) => w.skills.forEach((s) => {
    const row = (map[s.name] ||= { name: s.name, total: 0 });
    row[s.state] = (row[s.state] || 0) + 1;
    row.total += 1;
  }));
  const data = Object.values(map).sort((a, b) => b.total - a.total).slice(0, 8);
  return (
    <section className="h-full rounded-2xl border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold">Skill supply by evidence strength</h2>
      <p className="mt-1 text-sm text-muted-foreground">Number of workers per skill, coloured by how the skill is known.</p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} stroke="#a8a29e" />
            <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} stroke="#a8a29e" />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            {STATE_ORDER.map((k, i) => <Bar key={k} dataKey={k} name={EVIDENCE_STATES[k].label} stackId="a" fill={EVIDENCE_STATES[k].color} radius={i === 3 ? [0, 4, 4, 0] : 0} />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}