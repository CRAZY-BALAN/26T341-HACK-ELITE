import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProfileProvider, useProfile } from "./context/ProfileContext";
import { ToastProvider } from "./components/common/Toast";
import AppShell from "./components/layout/AppShell";

import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import Resources from "./pages/Resources";
import ResourceDetails from "./pages/ResourceDetails";
import Emergency from "./pages/Emergency";
import AccessibilityCenter from "./pages/AccessibilityCenter";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Impact from "./pages/Impact";
import VoiceNav from "./pages/VoiceNav";
import FocusMode from "./pages/FocusMode";
import LanguageCenter from "./pages/LanguageCenter";
import NotFound from "./pages/NotFound";

function RequireProfile({ children }) {
  const { profile } = useProfile();

  if (!profile) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected Routes */}
      <Route
        element={
          <RequireProfile>
            <AppShell />
          </RequireProfile>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assistant" element={<Assistant />} />

        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />

        <Route path="/emergency" element={<Emergency />} />
        <Route path="/accessibility" element={<AccessibilityCenter />} />
        <Route path="/community" element={<Community />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/impact" element={<Impact />} />

        <Route path="/voice" element={<VoiceNav />} />
        <Route path="/focus" element={<FocusMode />} />
        <Route path="/languages" element={<LanguageCenter />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <ToastProvider>
        <HashRouter>
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
        </HashRouter>
      </ToastProvider>
    </ProfileProvider>
  );
}