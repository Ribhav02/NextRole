import { useState } from "react";
import { Upload, UserCheck, FolderLock } from "lucide-react";
import { Button } from "@/components/ui/button";
import useWorkerData from "@/hooks/useWorkerData";
import PageHeader from "@/components/shared/PageHeader";
import EvidenceLegend from "@/components/shared/EvidenceLegend";
import EmptyState from "@/components/shared/EmptyState";
import EvidenceCard from "@/components/worker/EvidenceCard";
import EvidenceUploadDialog from "@/components/worker/EvidenceUploadDialog";
import SupervisorRequestDialog from "@/components/worker/SupervisorRequestDialog";
import EvidenceDetailDrawer from "@/components/shared/EvidenceDetailDrawer";

export default function EvidenceVault() {
  const { profile, evidence } = useWorkerData();
  const [upload, setUpload] = useState(false);
  const [sup, setSup] = useState(false);
  const [detail, setDetail] = useState(null);
  return (
    <div>
      <PageHeader
        eyebrow="Step 2 · Evidence"
        title="Evidence Vault"
        description="Your private store of work proof. Files stay private and are only shared if you allow it in Consent & Sharing."
        actions={<>
          <Button variant="outline" onClick={() => setSup(true)} className="rounded-full bg-white"><UserCheck className="mr-2 h-4 w-4" />Ask a supervisor</Button>
          <Button onClick={() => setUpload(true)} className="rounded-full"><Upload className="mr-2 h-4 w-4" />Add evidence</Button>
        </>}
      />
      <div className="mb-6 rounded-2xl border bg-card px-5 py-4"><EvidenceLegend compact /></div>
      {evidence.length ? (
        <div className="grid gap-4 md:grid-cols-2">{evidence.map((e) => <EvidenceCard key={e.id} item={e} onOpen={setDetail} />)}</div>
      ) : (
        <EmptyState icon={FolderLock} title="No evidence yet" description="Add a screenshot from your work app, a certificate, or ask a supervisor to confirm your skills." action={<Button onClick={() => setUpload(true)} className="rounded-full">Add first evidence</Button>} />
      )}
      <EvidenceUploadDialog open={upload} onOpenChange={setUpload} profileId={profile.id} />
      <SupervisorRequestDialog open={sup} onOpenChange={setSup} profileId={profile.id} />
      <EvidenceDetailDrawer item={detail} open={!!detail} onOpenChange={(o) => !o && setDetail(null)} mode="worker" consent={profile.consent || {}} />
    </div>
  );
}