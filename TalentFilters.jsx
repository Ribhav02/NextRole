import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SKILLS } from "@/lib/intelligence/skillTaxonomy";

export default function TalentFilters({ f, setF, roles }) {
  const toggle = (id) => setF({ ...f, skills: f.skills.includes(id) ? f.skills.filter((s) => s !== id) : [...f.skills, id] });
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-5">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative md:col-span-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} placeholder="Search" className="pl-9" /></div>
        <Select value={f.roleId} onValueChange={(v) => setF({ ...f, roleId: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">Any role</SelectItem>{roles.map((r) => <SelectItem key={r.id} value={r.id}>Match to: {r.title}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={f.minEvidence} onValueChange={(v) => setF({ ...f, minEvidence: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Skill filter: any evidence</SelectItem>
            <SelectItem value="2">Document-supported or stronger</SelectItem>
            <SelectItem value="3">Verified or stronger</SelectItem>
            <SelectItem value="4">Demonstrated only</SelectItem>
          </SelectContent>
        </Select>
        <label className="flex items-center justify-between gap-3 rounded-md border px-3 text-sm"><span>Blind review</span><Switch checked={f.blind} onCheckedChange={(v) => setF({ ...f, blind: v })} /></label>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SKILLS.map((s) => (
          <button key={s.id} onClick={() => toggle(s.id)} className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${f.skills.includes(s.id) ? "border-primary bg-primary text-primary-foreground" : "bg-white text-muted-foreground hover:text-foreground"}`}>{s.name}</button>
        ))}
      </div>
    </div>
  );
}