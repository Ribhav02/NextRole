import { Navigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, BarChart3, Briefcase, Users, Building2, UserCheck, Target } from "lucide-react";
import useEmployerData from "@/hooks/useEmployerData";
import AppShell from "@/components/shared/AppShell";
import LoadingScreen from "@/components/shared/LoadingScreen";

const NAV = [
  { label: "Dashboard", to: "/employer", icon: LayoutDashboard, end: true },
  { label: "Workforce", to: "/employer/workforce", icon: BarChart3 },
  { label: "Roles", to: "/employer/roles", icon: Briefcase },
  { label: "Talent", to: "/employer/talent", icon: Users },
  { label: "Candidates", to: "/employer/candidates", icon: UserCheck },
  { label: "Skill Gaps", to: "/employer/gaps", icon: Target },
  { label: "Analytics", to: "/employer/analytics", icon: BarChart3 },
  { label: "Organization", to: "/employer/setup", icon: Building2 },
];

export default function EmployerLayout() {
  const { org, isLoading } = useEmployerData();
  const { pathname } = useLocation();
  if (isLoading) return <LoadingScreen />;
  if (!org) return <Navigate to="/employer/setup" replace />;
  return (
    <AppShell dark items={NAV} portalLabel={org.name} switchTo={{ to: "/worker", label: "Worker portal" }}>
      <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        <Outlet />
      </motion.div>
    </AppShell>
  );
}