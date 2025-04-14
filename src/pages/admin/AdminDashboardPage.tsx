
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, 
  BellDot, 
  LineChart,
  UsersRound,
  Briefcase,
  Shield,
  MessageSquare,
  Settings,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  Users,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebarContent from "@/components/admin/AdminSidebarContent";
import { UserStatsChart } from "@/components/admin/UserStatsChart";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { RecentRegistrationsTable } from "@/components/admin/RecentRegistrationsTable";
import { JobsOverviewCards } from "@/components/admin/JobsOverviewCards";

const AdminDashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  // Sample admin statistics
  const statistics = {
    totalUsers: 12567,
    newUsers: 248,
    activeJobs: 376,
    totalJobs: 1432,
    pendingReviews: 45,
    totalRevenue: 85624.75,
    todayRevenue: 1245.50
  };

  // Sample user distribution data for the chart
  const userDistribution = [
    { name: 'Advertisers', value: 2342 },
    { name: 'Taskers', value: 10225 }
  ];

  // Sample recent user registrations
  const recentRegistrations = [
    { id: 1, username: 'johnsmith', email: 'john@example.com', role: 'Tasker', country: 'United States', registeredAt: '2024-04-13T14:25:00' },
    { id: 2, username: 'maryjones', email: 'mary@example.com', role: 'Advertiser', country: 'Canada', registeredAt: '2024-04-13T11:10:00' },
    { id: 3, username: 'davidwilson', email: 'david@example.com', role: 'Tasker', country: 'United Kingdom', registeredAt: '2024-04-12T22:45:00' },
    { id: 4, username: 'emilyclark', email: 'emily@example.com', role: 'Tasker', country: 'Australia', registeredAt: '2024-04-12T20:30:00' },
    { id: 5, username: 'roberthall', email: 'robert@example.com', role: 'Advertiser', country: 'Germany', registeredAt: '2024-04-12T16:15:00' }
  ];

  // Sample monthly revenue data for the chart
  const revenueData = [
    { month: 'Jan', revenue: 12450 },
    { month: 'Feb', revenue: 14780 },
    { month: 'Mar', revenue: 13900 },
    { month: 'Apr', revenue: 15620 },
    { month: 'May', revenue: 18450 },
    { month: 'Jun', revenue: 17890 },
    { month: 'Jul', revenue: 19230 }
  ];

  // Sample job statistics
  const jobStats = {
    active: 376,
    completed: 878,
    paused: 85,
    draft: 93
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
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
                <AdminSidebarContent
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="MicroTaskers"
                className="h-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const nextSibling = target.nextSibling as HTMLElement;
                  if (nextSibling) {
                    nextSibling.style.display = 'block';
                  }
                }}
              />
              <span className="text-xl font-bold text-gray-900" style={{ display: 'none' }}>
                MicroTaskers
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <BellDot className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center space-x-2 bg-red-100 px-3 py-1.5 rounded-full">
              <span className="text-sm font-bold text-red-600">Admin</span>
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-purple-100">
              <span className="text-sm font-medium text-purple-700">A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <AdminSidebarContent
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{statistics.totalUsers.toLocaleString()}</h3>
                      <p className="text-xs text-green-600 mt-1">+{statistics.newUsers} new this week</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <UsersRound className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{statistics.activeJobs.toLocaleString()}</h3>
                      <p className="text-xs text-gray-500 mt-1">of {statistics.totalJobs.toLocaleString()} total</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{statistics.pendingReviews}</h3>
                      <p className="text-xs text-amber-600 mt-1">Requires attention</p>
                    </div>
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">${statistics.totalRevenue.toLocaleString()}</h3>
                      <p className="text-xs text-green-600 mt-1">+${statistics.todayRevenue} today</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                  <CardDescription>Breakdown of advertisers vs. taskers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <UserStatsChart data={userDistribution} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue in USD</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <RevenueChart data={revenueData} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Status Cards */}
            <JobsOverviewCards jobStats={jobStats} />

            {/* Recent Registrations */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentRegistrationsTable registrations={recentRegistrations} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
