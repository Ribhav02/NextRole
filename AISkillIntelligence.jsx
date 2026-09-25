import { Link } from "react-router-dom";
import { Brain, History, ClipboardCheck, Sparkles, Info } from "lucide-react";
import useWorkerData from "@/hooks/useWorkerData";
import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import PageHeader from "@/components/shared/PageHeader";
import SkillChip from "@/components/shared/SkillChip";
import EvidenceBadge from "@/components/shared/EvidenceBadge";

export default function AISkillIntelligence() {
  const { evidence, skills } = useWorkerData();
  const selfDeclared = skills.filter((s) => s.state === "self_declared");
  const fromEvidence = skills.filter((s) => s.sources.some((src) => src.kind === "evidence"));
  const demonstrated = skills.filter((s) => s.state === "demonstrated");
  const sources = [
    { icon: History, title: "Work history", count: selfDeclared.length, text: "Skills read from the words you used to describe your daily work (keyword matching). Marked self-declared until evidence backs them." },
    { icon: Sparkles, title: "Evidence (AI extraction)", count: fromEvidence.length, text: "AI read your uploaded files and suggested skills. You reviewed and confirmed them before they were saved." },
    { icon: ClipboardCheck, title: "Scenarios (AI analysis)", count: demonstrated.length, text: "AI judged your practical judgement against a rubric — not your language or grammar." },
  ];
  return (
    <div>
      <PageHeader eyebrow="AI Skill Intelligence" title="How your skills were built" description="Transparency on where each skill came from, how AI was used, and what was human-reviewed." />
      <div className="grid gap-4 md:grid-cols-3">
        {sources.map((s) => (
          <div key={s.title} className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2"><s.icon className="h-5 w-5 text-brand" /><h3 className="font-semibold">{s.title}</h3></div>
            <p className="mt-3 font-heading text-3xl font-semibold">{s.count}</p><p className="text-xs text-muted-foreground">skills</p>
            <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="mb-4 font-heading text-lg font-semibold">Evidence extraction log</h2>
        {!evidence.length && <p className="text-sm text-muted-foreground">No evidence yet. <Link to="/worker/evidence" className="font-medium text-brand">Add evidence</Link> to see AI extraction here.</p>}
        <div className="space-y-3">
          {evidence.map((e) => (
            <div key={e.id} className="rounded-2xl border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div><p className="font-semibold">{e.title}</p><p className="text-xs capitalize text-muted-foreground">{e.evidence_type.replace("_", " ")}</p></div>
                <EvidenceBadge state={e.evidence_state} useStatus />
              </div>
              {e.extraction_notes && <p className="mt-3 text-sm text-muted-foreground">{e.extraction_notes}</p>}
              <div className="mt-3 flex flex-wrap gap-1.5">{(e.extracted_skills || []).map((id) => SKILL_MAP[id] && <SkillChip key={id} name={SKILL_MAP[id].name} state={e.evidence_state} size="sm" />)}</div>
              {e.caution && <p className="mt-3 flex gap-1.5 text-xs text-muted-foreground"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />{e.caution}</p>}
            </div>
          ))}
        </div>
      </section>
      <div className="mt-10 rounded-2xl bg-ink p-6 text-white">
        <p className="flex items-center gap-2 font-semibold"><Brain className="h-5 w-5 text-brand" />Where AI plugs in</p>
        <ul className="mt-3 space-y-1.5 text-sm text-white/70">
          <li>• Evidence skill extraction — AI-assisted, worker-reviewed before saving</li>
          <li>• Work-history structuring from voice — AI parses free speech into job entries</li>
          <li>• Scenario analysis — AI judges judgement, not language</li>
        </ul>
        <p className="mt-4 text-xs text-white/50">AI can be imperfect. Nothing is auto-verified; documents are never marked authentic. Supervisors and scenarios add trust; platform data is a future phase.</p>
      </div>
    </div>
  );
}