
import { useState, useEffect, useRef } from "react";
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
  ExternalLink,
  User,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { CompletedJobsTable } from "@/components/dashboard/CompletedJobsTable";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import { DepositFundsDialog } from "@/components/dashboard/DepositFundsDialog";
import { WithdrawFundsDialog } from "@/components/dashboard/WithdrawFundsDialog";
import { ReferFriend } from "@/components/dashboard/ReferFriend";
import { EditProfile } from "@/components/dashboard/EditProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskerDashboardProps {
  activeMenu?: string;
}

const TaskerDashboard = ({ activeMenu: initialActiveMenu }: TaskerDashboardProps = {}) => {
  const [activeMenu, setActiveMenu] = useState(initialActiveMenu || "dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
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
      status: "awaiting review" as const
    },
    { 
      id: 2, 
      title: "Mobile App: Download and rate", 
      payment: 0.10, 
      date: "30 Dec 2023", 
      time: "08:15 PM", 
      status: "paid" as const
    },
    { 
      id: 3, 
      title: "Survey: Complete consumer preferences", 
      payment: 0.25, 
      date: "29 Dec 2023", 
      time: "03:22 PM", 
      status: "paid" as const
    },
    { 
      id: 4, 
      title: "Instagram: Follow and comment", 
      payment: 0.15, 
      date: "28 Dec 2023", 
      time: "01:45 PM", 
      status: "submitted" as const
    },
    { 
      id: 5, 
      title: "Website: Register and verify email", 
      payment: 0.08, 
      date: "27 Dec 2023", 
      time: "11:20 AM", 
      status: "submitted" as const
    },
    { 
      id: 6, 
      title: "YouTube: Subscribe to channel", 
      payment: 0.05, 
      date: "26 Dec 2023", 
      time: "09:15 AM", 
      status: "submitted" as const
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
        
        // Get avatar URL if available
        if (session.user.user_metadata.avatar_url) {
          setAvatarUrl(session.user.user_metadata.avatar_url);
        }
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
        
        // Get avatar URL if available
        if (session?.user.user_metadata.avatar_url) {
          setAvatarUrl(session.user.user_metadata.avatar_url);
        }
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
                <div className="overflow-y-auto h-full pb-20">
                  <SidebarContent
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    onLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
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
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden flex items-center justify-center bg-purple-100">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium text-purple-700">
                          {username?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile/edit')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
        <div ref={sidebarRef} className="hidden lg:block w-64 border-r bg-white overflow-y-auto pb-20">
          <SidebarContent
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 md:p-6">
            {activeMenu === "refer" ? (
              <ReferFriend />
            ) : activeMenu === "profile" ? (
              <div className="max-w-4xl mx-auto">
                <EditProfile />
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                {/* Main Column */}
                <div className="col-span-12 lg:col-span-8 space-y-4 md:space-y-6">
                  <DashboardHeader 
                    username={username} 
                    lastLogin={lastLogin} 
                  />
                  
                  <DashboardStats stats={stats} />
                  
                  {/* Task Call to Action */}
                  <div className="bg-white border rounded-lg shadow-sm p-4 md:p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">FINISH YOUR TASKS TODAY</h3>
                    <p className="text-gray-600 mb-4">
                      Exciting update! Ads are now accessible, and you receive $0.01 for every click.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      BEGIN WORKING
                    </Button>
                  </div>
                  
                  <div className="bg-white border rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Finished Jobs</h3>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/finished-jobs" className="flex items-center">
                          See all <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="overflow-x-auto border rounded-lg">
                      <CompletedJobsTable jobs={jobsData.slice(0, 5)} />
                    </div>
                  </div>
                </div>

                {/* Side Column */}
                <div className="col-span-12 lg:col-span-4 space-y-4 md:space-y-6">
                  <AccountSummary balance={33.20} accountType="Standard" />
                  
                  {/* Activity Summary */}
                  <div className="bg-white border rounded-lg shadow-sm p-4 md:p-6">
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
            )}
          </div>
        </div>
      </div>

      {/* Deposit Funds Dialog */}
      <DepositFundsDialog
        open={depositDialogOpen}
        onOpenChange={setDepositDialogOpen}
      />
      
      {/* Withdraw Funds Dialog */}
      <WithdrawFundsDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
      />
    </div>
  );
};

export default TaskerDashboard;
