import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, UserX } from "lucide-react";
import useEmployerData from "@/hooks/useEmployerData";
import { matchRole } from "@/lib/intelligence/matching";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EmptyState from "@/components/shared/EmptyState";
import MatchPanel from "@/components/shared/MatchPanel";
import FlowStrip from "@/components/shared/FlowStrip";
import CandidateHeader from "@/components/employer/CandidateHeader";
import EvidenceTrace from "@/components/employer/EvidenceTrace";
import CandidateAssessments from "@/components/employer/CandidateAssessments";
import DecisionPanel from "@/components/employer/DecisionPanel";

export default function Candidate360() {
  const { id } = useParams();
  const { workers, roles, org, decisions } = useEmployerData();
  const [roleId, setRoleId] = useState(new URLSearchParams(window.location.search).get("role") || "");
  const w = workers.find((x) => x.profile.id === id);
  if (!w) return <EmptyState icon={UserX} title="Candidate not available" description="This worker may have stopped sharing their profile." />;
  const role = roles.find((r) => r.id === roleId) || roles[0];
  const match = role ? matchRole(w.skills, role, w.profile) : null;
  const consent = w.profile.consent || {};

  return (
    <div className="space-y-8">
      <Link to="/employer/talent" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Talent discovery</Link>
      <CandidateHeader worker={w} />
      {role && (
        <section>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Explainable match</p>
              <h2 className="mt-1 font-heading text-2xl font-semibold">Fit for {role.title}</h2>
            </div>
            <Select value={role.id} onValueChange={setRoleId}>
              <SelectTrigger className="h-10 bg-white md:w-72"><SelectValue /></SelectTrigger>
              <SelectContent>{roles.map((r) => <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <MatchPanel match={match} perspective="employer" hideEvidence={consent.share_evidence === false} />
        </section>
      )}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div className="flex items-center justify-between"><h2 className="font-heading text-xl font-semibold">Evidence traceability</h2><FlowStrip active={2} /></div>
          <EvidenceTrace worker={w} />
          <CandidateAssessments worker={w} />
        </div>
        <div className="lg:col-span-2">{role && <DecisionPanel worker={w} role={role} org={org} decisions={decisions} match={match} />}</div>
      </div>
    </div>
  );
}