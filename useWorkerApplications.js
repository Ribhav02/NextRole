const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useQuery, useQueryClient } from "@tanstack/react-query";

// Worker-initiated interest in internal roles (the "Apply / Express interest" step).
export default function useWorkerApplications(profileId) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["applications", profileId], enabled: !!profileId, queryFn: () => db.entities.Application.filter({ worker_profile_id: profileId }, "-created_date") });
  const express = async (role, orgId) => {
    await db.entities.Application.create({ worker_profile_id: profileId, role_id: role.id, organization_id: orgId || role.organization_id, status: "expressed" });
    qc.invalidateQueries({ queryKey: ["applications", profileId] });
  };
  const withdraw = async (id) => { await db.entities.Application.update(id, { status: "withdrawn" }); qc.invalidateQueries({ queryKey: ["applications", profileId] }); };
  return { applications: q.data || [], express, withdraw };
}