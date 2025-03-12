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

function App() {
  return (
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
  );
}

export default App;
