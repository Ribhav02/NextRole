import { Link } from "react-router-dom";
import { Briefcase, Users, FileCheck2, Award, Sparkles, ArrowRight } from "lucide-react";
import useEmployerData from "@/hooks/useEmployerData";
import useDemoIds from "@/hooks/useDemoIds";
import { rankOf } from "@/lib/intelligence/evidenceModel";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/employer/StatCard";
import MobilityPipeline from "@/components/employer/MobilityPipeline";
import RecentDecisions from "@/components/employer/RecentDecisions";

export default function EmployerDashboard() {
  const { org, roles, workers, decisions } = useEmployerData();
  const { workerId, roleId } = useDemoIds();
  const allSkills = workers.flatMap((w) => w.skills);
  const open = roles.filter((r) => r.status === "open");
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={org.name} title="Internal mobility overview" description="Who could move into which role — based on evidence, not CVs." />
      {workerId && org.is_demo && (
        <Link to={`/employer/candidate/${workerId}?role=${roleId}`} className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 transition-colors hover:bg-amber-100/70">
          <Sparkles className="h-5 w-5 shrink-0 text-amber-600" />
          <div className="flex-1"><p className="font-semibold text-amber-900">Ramesh Demo · Candidate 360</p><p className="text-sm text-amber-900/70">See how Ramesh's delivery work maps to Hub Operations Associate.</p></div>
          <ArrowRight className="h-4 w-4 text-amber-900" />
        </Link>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Open roles" value={open.length} />
        <StatCard icon={Users} label="Workers sharing" value={workers.length} hint="consented profiles" />
        <StatCard icon={FileCheck2} label="Evidence-backed" value={allSkills.filter((s) => rankOf(s.state) >= 2).length} hint="skills across the pool" />
        <StatCard icon={Award} label="Demonstrated" value={allSkills.filter((s) => s.state === "demonstrated").length} hint="via scenarios" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><MobilityPipeline roles={open} workers={workers} /></div>
        <RecentDecisions decisions={decisions} roles={roles} workers={workers} />
      </div>
    </div>
  );
}