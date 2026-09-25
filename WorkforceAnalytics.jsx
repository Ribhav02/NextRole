import useEmployerData from "@/hooks/useEmployerData";
import PageHeader from "@/components/shared/PageHeader";
import SkillSupplyChart from "@/components/employer/SkillSupplyChart";
import ReadinessChart from "@/components/employer/ReadinessChart";
import EvidenceMixChart from "@/components/employer/EvidenceMixChart";
import CommonGaps from "@/components/employer/CommonGaps";

export default function WorkforceAnalytics() {
  const { roles, workers } = useEmployerData();
  const open = roles.filter((r) => r.status === "open");
  return (
    <div>
      <PageHeader eyebrow="Workforce intelligence" title="Workforce analytics" description="Aggregated, consented data only. Shows where skills are strong, how well they're evidenced, and which gaps block internal moves." />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3"><SkillSupplyChart workers={workers} /></div>
        <div className="lg:col-span-2"><EvidenceMixChart workers={workers} /></div>
        <div className="lg:col-span-3"><ReadinessChart roles={open} workers={workers} /></div>
        <div className="lg:col-span-2"><CommonGaps roles={open} workers={workers} /></div>
      </div>
    </div>
  );
}