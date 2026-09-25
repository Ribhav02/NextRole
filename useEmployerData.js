const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { buildSkillProfile } from "@/lib/intelligence/skillProfile";

const ORG_KEY = "nextrole_org";
export const setActiveOrg = (id) => { localStorage.setItem(ORG_KEY, id); window.location.href = "/employer"; };

export default function useEmployerData() {
  const orgsQ = useQuery({ queryKey: ["orgs"], queryFn: () => db.entities.Organization.list("created_date") });
  const orgs = orgsQ.data || [];
  const org = orgs.find((o) => o.id === localStorage.getItem(ORG_KEY)) || orgs[0] || null;
  const rolesQ = useQuery({ queryKey: ["orgRoles", org?.id], enabled: !!org, queryFn: () => db.entities.Role.filter({ organization_id: org.id }, "-created_date") });
  const decisionsQ = useQuery({ queryKey: ["decisions", org?.id], enabled: !!org, queryFn: () => db.entities.MobilityDecision.filter({ organization_id: org.id }, "-created_date") });
  const applicationsQ = useQuery({ queryKey: ["applications", org?.id], enabled: !!org, queryFn: () => db.entities.Application.filter({ organization_id: org.id }, "-created_date") });
  const poolQ = useQuery({
    queryKey: ["talentPool"],
    queryFn: async () => {
      const [profiles, evidence, assessments] = await Promise.all([
        db.entities.WorkerProfile.list("-created_date", 300),
        db.entities.Evidence.list("-created_date", 2000),
        db.entities.Assessment.list("-created_date", 2000),
      ]);
      return { profiles, evidence, assessments };
    },
  });

  // Only workers who consented to be visible; work history respected per consent.
  const workers = useMemo(() => {
    if (!poolQ.data) return [];
    const { profiles, evidence, assessments } = poolQ.data;
    return profiles.filter((p) => p.consent?.visible_to_employers !== false).map((p) => {
      const ev = evidence.filter((e) => e.worker_profile_id === p.id);
      const as = assessments.filter((a) => a.worker_profile_id === p.id);
      const visibleProfile = p.consent?.share_work_history === false ? { ...p, work_history: [] } : p;
      return { profile: visibleProfile, evidence: ev, assessments: as, skills: buildSkillProfile(visibleProfile, ev, as) };
    });
  }, [poolQ.data]);

  const isLoading = orgsQ.isLoading || poolQ.isLoading || (!!org && (rolesQ.isLoading || decisionsQ.isLoading || applicationsQ.isLoading));
  return { orgs, org, roles: rolesQ.data || [], decisions: decisionsQ.data || [], applications: applicationsQ.data || [], workers, isLoading };
}