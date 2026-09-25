import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WORK = ["Delivery Associate", "Warehouse Associate", "Retail Associate", "Customer Support", "Driver", "Security Guard"];

export default function DetailsStep({ onSubmit, onBack }) {
  const [f, setF] = useState({ name: "", city: "", current_role: "", current_employer: "", years_experience: "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit({ ...f, years_experience: Number(f.years_experience) || 0 });
  };
  return (
    <form onSubmit={submit}>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">A little about you</h1>
      <p className="mt-2 text-muted-foreground">Only what's needed. No resume required.</p>
      <div className="mt-8 space-y-5">
        <div><Label>Your name</Label><Input required value={f.name} onChange={set("name")} className="mt-1.5 h-12" /></div>
        <div><Label>City</Label><Input value={f.city} onChange={set("city")} className="mt-1.5 h-12" /></div>
        <div>
          <Label>Current work</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {WORK.map((w) => <button type="button" key={w} onClick={() => setF({ ...f, current_role: w })} className={`rounded-full border px-3.5 py-1.5 text-sm ${f.current_role === w ? "border-brand bg-accent font-medium" : "bg-white"}`}>{w}</button>)}
          </div>
          <Input placeholder="Or type your role" value={f.current_role} onChange={set("current_role")} className="mt-2 h-12" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Employer / platform</Label><Input value={f.current_employer} onChange={set("current_employer")} className="mt-1.5 h-12" /></div>
          <div><Label>Years of experience</Label><Input type="number" step="0.5" min="0" value={f.years_experience} onChange={set("years_experience")} className="mt-1.5 h-12" /></div>
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="h-12 rounded-full">Back</Button>
        <Button type="submit" size="lg" disabled={saving || !f.name} className="h-12 flex-1 rounded-full">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create my profile</Button>
      </div>
    </form>
  );
}