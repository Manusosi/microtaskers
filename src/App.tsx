
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import TaskerDashboard from './pages/TaskerDashboard';
import AdvertiserDashboard from './pages/AdvertiserDashboard';
import { EditProfile } from './components/dashboard/EditProfile';
import PaymentsPage from './pages/PaymentsPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/:type" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard/tasker" element={<TaskerDashboard />} />
          <Route path="/dashboard/advertiser" element={<AdvertiserDashboard />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
