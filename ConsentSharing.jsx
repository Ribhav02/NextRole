const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useQueryClient } from "@tanstack/react-query";

import useWorkerData from "@/hooks/useWorkerData";
import PageHeader from "@/components/shared/PageHeader";
import ConsentToggle from "@/components/worker/ConsentToggle";
import EmployerPreview from "@/components/worker/EmployerPreview";

const ITEMS = [
  { key: "visible_to_employers", title: "Show my profile in the internal talent pool", text: "Employers can discover you by skills. Turn off to be completely hidden." },
  { key: "share_work_history", title: "Share my work history", text: "Your jobs and daily tasks, in your words." },
  { key: "share_evidence", title: "Share evidence details", text: "Titles, supervisor names and notes. Skill states stay visible either way." },
  { key: "share_assessments", title: "Share scenario results", text: "Your answers and feedback from practice scenarios." },
  { key: "share_contact", title: "Share my phone number", text: "Off by default. Employers can still contact you through NextRole." },
];

export default function ConsentSharing() {
  const { profile, skills } = useWorkerData();
  const qc = useQueryClient();
  const consent = profile.consent || {};
  const update = async (key, value) => {
    await db.entities.WorkerProfile.update(profile.id, { consent: { ...consent, [key]: value } });
    qc.invalidateQueries({ queryKey: ["workerProfile"] });
    qc.invalidateQueries({ queryKey: ["talentPool"] });
  };
  return (
    <div>
      <PageHeader eyebrow="Your data, your choice" title="Consent & Sharing" description="You decide what employers see. We collect only what's needed, keep files private, and never sell your data." />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {ITEMS.map((i) => <ConsentToggle key={i.key} {...i} checked={consent[i.key] !== false && (i.key !== "share_contact" || !!consent.share_contact)} onChange={(v) => update(i.key, v)} disabled={i.key !== "visible_to_employers" && consent.visible_to_employers === false} />)}
        </div>
        <div className="lg:col-span-2"><EmployerPreview profile={profile} consent={consent} skills={skills} /></div>
      </div>
    </div>
  );
}