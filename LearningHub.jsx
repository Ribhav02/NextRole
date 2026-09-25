import useWorkerData from "@/hooks/useWorkerData";
import { SKILLS, CATEGORIES } from "@/lib/intelligence/skillTaxonomy";
import PageHeader from "@/components/shared/PageHeader";
import LearningCard from "@/components/worker/LearningCard";

export default function LearningHub() {
  const { matches } = useWorkerData();
  const gapIds = [...new Set(matches.slice(0, 3).flatMap(({ match }) => [...match.missing, ...match.assessment].map((i) => i.skill.id)))];
  const recommended = gapIds.map((id) => SKILLS.find((s) => s.id === id));
  return (
    <div>
      <PageHeader eyebrow="Learn" title="Learning Hub" description="Short, practical learning linked to the gaps in roles you could move into. Built for phones and busy shifts." />
      {recommended.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-heading text-lg font-semibold">Recommended for your next roles</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{recommended.map((s) => <LearningCard key={s.id} skill={s} highlight />)}</div>
        </section>
      )}
      {CATEGORIES.map((c) => (
        <section key={c} className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c}</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{SKILLS.filter((s) => s.category === c && !gapIds.includes(s.id)).map((s) => <LearningCard key={s.id} skill={s} />)}</div>
        </section>
      ))}
    </div>
  );
}