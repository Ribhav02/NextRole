import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SKILLS, SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import { EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";

const LEVELS = STATE_ORDER.filter((k) => k !== "platform_verified");

export default function SkillRequirementEditor({ value, onChange }) {
  const [skill, setSkill] = useState();
  const add = () => { onChange([...value, { skill, importance: "core", min_evidence: "document_supported" }]); setSkill(undefined); };
  const update = (i, patch) => onChange(value.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const available = SKILLS.filter((s) => !value.some((r) => r.skill === s.id));
  return (
    <div className="space-y-3">
      {value.map((r, i) => (
        <div key={r.skill} className="flex flex-col gap-2 rounded-xl border bg-background p-3 sm:flex-row sm:items-center">
          <span className="flex-1 text-sm font-medium">{SKILL_MAP[r.skill].name}</span>
          <Select value={r.importance} onValueChange={(v) => update(i, { importance: v })}>
            <SelectTrigger className="h-9 bg-white sm:w-32"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="core">Core</SelectItem><SelectItem value="preferred">Preferred</SelectItem></SelectContent>
          </Select>
          <Select value={r.min_evidence} onValueChange={(v) => update(i, { min_evidence: v })}>
            <SelectTrigger className="h-9 bg-white sm:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>{LEVELS.map((k) => <SelectItem key={k} value={k}>Min: {EVIDENCE_STATES[k].label}</SelectItem>)}</SelectContent>
          </Select>
          <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="self-end text-muted-foreground hover:text-destructive sm:self-auto"><X className="h-4 w-4" /></button>
        </div>
      ))}
      <div className="flex gap-2">
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger className="bg-white"><SelectValue placeholder="Add a required skill…" /></SelectTrigger>
          <SelectContent>{available.map((s) => <SelectItem key={s.id} value={s.id}>{s.name} · {s.category}</SelectItem>)}</SelectContent>
        </Select>
        <Button type="button" variant="outline" onClick={add} disabled={!skill}><Plus className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}