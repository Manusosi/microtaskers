
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdvertiserOptionsDialog from "@/components/dialogs/AdvertiserOptionsDialog";
import { supabase } from "@/integrations/supabase/client";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUserRole(session.user.user_metadata.role);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(event === 'SIGNED_IN');
      if (session) {
        setUserRole(session.user.user_metadata.role);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const handleDashboardClick = () => {
    if (userRole === 'tasker') {
      navigate('/dashboard/tasker');
    } else {
      navigate('/dashboard/advertiser');
    }
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('how-it-works');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 border-b shadow-sm bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png" alt="Microtaskers Logo" className="h-12" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/#how-it-works" onClick={scrollToHowItWorks} className="text-gray-700 hover:text-gray-900 font-medium">How it works</a>
            <Link to="/resources" className="text-gray-700 hover:text-gray-900 font-medium">Resources</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-gray-900 font-medium">Jobs</Link>
            <Link to="/games" className="text-gray-700 hover:text-gray-900 font-medium">Games</Link>
            <Link to="/cashback" className="text-gray-700 hover:text-gray-900 font-medium">Cashback</Link>
            <Link to="/shops" className="text-gray-700 hover:text-gray-900 font-medium">Shops</Link>
            
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleDashboardClick}
                  className="text-purple-700 hover:text-purple-800 font-semibold"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-purple-700 hover:text-purple-800 font-semibold">Sign in</Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full px-6">Get Started</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Choose Your Path</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Link 
                        to="/signup/tasker" 
                        className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold mb-2">I want to complete tasks and earn money</h3>
                        <p className="text-sm text-gray-600">Find tasks and get paid for your work.</p>
                      </Link>
                      <AdvertiserOptionsDialog 
                        trigger={
                          <div className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <h3 className="font-semibold mb-2">I want to post tasks and hire</h3>
                            <p className="text-sm text-gray-600">Post tasks and hire professionals.</p>
                          </div>
                        }
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a href="/#how-it-works" onClick={scrollToHowItWorks} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">How it works</a>
            <Link to="/resources" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Resources</Link>
            <Link to="/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Jobs</Link>
            <Link to="/games" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Games</Link>
            <Link to="/cashback" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Cashback</Link>
            <Link to="/shops" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Shops</Link>
            
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleDashboardClick}
                  className="w-full text-left px-4 py-2 text-purple-700 hover:bg-purple-50 rounded-lg"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-purple-700 hover:bg-purple-50 rounded-lg">Sign in</Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full">Get Started</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Choose Your Path</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Link 
                        to="/signup/tasker" 
                        className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold mb-2">I want to complete tasks and earn money</h3>
                        <p className="text-sm text-gray-600">Find tasks and get paid for your work.</p>
                      </Link>
                      <AdvertiserOptionsDialog 
                        trigger={
                          <div className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <h3 className="font-semibold mb-2">I want to post tasks and hire</h3>
                            <p className="text-sm text-gray-600">Post tasks and hire professionals.</p>
                          </div>
                        }
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
