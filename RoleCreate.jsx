import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEmployerData from "@/hooks/useEmployerData";
import PageHeader from "@/components/shared/PageHeader";
import RoleForm from "@/components/employer/RoleForm";
import RoleImport from "@/components/employer/RoleImport";

export default function RoleCreate() {
  const { org } = useEmployerData();
  const tab = new URLSearchParams(window.location.search).get("tab") === "import" ? "import" : "create";
  return (
    <div>
      <Link to="/employer/roles" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Roles</Link>
      <PageHeader eyebrow="New role" title="Define a role by its skills" description="For each skill, choose whether it's core or preferred and the minimum evidence you need. This drives explainable matching." />
      <Tabs defaultValue={tab}>
        <TabsList className="mb-5"><TabsTrigger value="create">Create</TabsTrigger><TabsTrigger value="import">Import CSV / JSON</TabsTrigger></TabsList>
        <TabsContent value="create"><RoleForm orgId={org.id} /></TabsContent>
        <TabsContent value="import"><RoleImport orgId={org.id} /></TabsContent>
      </Tabs>
    </div>
  );
}