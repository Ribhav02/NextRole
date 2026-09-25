import { Lock } from "lucide-react";
import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import SkillChip from "@/components/shared/SkillChip";

export default function CandidateAssessments({ worker }) {
  const shared = worker.profile.consent?.share_assessments !== false;
  if (!worker.assessments.length) return null;
  return (
    <section>
      <h2 className="mb-3 font-heading text-xl font-semibold">Scenario results</h2>
      {!shared ? (
        <p className="flex items-center gap-1.5 rounded-2xl border bg-card p-4 text-sm text-muted-foreground"><Lock className="h-4 w-4" />Scenario details not shared. Demonstrated skills still appear above.</p>
      ) : (
        <div className="space-y-3">
          {worker.assessments.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center justify-between"><p className="font-semibold">{a.scenario_title}</p><span className="text-xs capitalize text-muted-foreground">{a.mode} response</span></div>
              <div className="mt-3 flex flex-wrap gap-1.5">{(a.demonstrated_skills || []).map((id) => <SkillChip key={id} name={SKILL_MAP[id]?.name} state="demonstrated" size="sm" />)}</div>
              <p className="mt-3 text-sm text-muted-foreground">{a.feedback}</p>
              <details className="mt-2 text-sm"><summary className="cursor-pointer text-xs font-semibold text-brand">Read the worker's answer</summary><p className="mt-2 rounded-xl bg-secondary/60 p-3 italic">“{a.response_text}”</p></details>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}