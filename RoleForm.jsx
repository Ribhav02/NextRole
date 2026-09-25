const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SkillRequirementEditor from "@/components/employer/SkillRequirementEditor";

export default function RoleForm({ orgId }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [f, setF] = useState({ title: "", department: "", location: "", shift: "", level: "", description: "" });
  const [skills, setSkills] = useState([]);
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await db.entities.Role.create({ ...f, organization_id: orgId, status: "open", required_skills: skills });
    qc.invalidateQueries({ queryKey: ["orgRoles"] });
    qc.invalidateQueries({ queryKey: ["openRoles"] });
    navigate("/employer/roles");
  };
  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl border bg-card p-6">
        <div><Label>Role title</Label><Input required value={f.title} onChange={set("title")} placeholder="Hub Operations Associate" className="mt-1.5" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Department</Label><Input value={f.department} onChange={set("department")} className="mt-1.5" /></div>
          <div><Label>Level</Label><Input value={f.level} onChange={set("level")} className="mt-1.5" /></div>
          <div><Label>Location</Label><Input value={f.location} onChange={set("location")} className="mt-1.5" /></div>
          <div><Label>Shift</Label><Input value={f.shift} onChange={set("shift")} className="mt-1.5" /></div>
        </div>
        <div><Label>Description</Label><Textarea rows={4} value={f.description} onChange={set("description")} className="mt-1.5" /></div>
      </div>
      <div className="space-y-4 rounded-2xl border bg-card p-6">
        <div><p className="font-semibold">Required skills</p><p className="text-sm text-muted-foreground">Keep it to what the job truly needs — fewer, clearer requirements are fairer.</p></div>
        <SkillRequirementEditor value={skills} onChange={setSkills} />
        <Button type="submit" disabled={saving || !skills.length} className="w-full rounded-full">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Publish role</Button>
      </div>
    </form>
  );
}