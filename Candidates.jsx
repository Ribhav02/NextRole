import useEmployerData from "@/hooks/useEmployerData";
import PageHeader from "@/components/shared/PageHeader";
import CandidatePipeline from "@/components/employer/CandidatePipeline";

const APP_STATUS = { expressed: "Expressed interest", viewed: "Viewed", shortlisted: "Shortlisted", accepted: "Accepted", rejected: "Not now", withdrawn: "Withdrawn" };
const DEC_STATUS = { shortlist: "Shortlisted", assign_assessment: "Assessment assigned", assign_learning: "Learning assigned", offer_move: "Move offered", not_now: "Not now" };

export default function Candidates() {
  const { workers, roles, decisions, applications } = useEmployerData();
  const name = (id) => workers.find((w) => w.profile.id === id)?.profile.name || "Worker";
  const role = (id) => roles.find((r) => r.id === id)?.title || "Role";
  const rows = [
    ...applications.map((a) => ({ id: a.id, workerId: a.worker_profile_id, worker: name(a.worker_profile_id), role: role(a.role_id), kind: "Interest", status: APP_STATUS[a.status] || a.status, date: a.created_date, tone: "bg-sky-50 text-sky-700" })),
    ...decisions.map((d) => ({ id: d.id, workerId: d.worker_profile_id, worker: name(d.worker_profile_id), role: role(d.role_id), kind: "Decision", status: DEC_STATUS[d.decision] || d.decision, date: d.created_date, tone: "bg-amber-50 text-amber-800" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div>
      <PageHeader eyebrow="Candidates" title="Your candidate pipeline" description="Worker-initiated interest and your team's decisions, in one place. NextRole recommends; you decide." />
      <CandidatePipeline rows={rows} />
    </div>
  );
}