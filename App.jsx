import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
// Add page imports here
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Landing from '@/pages/Landing';
import WorkerOnboarding from '@/pages/WorkerOnboarding';
import WorkerLayout from '@/components/layout/WorkerLayout';
import WorkerDashboard from '@/pages/WorkerDashboard';
import WorkHistory from '@/pages/WorkHistory';
import EvidenceVault from '@/pages/EvidenceVault';
import SkillProfile from '@/pages/SkillProfile';
import ScenarioAssessment from '@/pages/ScenarioAssessment';
import SkillGapCenter from '@/pages/SkillGapCenter';
import RecommendedRoles from '@/pages/RecommendedRoles';
import LearningHub from '@/pages/LearningHub';
import ConsentSharing from '@/pages/ConsentSharing';
import EmployerLayout from '@/components/layout/EmployerLayout';
import EmployerSetup from '@/pages/EmployerSetup';
import EmployerDashboard from '@/pages/EmployerDashboard';
import WorkforceAnalytics from '@/pages/WorkforceAnalytics';
import RoleManagement from '@/pages/RoleManagement';
import RoleCreate from '@/pages/RoleCreate';
import TalentDiscovery from '@/pages/TalentDiscovery';
import Candidate360 from '@/pages/Candidate360';
import AISkillIntelligence from '@/pages/AISkillIntelligence';
import WorkforceIntelligence from '@/pages/WorkforceIntelligence';
import EvidenceExplorer from '@/pages/EvidenceExplorer';
import EmployerSkillGaps from '@/pages/EmployerSkillGaps';
import Candidates from '@/pages/Candidates';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Landing />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/worker/onboarding" element={<WorkerOnboarding />} />
        <Route element={<WorkerLayout />}>
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/worker/history" element={<WorkHistory />} />
          <Route path="/worker/evidence" element={<EvidenceVault />} />
          <Route path="/worker/skills" element={<SkillProfile />} />
          <Route path="/worker/assessment" element={<ScenarioAssessment />} />
          <Route path="/worker/gaps" element={<SkillGapCenter />} />
          <Route path="/worker/roles" element={<RecommendedRoles />} />
          <Route path="/worker/learning" element={<LearningHub />} />
          <Route path="/worker/consent" element={<ConsentSharing />} />
          <Route path="/worker/intelligence" element={<AISkillIntelligence />} />
        </Route>
        <Route path="/employer/setup" element={<EmployerSetup />} />
        <Route element={<EmployerLayout />}>
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/analytics" element={<WorkforceAnalytics />} />
          <Route path="/employer/roles" element={<RoleManagement />} />
          <Route path="/employer/roles/new" element={<RoleCreate />} />
          <Route path="/employer/talent" element={<TalentDiscovery />} />
          <Route path="/employer/candidate/:id" element={<Candidate360 />} />
          <Route path="/employer/workforce" element={<WorkforceIntelligence />} />
          <Route path="/employer/evidence" element={<EvidenceExplorer />} />
          <Route path="/employer/gaps" element={<EmployerSkillGaps />} />
          <Route path="/employer/candidates" element={<Candidates />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App