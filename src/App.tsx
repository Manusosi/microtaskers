
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TaskerDashboard from "./pages/TaskerDashboard";
import PaymentsPage from "./pages/PaymentsPage";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<TaskerDashboard />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/advertiser-dashboard" element={<AdvertiserDashboard />} />
          <Route path="/signup/:type" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<HelpCenter />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
