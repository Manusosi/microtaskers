
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import { BellDot, Menu } from "lucide-react";

const AdvertiserDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUsername(session.user.user_metadata.username || session.user.email);
        
        // Get avatar URL if it exists
        if (session.user.user_metadata.avatar_url) {
          setAvatarUrl(session.user.user_metadata.avatar_url);
        }
        
        // Format last login time
        const now = new Date();
        setLastLogin(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
      } else {
        navigate('/login');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setIsLoggedIn(true);
        setUsername(session?.user.user_metadata.username || session?.user.email || '');
        
        // Get avatar URL if it exists
        if (session?.user.user_metadata.avatar_url) {
          setAvatarUrl(session.user.user_metadata.avatar_url);
        }
        
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
    jobsFinished: 0,
    offers: 0,
    offerSales: 0,
    moneyEarned: 0
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
                Tasks
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Campaigns
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon">
                  <BellDot className="h-5 w-5" />
                </Button>
                <div className="hidden md:flex items-center space-x-2 bg-purple-100 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-bold text-purple-600">Advertiser</span>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-purple-700">
                      {username?.charAt(0)?.toUpperCase() || 'U'}
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
                  avatarUrl={avatarUrl}
                />
                
                <DashboardStats stats={stats} />
                
                {/* Campaign Call to Action */}
                <div className="bg-white border rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">CREATE YOUR FIRST CAMPAIGN</h3>
                  <p className="text-gray-600 mb-4">
                    Get started with your first advertising campaign. Reach thousands of potential customers.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Create Campaign
                  </Button>
                </div>
              </div>

              {/* Side Column */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <AccountSummary balance={0} accountType="Advertiser" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
