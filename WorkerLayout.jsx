import { Navigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, History, FolderLock, Brain, ClipboardCheck, Target, Compass, GraduationCap, Lock } from "lucide-react";
import useWorkerData from "@/hooks/useWorkerData";
import { t } from "@/lib/i18n";
import AppShell from "@/components/shared/AppShell";
import LoadingScreen from "@/components/shared/LoadingScreen";
import DemoBanner from "@/components/layout/DemoBanner";

const NAV = [
  { key: "dashboard", to: "/worker", icon: LayoutDashboard, end: true },
  { key: "history", to: "/worker/history", icon: History },
  { key: "evidence", to: "/worker/evidence", icon: FolderLock },
  { key: "skills", to: "/worker/skills", icon: Brain },
  { key: "assessment", to: "/worker/assessment", icon: ClipboardCheck },
  { key: "gaps", to: "/worker/gaps", icon: Target },
  { key: "roles", to: "/worker/roles", icon: Compass },
  { key: "learning", to: "/worker/learning", icon: GraduationCap },
  { key: "consent", to: "/worker/consent", icon: Lock },
];

export default function WorkerLayout() {
  const { profile, isLoading, demo } = useWorkerData();
  const { pathname } = useLocation();
  if (isLoading) return <LoadingScreen />;
  if (!profile) return <Navigate to="/worker/onboarding" replace />;
  const lang = profile.language || "en";
  const items = NAV.map((n) => ({ ...n, label: t(lang, n.key), sub: lang !== "en" && t(lang, n.key) !== t("en", n.key) ? t("en", n.key) : null }));
  return (
    <AppShell items={items} portalLabel={t(lang, "workerPortal")} switchTo={{ to: "/employer", label: "Employer portal" }} banner={demo && <DemoBanner />}>
      <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        <Outlet />
      </motion.div>
    </AppShell>
  );
}