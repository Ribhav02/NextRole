import { useState } from "react";
import useWorkerData from "@/hooks/useWorkerData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import MatchColumns from "@/components/shared/MatchColumns";
import ReadinessBadge from "@/components/shared/ReadinessBadge";
import GapPlan from "@/components/worker/GapPlan";
import GapFrequency from "@/components/worker/GapFrequency";

export default function SkillGapCenter() {
  const { matches } = useWorkerData();
  const [roleId, setRoleId] = useState(matches[0]?.role.id);
  const current = matches.find((m) => m.role.id === roleId) || matches[0];
  if (!current) return <PageHeader eyebrow="Gaps" title="Skill Gap Center" description="No open roles to compare against yet." />;
  return (
    <div>
      <PageHeader eyebrow="Step 5 · Gaps" title="Skill Gap Center" description="Pick a role to see exactly what stands between you and it — and the quickest way to close each gap." />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select value={current.role.id} onValueChange={setRoleId}>
          <SelectTrigger className="h-11 w-full bg-white sm:w-80"><SelectValue /></SelectTrigger>
          <SelectContent>{matches.map((m) => <SelectItem key={m.role.id} value={m.role.id}>{m.role.title}</SelectItem>)}</SelectContent>
        </Select>
        <ReadinessBadge readiness={current.match.readiness} />
      </div>
      <MatchColumns match={current.match} />
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3"><GapPlan match={current.match} /></div>
        <div className="lg:col-span-2"><GapFrequency matches={matches} /></div>
      </div>
    </div>
  );
}