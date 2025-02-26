import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellDot, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { SidebarContent } from "@/components/dashboard/SidebarContent";
import { ActivityTable } from "@/components/dashboard/ActivityTable";
import { supabase } from "@/integrations/supabase/client";

const TaskerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUsername(session.user.user_metadata.username || session.user.email);
      } else {
        navigate('/login');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
        setUsername(session?.user.user_metadata.username || session?.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    navigate('/');
  };

  const activityData = [
    { date: "19/10", clicks: 5, earnings: 0.05 },
    { date: "18/10", clicks: 8, earnings: 0.08 },
    { date: "17/10", clicks: 12, earnings: 0.12 },
    { date: "16/10", clicks: 3, earnings: 0.03 },
    { date: "15/10", clicks: 7, earnings: 0.07 },
    { date: "14/10", clicks: 10, earnings: 0.10 },
    { date: "13/10", clicks: 6, earnings: 0.06 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 px-4">
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
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  Hello, {username}!
                </span>
                <Button variant="ghost" size="icon">
                  <BellDot className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Balance:</span>
                  <span className="text-sm font-bold text-purple-900">US$33.20</span>
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

      {/* Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white hidden lg:block">
        <SidebarContent 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-600 to-purple-700">
              <CardContent className="p-6">
                <h3 className="text-white text-lg font-medium mb-2">ACCOUNT BALANCE</h3>
                <p className="text-white text-3xl font-bold">US$33.20</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-700 text-lg font-medium mb-2">TODAY'S WORK</h3>
                <p className="text-3xl font-bold text-gray-900">US$0.04</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-700 text-lg font-medium mb-2">TOTAL PAYOUTS</h3>
                <p className="text-3xl font-bold text-gray-900">US$0.00</p>
              </CardContent>
            </Card>
          </div>

          {/* Task Call to Action */}
          <Card className="bg-gradient-to-r from-purple-50 to-white border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">FINISH YOUR TASKS TODAY</h3>
              <p className="text-gray-600 mb-4">
                Exciting update! Ads are now accessible, and you receive $0.01 for every click.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                BEGIN WORKING
              </Button>
            </CardContent>
          </Card>

          {/* Activity Table */}
          <ActivityTable activityData={activityData} />
        </div>
      </div>
    </div>
  );
};

export default TaskerDashboard;
