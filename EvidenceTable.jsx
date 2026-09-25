import { Link } from "react-router-dom";
import { SKILL_MAP } from "@/lib/intelligence/skillTaxonomy";
import EvidenceBadge from "@/components/shared/EvidenceBadge";
import SkillChip from "@/components/shared/SkillChip";

export default function EvidenceTable({ rows }) {
  if (!rows.length) return <p className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">No evidence matches these filters.</p>;
  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr><th className="p-3">Evidence</th><th className="p-3">Worker</th><th className="p-3">State</th><th className="p-3">Skills</th><th className="p-3">Confirmer</th></tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((e) => (
            <tr key={e.id} className="align-top hover:bg-secondary/30">
              <td className="p-3"><p className="font-medium">{e.title}</p><p className="text-xs capitalize text-muted-foreground">{e.evidence_type.replace("_", " ")}{e.date ? ` · ${e.date}` : ""}</p></td>
              <td className="p-3"><Link to={`/employer/candidate/${e.workerId}`} className="font-medium text-brand">{e.workerName}</Link></td>
              <td className="p-3"><EvidenceBadge state={e.evidence_state} useStatus /></td>
              <td className="p-3"><div className="flex flex-wrap gap-1">{(e.extracted_skills || []).slice(0, 3).map((id) => SKILL_MAP[id] && <SkillChip key={id} name={SKILL_MAP[id].name} state={e.evidence_state} size="sm" />)}</div></td>
              <td className="p-3 text-xs text-muted-foreground">{e.verifier_name ? `${e.verifier_name}, ${e.verifier_role}` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}