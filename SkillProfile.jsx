import { useState } from "react";
import { Link } from "react-router-dom";
import useWorkerData from "@/hooks/useWorkerData";
import { EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";
import { CATEGORIES } from "@/lib/intelligence/skillTaxonomy";
import PageHeader from "@/components/shared/PageHeader";
import EvidenceLegend from "@/components/shared/EvidenceLegend";
import SkillCard from "@/components/worker/SkillCard";
import SkillDetailDrawer from "@/components/shared/SkillDetailDrawer";

export default function SkillProfile() {
  const { skills, profile, evidence } = useWorkerData();
  const [detail, setDetail] = useState(null);
  const counts = STATE_ORDER.map((k) => ({ k, n: skills.filter((s) => s.state === k).length }));
  return (
    <div>
      <PageHeader eyebrow="Step 3 · Skills" title="Your evidence-backed skill profile" description="Every skill shows how it is known and exactly where it came from. Stronger evidence opens more roles." actions={<Link to="/worker/intelligence" className="text-sm font-medium text-brand">AI intelligence →</Link>} />
      <div className="mb-3 flex h-3 overflow-hidden rounded-full bg-secondary">
        {counts.map(({ k, n }) => n > 0 && <div key={k} style={{ width: `${(n / skills.length) * 100}%`, background: EVIDENCE_STATES[k].color }} />)}
      </div>
      <div className="mb-8 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {counts.map(({ k, n }) => <span key={k} className="text-muted-foreground"><b className="text-foreground">{n}</b> {EVIDENCE_STATES[k].label.toLowerCase()}</span>)}
      </div>
      <div className="mb-10"><EvidenceLegend /></div>
      {CATEGORIES.map((c) => {
        const list = skills.filter((s) => s.category === c);
        if (!list.length) return null;
        return (
          <section key={c} className="mb-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c}</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{list.map((s) => <SkillCard key={s.id} skill={s} onOpen={setDetail} />)}</div>
          </section>
        );
      })}
      {!skills.length && <p className="text-muted-foreground">Add your work history and evidence to build your profile.</p>}
      <SkillDetailDrawer skill={detail} profile={profile} evidence={evidence} open={!!detail} onOpenChange={(o) => !o && setDetail(null)} />
    </div>
  );
}