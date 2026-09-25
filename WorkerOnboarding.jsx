const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

import useWorkerData from "@/hooks/useWorkerData";
import { enterDemo } from "@/lib/demo";
import Logo from "@/components/shared/Logo";
import LoadingScreen from "@/components/shared/LoadingScreen";
import LanguageStep from "@/components/worker/onboarding/LanguageStep";
import ModeStep from "@/components/worker/onboarding/ModeStep";
import DetailsStep from "@/components/worker/onboarding/DetailsStep";

const CONSENT = { visible_to_employers: true, share_evidence: true, share_assessments: true, share_work_history: true, share_contact: false };

export default function WorkerOnboarding() {
  const { profile, isLoading } = useWorkerData();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ language: "en", interaction_mode: "voice" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  if (isLoading) return <LoadingScreen />;
  if (profile) return <Navigate to="/worker" replace />;

  const finish = async (details) => {
    const history = details.current_role ? [{ role: details.current_role, employer: details.current_employer || "", duration_months: Math.round((details.years_experience || 0) * 12), tasks: "", source: "form" }] : [];
    await db.entities.WorkerProfile.create({ ...data, ...details, work_history: history, consent: CONSENT });
    await qc.invalidateQueries({ queryKey: ["workerProfile"] });
    navigate("/worker/history");
  };
  const set = (patch) => { setData({ ...data, ...patch }); setStep(step + 1); };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-2xl flex-col px-5 py-8">
        <div className="flex items-center justify-between"><Logo /><button onClick={() => enterDemo("/worker")} className="text-sm font-medium text-brand">Try Ramesh demo →</button></div>
        <div className="mt-10 flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-brand" : "bg-border"}`} />)}</div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="mt-10">
            {step === 0 && <LanguageStep value={data.language} onNext={(language) => set({ language })} />}
            {step === 1 && <ModeStep value={data.interaction_mode} onNext={(interaction_mode) => set({ interaction_mode })} onBack={() => setStep(0)} />}
            {step === 2 && <DetailsStep onSubmit={finish} onBack={() => setStep(1)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}