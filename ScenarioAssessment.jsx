import { useState } from "react";
import useWorkerData from "@/hooks/useWorkerData";
import { speechLang } from "@/lib/i18n";
import { SCENARIOS } from "@/lib/intelligence/scenarios";
import PageHeader from "@/components/shared/PageHeader";
import ScenarioTile from "@/components/worker/ScenarioTile";
import ScenarioRunner from "@/components/worker/ScenarioRunner";
import ScenarioResult from "@/components/worker/ScenarioResult";

export default function ScenarioAssessment() {
  const { profile, assessments } = useWorkerData();
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);
  const reset = () => { setActive(null); setResult(null); };

  if (result) return <ScenarioResult assessment={result} onBack={reset} />;
  if (active) return <ScenarioRunner scenario={active} profileId={profile.id} lang={speechLang(profile.language)} onDone={setResult} onBack={reset} />;

  const done = new Set(assessments.map((a) => a.scenario_id));
  return (
    <div>
      <PageHeader eyebrow="Step 4 · Demonstrate" title="Scenario practice" description="Short, real-life situations. Answer by voice or text in any language — we look at your judgement, not your grammar." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SCENARIOS.map((s) => <ScenarioTile key={s.id} scenario={s} done={done.has(s.id)} onStart={() => setActive(s)} />)}
      </div>
      {assessments.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-heading text-lg font-semibold">Your past scenarios</h2>
          <div className="space-y-2">
            {assessments.map((a) => (
              <button key={a.id} onClick={() => setResult(a)} className="flex w-full items-center justify-between rounded-xl border bg-card px-4 py-3 text-left hover:bg-secondary/50">
                <span className="font-medium">{a.scenario_title}</span>
                <span className="text-sm text-muted-foreground">{(a.demonstrated_skills || []).length} skills demonstrated</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}