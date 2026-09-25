import { Link } from "react-router-dom";
import useWorkerData from "@/hooks/useWorkerData";
import { t } from "@/lib/i18n";
import { rankOf } from "@/lib/intelligence/evidenceModel";
import JourneyProgress from "@/components/worker/JourneyProgress";
import TopOpportunity from "@/components/worker/TopOpportunity";
import NextSteps from "@/components/worker/NextSteps";
import SkillChip from "@/components/shared/SkillChip";
import EvidenceLegend from "@/components/shared/EvidenceLegend";

export default function WorkerDashboard() {
  const { profile, skills, evidence, assessments, matches } = useWorkerData();
  const backed = skills.filter((s) => rankOf(s.state) >= 2);
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">{t(profile.language, "greeting")},</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-[2.5rem]">{profile.name}</h1>
        <p className="mt-1 text-muted-foreground">{[profile.current_role, profile.current_employer, profile.city].filter(Boolean).join(" · ")}</p>
      </div>
      <JourneyProgress profile={profile} evidence={evidence} skills={skills} matches={matches} />
      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rounded-2xl border bg-card p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">Your skills</h2>
            <Link to="/worker/skills" className="text-sm font-medium text-brand">Full profile →</Link>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{backed.length} of {skills.length} skills are backed by documents, supervisors or scenarios.</p>