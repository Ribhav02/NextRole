import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { rankCandidates, READINESS } from "@/lib/intelligence/matching";

const COLORS = { ready: "#10b981", assess: "#fbbf24", upskill: "#38bdf8", explore: "#d6d3d1" };

export default function ReadinessChart({ roles, workers }) {
  const data = roles.map((role) => {
    const ranked = rankCandidates(workers, role);
    const row = { name: role.title };
    Object.keys(READINESS).forEach((k) => { row[k] = ranked.filter((r) => r.match.readiness === k).length; });
    return row;
  });
  return (
    <section className="h-full rounded-2xl border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold">Internal readiness by role</h2>
      <p className="mt-1 text-sm text-muted-foreground">Based on present, missing and to-assess skills — not scores.</p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} stroke="#a8a29e" />
            <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11 }} stroke="#a8a29e" />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            {Object.keys(READINESS).map((k) => <Bar key={k} dataKey={k} name={READINESS[k].label} stackId="a" fill={COLORS[k]} />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}