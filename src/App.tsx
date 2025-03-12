import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./App.css";

// Lazy load pages
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Terms = lazy(() => import("@/pages/Terms"));
const HelpCenter = lazy(() => import("@/pages/HelpCenter"));
const TaskerDashboard = lazy(() => import("@/pages/TaskerDashboard"));
const AdvertiserDashboard = lazy(() => import("@/pages/AdvertiserDashboard"));
const PaymentsPage = lazy(() => import("@/pages/PaymentsPage"));
const SupportPage = lazy(() => import("@/pages/SupportPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const FinishedJobsPage = lazy(() => import("@/pages/FinishedJobsPage"));
const SubmitJobPage = lazy(() => import("@/pages/advertiser/SubmitJobPage"));
const MyJobsPage = lazy(() => import("@/pages/advertiser/MyJobsPage"));
const SavedOffersPage = lazy(() => import("@/pages/advertiser/SavedOffersPage"));
const MyWorkersPage = lazy(() => import("@/pages/advertiser/MyWorkersPage"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-700"></div>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/:role" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/dashboard/tasker" element={<TaskerDashboard />} />
            <Route path="/dashboard/advertiser" element={<AdvertiserDashboard />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/finished-jobs" element={<FinishedJobsPage />} />
            <Route path="/profile/edit" element={<TaskerDashboard activeMenu="profile" />} />
            
            {/* Advertiser specific routes */}
            <Route path="/submit-job" element={<SubmitJobPage />} />
            <Route path="/my-jobs" element={<MyJobsPage />} />
            <Route path="/saved-offers" element={<SavedOffersPage />} />
            <Route path="/my-workers" element={<MyWorkersPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
