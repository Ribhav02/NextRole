import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { History, FolderLock, ClipboardCheck, Briefcase } from "lucide-react";
import { EVIDENCE_STATES } from "@/lib/intelligence/evidenceModel";
import EvidenceBadge from "@/components/shared/EvidenceBadge";
import { skillReason, relatedExperience } from "@/lib/intelligence/skillExplanation";

const KIND = { history: { icon: History, label: "Work history" }, evidence: { icon: FolderLock, label: "Evidence" }, assessment: { icon: ClipboardCheck, label: "Scenario" } };

function Section({ title, children }) {
  return (<div><h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>{children}</div>);
}

// Worker skill inspection: why the skill is held, supporting evidence, related experience.
export default function SkillDetailDrawer({ skill, profile, open, onOpenChange }) {
  if (!skill) return null;
  const exp = relatedExperience(skill, profile);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left">{skill.name}</SheetTitle>
          <div className="mt-1"><EvidenceBadge state={skill.state} useStatus /></div>
        </SheetHeader>
        <div className="space-y-5">
          <Section title="Why NextRole considers you have this skill">
            <p className="text-sm leading-relaxed">{skillReason(skill)}</p>
          </Section>
          <Section title="Supporting evidence">
            <ul className="space-y-2">
              {skill.sources.map((src, i) => {
                const k = KIND[src.kind] || KIND.evidence;
                return (
                  <li key={i} className="flex gap-2.5 rounded-xl border p-3">
                    <k.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1"><p className="text-sm font-medium">{src.label}</p><p className="text-xs text-muted-foreground">{EVIDENCE_STATES[src.state].label}{src.detail && ` · ${src.detail}`}</p></div>
                  </li>
                );
              })}
            </ul>
          </Section>
          {exp.length > 0 && (
            <Section title="Related work experience">
              <ul className="space-y-2">{exp.map((h, i) => (<li key={i} className="flex gap-2.5 text-sm"><Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div><p className="font-medium">{h.role}</p><p className="text-xs text-muted-foreground">{h.employer} · {h.duration_months} months</p></div></li>))}</ul>
            </Section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}