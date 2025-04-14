
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TaskerDashboard from "./pages/TaskerDashboard";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import SettingsPage from "./pages/SettingsPage";
import PaymentsPage from "./pages/PaymentsPage";
import FinishedJobsPage from "./pages/FinishedJobsPage";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import HelpCenter from "./pages/HelpCenter";
import Terms from "./pages/Terms";
import SupportPage from "./pages/SupportPage";
import JobsPage from "./pages/JobsPage";
import AdminLogin from "./pages/AdminLogin";
import { Toaster } from "@/components/ui/toaster";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import { getRoleBasedRedirectPath } from "@/utils/roleBasedRedirect";
import "./App.css";

// Advertiser pages
import SubmitJobPage from "./pages/advertiser/SubmitJobPage";
import MyJobsPage from "./pages/advertiser/MyJobsPage";
import MyWorkersPage from "./pages/advertiser/MyWorkersPage";
import SavedOffersPage from "./pages/advertiser/SavedOffersPage";

function App() {
  useEffect(() => {
    // Check and set theme preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:role" element={<Signup />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/tasker" element={
          <AuthGuard requiredRole="tasker">
            <TaskerDashboard />
          </AuthGuard>
        } />
        <Route path="/dashboard/advertiser" element={
          <AuthGuard requiredRole="advertiser">
            <AdvertiserDashboard />
          </AuthGuard>
        } />
        <Route path="/dashboard" element={<Navigate to="/dashboard/tasker" replace />} />
        
        {/* Advertiser Routes */}
        <Route path="/submit-job" element={
          <AuthGuard requiredRole="advertiser">
            <SubmitJobPage />
          </AuthGuard>
        } />
        <Route path="/my-jobs" element={
          <AuthGuard requiredRole="advertiser">
            <MyJobsPage />
          </AuthGuard>
        } />
        <Route path="/my-workers" element={
          <AuthGuard requiredRole="advertiser">
            <MyWorkersPage />
          </AuthGuard>
        } />
        <Route path="/saved-offers" element={
          <AuthGuard requiredRole="advertiser">
            <SavedOffersPage />
          </AuthGuard>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AuthGuard requiredRole="admin" redirectTo="/admin-login">
            <AdminDashboardPage />
          </AuthGuard>
        } />
        <Route path="/admin/users" element={
          <AuthGuard requiredRole="admin" redirectTo="/admin-login">
            <UsersPage />
          </AuthGuard>
        } />
        
        {/* Common Routes */}
        <Route path="/settings" element={
          <AuthGuard>
            <SettingsPage />
          </AuthGuard>
        } />
        <Route path="/payments" element={
          <AuthGuard>
            <PaymentsPage />
          </AuthGuard>
        } />
        <Route path="/finished-jobs" element={
          <AuthGuard>
            <FinishedJobsPage />
          </AuthGuard>
        } />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/support" element={
          <AuthGuard>
            <SupportPage />
          </AuthGuard>
        } />
        
        {/* Informational Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
