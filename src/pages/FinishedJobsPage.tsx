
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BellDot, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompletedJobsTable } from "@/components/dashboard/CompletedJobsTable";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FinishedJobsPage = () => {
  const [activeMenu, setActiveMenu] = useState("finished-jobs");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample jobs data - in production, this would come from an API
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
    { 
      id: 7, 
      title: "Twitter: Follow and retweet", 
      payment: 0.07, 
      date: "25 Dec 2023", 
      time: "05:22 PM", 
      status: "paid" as const
    },
    { 
      id: 8, 
      title: "Dating App: Create profile", 
      payment: 0.20, 
      date: "24 Dec 2023", 
      time: "04:10 PM", 
      status: "declined" as const
    },
    { 
      id: 9, 
      title: "Facebook: Join group", 
      payment: 0.05, 
      date: "23 Dec 2023", 
      time: "11:45 AM", 
      status: "paid" as const
    },
    { 
      id: 10, 
      title: "Product Review: Write review", 
      payment: 0.30, 
      date: "22 Dec 2023", 
      time: "09:30 AM", 
      status: "paid" as const
    },
  ];

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUsername(session.user.user_metadata.username || session.user.email);
        
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
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto pb-20">
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
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Finished Jobs</h1>
                <p className="text-gray-600">View all your completed tasks and their payment status.</p>
              </div>
              
              <CompletedJobsTable jobs={jobsData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishedJobsPage;
