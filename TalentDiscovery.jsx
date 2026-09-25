import { useMemo, useState } from "react";
import useEmployerData from "@/hooks/useEmployerData";
import { matchRole, compareMatches } from "@/lib/intelligence/matching";
import { rankOf } from "@/lib/intelligence/evidenceModel";
import PageHeader from "@/components/shared/PageHeader";
import TalentFilters from "@/components/employer/TalentFilters";
import TalentCard from "@/components/employer/TalentCard";

export default function TalentDiscovery() {
  const { roles, workers } = useEmployerData();
  const [f, setF] = useState({ roleId: new URLSearchParams(window.location.search).get("role") || "all", minEvidence: "1", skills: [], q: "", blind: false });
  const role = roles.find((r) => r.id === f.roleId);

  const list = useMemo(() => {
    const min = Number(f.minEvidence);
    return workers
      .filter((w) => !f.q || w.profile.name.toLowerCase().includes(f.q.toLowerCase()) || (w.profile.current_role || "").toLowerCase().includes(f.q.toLowerCase()))
      .filter((w) => f.skills.every((id) => w.skills.some((s) => s.id === id && rankOf(s.state) >= min)))
      .map((w) => ({ worker: w, match: role ? matchRole(w.skills, role, w.profile) : null }))
      .sort((a, b) => (role ? compareMatches(a.match, b.match) : b.worker.skills.filter((s) => rankOf(s.state) >= 2).length - a.worker.skills.filter((s) => rankOf(s.state) >= 2).length));
  }, [workers, role, f]);

  return (
    <div>
      <PageHeader eyebrow="Talent" title="Talent discovery" description="Find internal workers by demonstrated and evidence-backed skills. Only workers who opted in are shown." />
      <TalentFilters f={f} setF={setF} roles={roles} />
      <p className="mb-4 mt-6 text-sm text-muted-foreground">{list.length} worker{list.length !== 1 && "s"}{role && <> · ranked for <b className="text-foreground">{role.title}</b> by readiness, then evidence</>}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map(({ worker, match }, i) => <TalentCard key={worker.profile.id} worker={worker} match={match} role={role} blind={f.blind} index={i} minEvidence={Number(f.minEvidence)} />)}
      </div>
    </div>
  );
}