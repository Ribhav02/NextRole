const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Download, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parseRoles, SAMPLE_CSV } from "@/lib/roleImport";
import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";

export default function RoleImport({ orgId }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const preview = (t = text) => {
    setError("");
    try { setRows(parseRoles(t)); } catch (e) { setRows(null); setError(`Couldn't read this file: ${e.message}`); }
  };
  const onFile = async (e) => { const t = await e.target.files[0].text(); setText(t); preview(t); };
  const sample = () => { const url = URL.createObjectURL(new Blob([SAMPLE_CSV], { type: "text/csv" })); Object.assign(document.createElement("a"), { href: url, download: "nextrole-roles-template.csv" }).click(); };
  const save = async () => {
    setSaving(true);
    await db.entities.Role.bulkCreate(rows.map(({ unknown, ...r }) => ({ ...r, organization_id: orgId, status: "open" })));
    qc.invalidateQueries({ queryKey: ["orgRoles"] });
    qc.invalidateQueries({ queryKey: ["openRoles"] });
    navigate("/employer/roles");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between"><p className="font-semibold">Upload or paste</p><button onClick={sample} className="inline-flex items-center gap-1 text-sm font-medium text-brand"><Download className="h-4 w-4" />CSV template</button></div>
        <Input type="file" accept=".csv,.json" onChange={onFile} />
        <Textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder={SAMPLE_CSV} className="font-mono text-xs" />
        <p className="text-xs text-muted-foreground">CSV column <code>required_skills</code>: <code>Skill:core|preferred:min_evidence</code> separated by <code>;</code>. JSON: an array of roles with a <code>required_skills</code> array.</p>
        <Button variant="outline" onClick={() => preview()} disabled={!text.trim()} className="rounded-full">Preview</Button>
        {error && <p className="flex gap-1.5 text-sm text-destructive"><AlertCircle className="mt-0.5 h-4 w-4" />{error}</p>}
      </div>
      <div className="rounded-2xl border bg-card p-6">
        <p className="font-semibold">Preview {rows && `· ${rows.length} roles`}</p>
        <div className="mt-4 space-y-3">
          {(rows || []).map((r, i) => (
            <div key={i} className="rounded-xl border p-3">
              <p className="font-medium">{r.title} <span className="text-sm font-normal text-muted-foreground">· {r.department}</span></p>
              <p className="mt-1 text-xs text-muted-foreground">{r.required_skills.map((s) => `${SKILL_MAP[s.skill].name} (${s.importance})`).join(", ")}</p>
              {r.unknown.length > 0 && <p className="mt-1 text-xs text-amber-700">Not recognised, will be skipped: {r.unknown.join(", ")}</p>}
            </div>
          ))}
          {!rows && <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>}
        </div>
        {rows?.length > 0 && <Button onClick={save} disabled={saving} className="mt-5 w-full rounded-full">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Import {rows.length} roles</Button>}
      </div>
    </div>
  );
}