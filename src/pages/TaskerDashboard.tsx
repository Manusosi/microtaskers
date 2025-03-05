
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  BellDot, 
  Menu, 
  Search, 
  ArrowUpRight,
  Download,
  Upload,
  Headphones,
  Users,
  UserCog,
  LogOut,
  Eye,
  FileCheck,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { SidebarContent } from "@/components/dashboard/SidebarContent";
import { CompletedJobsTable } from "@/components/dashboard/CompletedJobsTable";
import { AccountSummary } from "@/components/dashboard/AccountSummary";

const TaskerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const navigate = useNavigate();

  const activityData = [
    { date: "19/10", clicks: 5, earnings: 0.05 },
    { date: "18/10", clicks: 8, earnings: 0.08 },
    { date: "17/10", clicks: 12, earnings: 0.12 },
    { date: "16/10", clicks: 3, earnings: 0.03 },
    { date: "15/10", clicks: 7, earnings: 0.07 },
    { date: "14/10", clicks: 10, earnings: 0.10 },
    { date: "13/10", clicks: 6, earnings: 0.06 },
  ];

  const jobsData = [
    { 
      id: 1, 
      title: "YouTube: Watch video and like", 
      payment: 0.05, 
      date: "31 Dec 2023", 
      time: "10:34 PM", 
      status: "paid" 
    },
    { 
      id: 2, 
      title: "Mobile App: Download and rate", 
      payment: 0.10, 
      date: "30 Dec 2023", 
      time: "08:15 PM", 
      status: "paid" 
    },
    { 
      id: 3, 
      title: "Survey: Complete consumer preferences", 
      payment: 0.25, 
      date: "29 Dec 2023", 
      time: "03:22 PM", 
      status: "paid" 
    },
  ];

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUsername(session.user.user_metadata.username || session.user.email);
        
        // Format last login time
        const now = new Date();
        setLastLogin(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
      } else {
        navigate('/login');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
        setUsername(session?.user.user_metadata.username || session?.user.email || '');
        
        // Format last login time
        const now = new Date();
        setLastLogin(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const stats = {
    jobsFinished: 3,
    offers: 2,
    offerSales: 0,
    moneyEarned: 33.20
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <div className="sticky top-0 left-0 right-0 h-16 bg-white border-b z-40 px-4 shadow-sm">
        <div className="h-full flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent 
                  activeMenu={activeMenu} 
                  setActiveMenu={setActiveMenu}
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              </SheetContent>
            </Sheet>
            <Link to="/">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="Logo"
                className="h-8"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-6 ml-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Jobs
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Offers
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon">
                  <BellDot className="h-5 w-5" />
                </Button>
                <div className="hidden md:flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-bold text-green-600">US$33.20</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-700">
                    {username?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/signup/tasker">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <SidebarContent 
            activeMenu={activeMenu} 
            setActiveMenu={setActiveMenu} 
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Main Column */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <DashboardHeader 
                  username={username} 
                  lastLogin={lastLogin} 
                />
                
                <DashboardStats stats={stats} />
                
                {/* Task Call to Action */}
                <div className="bg-white border rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">FINISH YOUR TASKS TODAY</h3>
                  <p className="text-gray-600 mb-4">
                    Exciting update! Ads are now accessible, and you receive $0.01 for every click.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    BEGIN WORKING
                  </Button>
                </div>
                
                <CompletedJobsTable jobs={jobsData} />
              </div>

              {/* Side Column */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <AccountSummary balance={33.20} accountType="Standard" />
                
                {/* Activity Summary */}
                <div className="bg-white border rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {activityData.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <FileCheck className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.clicks} clicks</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-600">+${activity.earnings.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="text-purple-600 w-full" asChild>
                      <Link to="#" className="flex items-center justify-center">
                        View all activity <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskerDashboard;
