import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";

export default function EvidenceMixChart({ workers }) {
  const all = workers.flatMap((w) => w.skills);
  const data = STATE_ORDER.map((k) => ({ key: k, name: EVIDENCE_STATES[k].label, value: all.filter((s) => s.state === k).length })).filter((d) => d.value);
  return (
    <section className="h-full rounded-2xl border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold">Evidence mix</h2>
      <p className="mt-1 text-sm text-muted-foreground">How skills across the pool are known.</p>
      <div className="mt-2 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={2} stroke="none">
              {data.map((d) => <Cell key={d.key} fill={EVIDENCE_STATES[d.key].color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 space-y-1.5">
        {data.map((d) => (
          <li key={d.key} className="flex items-center gap-2 text-sm"><span className={`h-2 w-2 rounded-full ${EVIDENCE_STATES[d.key].dot}`} /><span className="flex-1">{d.name}</span><b>{d.value}</b></li>
        ))}
      </ul>
    </section>
  );
}