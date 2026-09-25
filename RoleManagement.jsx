import { Link } from "react-router-dom";
import { Plus, Upload, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmployerData from "@/hooks/useEmployerData";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import RoleCard from "@/components/employer/RoleCard";

export default function RoleManagement() {
  const { roles, workers } = useEmployerData();
  return (
    <div>
      <PageHeader
        eyebrow="Roles"
        title="Role management"
        description="Define internal roles by the skills they need and the evidence level required for each."
        actions={<>
          <Button variant="outline" asChild className="rounded-full bg-white"><Link to="/employer/roles/new?tab=import"><Upload className="mr-2 h-4 w-4" />Import CSV/JSON</Link></Button>
          <Button asChild className="rounded-full"><Link to="/employer/roles/new"><Plus className="mr-2 h-4 w-4" />New role</Link></Button>
        </>}
      />
      {roles.length ? (
        <div className="grid gap-4 md:grid-cols-2">{roles.map((r) => <RoleCard key={r.id} role={r} workers={workers} />)}</div>
      ) : (
        <EmptyState icon={Briefcase} title="No roles yet" description="Create your first internal role or import several at once." action={<Button asChild className="rounded-full"><Link to="/employer/roles/new">Create role</Link></Button>} />
      )}
    </div>
  );
}