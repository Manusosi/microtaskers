import React, { useState, useEffect, useRef } from 'react';
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
  Settings,
  BarChart,
  Target,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { signOut } from "@/utils/authHelpers";

interface Campaign {
  id: number;
  title: string;
  budget: number;
  spent: number;
  status: "active" | "paused" | "completed" | "draft";
  clicks: number;
  impressions: number;
  startDate: string;
  endDate: string;
}

const AdvertiserDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [lastLogin, setLastLogin] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Use our custom auth hook
  const { isLoading, isAuthenticated, user, error } = useAuth();

  // Mock campaign data
  const campaignData: Campaign[] = [
    {
      id: 1,
      title: "Summer Sale Promotion",
      budget: 500,
      spent: 324.50,
      status: "active",
      clicks: 1250,
      impressions: 15000,
      startDate: "2024-03-01",
      endDate: "2024-03-31"
    },
    {
      id: 2,
      title: "Product Launch Campaign",
      budget: 1000,
      spent: 750.25,
      status: "active",
      clicks: 2100,
      impressions: 25000,
      startDate: "2024-03-05",
      endDate: "2024-04-05"
    },
    {
      id: 3,
      title: "Brand Awareness",
      budget: 300,
      spent: 300,
      status: "completed",
      clicks: 850,
      impressions: 10000,
      startDate: "2024-02-15",
      endDate: "2024-03-15"
    }
  ];

  // Mock performance data
  const performanceData = [
    { date: "Mar 10", clicks: 150, spend: 45.50 },
    { date: "Mar 09", clicks: 180, spend: 52.30 },
    { date: "Mar 08", clicks: 220, spend: 65.80 },
    { date: "Mar 07", clicks: 130, spend: 38.90 },
    { date: "Mar 06", clicks: 165, spend: 49.50 },
    { date: "Mar 05", clicks: 195, spend: 58.40 },
    { date: "Mar 04", clicks: 145, spend: 43.20 },
  ];

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setLastLogin(`${session.user.created_at}`);
      } else {
        navigate('/login');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setLastLogin(`${session?.user.created_at}`);
      } else if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    const { success, error } = await signOut();
    if (success) {
      navigate('/');
    } else {
      console.error("Logout failed:", error);
    }
  };

  const stats = {
    jobsFinished: campaignData.filter(c => c.status === "completed").length,
    offers: campaignData.length,
    offerSales: campaignData.reduce((acc, curr) => acc + curr.clicks, 0),
    moneyEarned: campaignData.reduce((acc, curr) => acc + curr.spent, 0)
  };

  const getStatusBadge = (status: Campaign["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      draft: "bg-gray-100 text-gray-800"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Early return for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
                  isLoggedIn={isAuthenticated}
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
                Tasks
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Campaigns
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon">
                  <BellDot className="h-5 w-5" />
                </Button>
                <div className="hidden md:flex items-center space-x-2 bg-purple-100 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-bold text-purple-600">Advertiser</span>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-purple-700">
                      {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/signup/advertiser">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div ref={sidebarRef} className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <SidebarContent
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            onLogout={handleLogout}
            isLoggedIn={isAuthenticated}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Main Column */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <DashboardHeader 
                  username={user?.username || ''} 
                  lastLogin={lastLogin}
                  avatarUrl={user?.avatarUrl || null}
                />
                
                <DashboardStats stats={stats} />
                
                {/* Campaign Performance */}
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-6 w-6 text-purple-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Campaign Performance</h3>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <Target className="h-5 w-5 text-purple-600" />
                        <span className="text-sm text-purple-600 font-medium">Total Impressions</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-700 mt-2">
                        {campaignData.reduce((acc, curr) => acc + curr.impressions, 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-blue-600 font-medium">Total Clicks</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700 mt-2">
                        {campaignData.reduce((acc, curr) => acc + curr.clicks, 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">Total Spent</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700 mt-2">
                        ${campaignData.reduce((acc, curr) => acc + curr.spent, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Active Campaigns Table */}
                  <div className="overflow-x-auto border rounded-lg">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-semibold">Campaign</TableHead>
                          <TableHead className="font-semibold">Budget</TableHead>
                          <TableHead className="font-semibold">Spent</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Performance</TableHead>
                          <TableHead className="font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaignData.map((campaign) => (
                          <TableRow key={campaign.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div>
                                <p className="font-medium">{campaign.title}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>${campaign.budget.toFixed(2)}</TableCell>
                            <TableCell>${campaign.spent.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm font-medium">{campaign.clicks.toLocaleString()} clicks</p>
                                <p className="text-xs text-gray-500">{campaign.impressions.toLocaleString()} impressions</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>

                {/* Create Campaign CTA */}
                <div className="bg-white border rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">CREATE NEW CAMPAIGN</h3>
                  <p className="text-gray-600 mb-4">
                    Launch a new advertising campaign to reach your target audience effectively.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Create Campaign
                  </Button>
                </div>
              </div>

              {/* Side Column */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <AccountSummary 
                  balance={campaignData.reduce((acc, curr) => acc + (curr.budget - curr.spent), 0)} 
                  accountType="Advertiser" 
                />

                {/* Recent Activity */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {performanceData.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.clicks} clicks</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-red-600">-${activity.spend.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="text-purple-600 w-full">
                      View all activity <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
