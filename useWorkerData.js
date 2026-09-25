const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { isDemoMode } from "@/lib/demo";
import { buildSkillProfile } from "@/lib/intelligence/skillProfile";
import { matchRole, compareMatches } from "@/lib/intelligence/matching";

export default function useWorkerData() {
  const demo = isDemoMode();
  const profileQ = useQuery({
    queryKey: ["workerProfile", demo],
    queryFn: async () => {
      if (demo) return (await db.entities.WorkerProfile.filter({ demo_key: "ramesh" }))[0] || null;
      const me = await db.auth.me();
      return (await db.entities.WorkerProfile.filter({ created_by_id: me.id }, "-created_date", 1))[0] || null;
    },
  });
  const profile = profileQ.data;
  const pid = profile?.id;
  const evidenceQ = useQuery({ queryKey: ["evidence", pid], enabled: !!pid, queryFn: () => db.entities.Evidence.filter({ worker_profile_id: pid }, "-created_date") });
  const assessQ = useQuery({ queryKey: ["assessments", pid], enabled: !!pid, queryFn: () => db.entities.Assessment.filter({ worker_profile_id: pid }, "-created_date") });
  const rolesQ = useQuery({ queryKey: ["openRoles"], queryFn: () => db.entities.Role.filter({ status: "open" }) });

  const evidence = evidenceQ.data || [];
  const assessments = assessQ.data || [];
  const roles = rolesQ.data || [];
  const skills = useMemo(() => buildSkillProfile(profile, evidence, assessments), [profile, evidence, assessments]);
  const matches = useMemo(
    () => roles.map((role) => ({ role, match: matchRole(skills, role, profile) })).sort((a, b) => compareMatches(a.match, b.match)),
    [roles, skills, profile]
  );

  const isLoading = profileQ.isLoading || rolesQ.isLoading || (!!pid && (evidenceQ.isLoading || assessQ.isLoading));
  return { demo, profile, evidence, assessments, roles, skills, matches, isLoading };
}