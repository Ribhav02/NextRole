const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Check, Loader2 } from "lucide-react";

import useEmployerData, { setActiveOrg } from "@/hooks/useEmployerData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/shared/Logo";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function EmployerSetup() {
  const { orgs, org, isLoading } = useEmployerData();
  const [f, setF] = useState({ name: "", industry: "", city: "", size: "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  if (isLoading) return <LoadingScreen />;

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const created = await db.entities.Organization.create(f);
    setActiveOrg(created.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <div className="flex items-center justify-between"><Logo />{org && <Link to="/employer" className="inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" />Back to dashboard</Link>}</div>
        <h1 className="mt-12 font-heading text-4xl font-semibold tracking-tight">Organization</h1>
        <p className="mt-2 text-muted-foreground">Create your organization to define internal roles and discover talent from within.</p>
        {orgs.length > 0 && (
          <div className="mt-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Switch organization</p>
            {orgs.map((o) => (
              <button key={o.id} onClick={() => setActiveOrg(o.id)} className="flex w-full items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left hover:bg-secondary/50">
                <Building2 className="h-4 w-4 text-brand" /><span className="flex-1 font-medium">{o.name}{o.is_demo && <span className="ml-2 text-xs text-muted-foreground">(demo)</span>}</span>
                {org?.id === o.id && <Check className="h-4 w-4 text-emerald-600" />}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={submit} className="mt-10 space-y-4 rounded-2xl border bg-card p-6">
          <p className="font-heading text-lg font-semibold">Create a new organization</p>
          <div><Label>Name</Label><Input required value={f.name} onChange={set("name")} className="mt-1.5" /></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><Label>Industry</Label><Input value={f.industry} onChange={set("industry")} placeholder="Logistics" className="mt-1.5" /></div>
            <div><Label>City</Label><Input value={f.city} onChange={set("city")} className="mt-1.5" /></div>
            <div><Label>Workforce size</Label><Input value={f.size} onChange={set("size")} placeholder="500–1,000" className="mt-1.5" /></div>
          </div>
          <Button type="submit" disabled={saving} className="rounded-full">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create organization</Button>
        </form>
      </div>
    </div>
  );
}