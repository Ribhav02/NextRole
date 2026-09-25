const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useQueryClient } from "@tanstack/react-query";

import useWorkerData from "@/hooks/useWorkerData";
import { speechLang } from "@/lib/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/shared/PageHeader";
import VoiceHistoryCapture from "@/components/worker/VoiceHistoryCapture";
import WorkHistoryForm from "@/components/worker/WorkHistoryForm";
import HistoryList from "@/components/worker/HistoryList";

export default function WorkHistory() {
  const { profile } = useWorkerData();
  const qc = useQueryClient();
  const history = profile.work_history || [];
  const lang = speechLang(profile.language);
  const save = async (list) => {
    await db.entities.WorkerProfile.update(profile.id, { work_history: list });
    qc.invalidateQueries({ queryKey: ["workerProfile"] });
  };
  return (
    <div>
      <PageHeader eyebrow="Step 1 · Real work" title="Tell us about your work" description="Speak or type what you did each day. We turn it into skills — marked self-declared until evidence backs them up." />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Tabs defaultValue={profile.interaction_mode === "form" ? "type" : "voice"}>
            <TabsList className="mb-4"><TabsTrigger value="voice">Speak it</TabsTrigger><TabsTrigger value="type">Type it</TabsTrigger></TabsList>
            <TabsContent value="voice"><VoiceHistoryCapture lang={lang} onAdd={(e) => save([...history, e])} /></TabsContent>
            <TabsContent value="type"><WorkHistoryForm lang={lang} onAdd={(e) => save([...history, e])} /></TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-2">
          <HistoryList items={history} onRemove={(i) => save(history.filter((_, j) => j !== i))} />
        </div>
      </div>
    </div>
  );
}