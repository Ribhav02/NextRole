import { useMemo, useState } from "react";
import useEmployerData from "@/hooks/useEmployerData";
import { SKILLS } from "@/lib/intelligence/skillTaxonomy";
import { EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import EvidenceTable from "@/components/employer/EvidenceTable";

const TYPES = ["screenshot", "document", "certificate", "supervisor_confirmation", "platform_data"];

export default function EvidenceExplorer() {
  const { workers } = useEmployerData();
  const [type, setType] = useState("all");
  const [state, setState] = useState("all");
  const [skill, setSkill] = useState("all");
  const [q, setQ] = useState("");
  const rows = useMemo(() => workers.flatMap((w) => w.evidence.map((e) => ({ ...e, workerName: w.profile.name, workerId: w.profile.id })))
    .filter((e) => type === "all" || e.evidence_type === type)
    .filter((e) => state === "all" || e.evidence_state === state)
    .filter((e) => skill === "all" || (e.extracted_skills || []).includes(skill))
    .filter((e) => !q || e.title.toLowerCase().includes(q.toLowerCase()) || e.workerName.toLowerCase().includes(q.toLowerCase())), [workers, type, state, skill, q]);
  return (
    <div>
      <PageHeader eyebrow="Evidence explorer" title="Browse workforce evidence" description="All evidence shared by workers in your talent pool. Document-supported items are not independently authenticated." />
      <div className="mb-5 grid gap-3 md:grid-cols-4">
        <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or worker" className="pl-9" /></div>
        <Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All types</SelectItem>{TYPES.map((t) => <SelectItem key={t} value={t}>{t.replace("_", " ")}</SelectItem>)}</SelectContent></Select>
        <Select value={state} onValueChange={setState}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All evidence states</SelectItem>{STATE_ORDER.map((k) => <SelectItem key={k} value={k}>{EVIDENCE_STATES[k].label}</SelectItem>)}</SelectContent></Select>
        <Select value={skill} onValueChange={setSkill}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All skills</SelectItem>{SKILLS.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{rows.length} evidence item{rows.length !== 1 && "s"}</p>
      <EvidenceTable rows={rows} />
    </div>
  );
}