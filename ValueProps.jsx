import { Check } from "lucide-react";

const COLS = [
  { eyebrow: "For workers", title: "Your work, finally counted.", points: ["Speak your work history in your language", "Keep evidence in a private vault", "See exactly which skills are proven — and how", "Know why a role fits and what to learn next", "Decide what employers can see"] },
  { eyebrow: "For employers", title: "Promote from within, with reasons.", points: ["Define roles by the skills they really need", "Discover workers by demonstrated skills, not CVs", "Trace every skill back to its evidence", "See gaps and assessment needs before deciding", "Blind review mode to reduce bias"] },
];

export default function ValueProps() {
  return (
    <section id="value" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        {COLS.map((c, i) => (
          <div key={c.eyebrow} className={`rounded-3xl border p-8 md:p-10 ${i ? "bg-white" : "bg-accent/60 border-orange-100"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{c.eyebrow}</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h3>
            <ul className="mt-6 space-y-3">
              {c.points.map((p) => (
                <li key={p} className="flex gap-3 text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}