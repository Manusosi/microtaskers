import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import FAQ from "@/pages/FAQ";
import Terms from "@/pages/Terms";
import HelpCenter from "@/pages/HelpCenter";
import TaskerDashboard from "@/pages/TaskerDashboard";
import AdvertiserDashboard from "@/pages/AdvertiserDashboard";
import PaymentsPage from "@/pages/PaymentsPage";
import SupportPage from "@/pages/SupportPage";
import SettingsPage from "@/pages/SettingsPage";
import FinishedJobsPage from "@/pages/FinishedJobsPage";
import SubmitJobPage from "@/pages/advertiser/SubmitJobPage";
import MyJobsPage from "@/pages/advertiser/MyJobsPage";
import SavedOffersPage from "@/pages/advertiser/SavedOffersPage";
import MyWorkersPage from "@/pages/advertiser/MyWorkersPage";
import "./App.css";

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
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
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
