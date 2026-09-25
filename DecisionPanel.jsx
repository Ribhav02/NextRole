const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const DECISIONS = [
  { id: "shortlist", label: "Shortlist" },
  { id: "assign_assessment", label: "Assign practical assessment" },
  { id: "assign_learning", label: "Assign learning path" },
  { id: "offer_move", label: "Offer internal move" },
  { id: "not_now", label: "Not now" },
];

export default function DecisionPanel({ worker, role, org, decisions, match }) {
  const qc = useQueryClient();
  const [choice, setChoice] = useState(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const history = decisions.filter((d) => d.worker_profile_id === worker.profile.id && d.role_id === role.id);
  const save = async () => {
    setSaving(true);
    await db.entities.MobilityDecision.create({ worker_profile_id: worker.profile.id, role_id: role.id, organization_id: org.id, decision: choice, note });
    await qc.invalidateQueries({ queryKey: ["decisions"] });
    setChoice(null); setNote(""); setSaving(false);
  };
  return (
    <div className="sticky top-6 rounded-2xl border bg-card p-6">
      <div className="flex items-center gap-2"><Scale className="h-5 w-5 text-brand" /><h2 className="font-heading text-lg font-semibold">Your decision</h2></div>
      <p className="mt-1 text-sm text-muted-foreground">NextRole suggests: <b className="text-foreground">{match.nextAction.title}</b>. The decision is yours.</p>
      <div className="mt-4 space-y-2">
        {DECISIONS.map((d) => (
          <button key={d.id} onClick={() => setChoice(d.id)} className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors ${choice === d.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{d.label}</button>
        ))}
      </div>
      <Textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reason / note for the worker's record" className="mt-3" />
      <Button onClick={save} disabled={!choice || saving} className="mt-3 w-full rounded-full">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Record decision</Button>
      {history.length > 0 && (
        <ul className="mt-5 space-y-2 border-t pt-4">
          {history.map((d) => (
            <li key={d.id} className="text-sm"><b>{DECISIONS.find((x) => x.id === d.decision)?.label}</b> <span className="text-xs text-muted-foreground">· {format(new Date(d.created_date), "d MMM, HH:mm")}</span>{d.note && <p className="text-xs text-muted-foreground">{d.note}</p>}</li>
          ))}
        </ul>
      )}
    </div>
  );
}