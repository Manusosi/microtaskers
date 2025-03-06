
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  BellDot, 
  Menu,
  MessageCircle,
  TicketCheck,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { SupportConversations } from "@/components/support/SupportConversations";
import { SupportTickets } from "@/components/support/SupportTickets";
import { CreateTicketDialog } from "@/components/support/CreateTicketDialog";
import { ReferFriend } from "@/components/dashboard/ReferFriend";
import { useToast } from "@/hooks/use-toast";

const SupportPage = () => {
  const [activeMenu, setActiveMenu] = useState("support");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleTicketSubmit = (ticketData) => {
    console.log("Ticket submitted:", ticketData);
    setCreateTicketOpen(false);
    toast({
      title: "Support ticket created",
      description: "We'll get back to you shortly.",
      variant: "default",
    });
  };

  const accountBalance = 33.20;

  // Determine what content to show based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "refer":
        return <ReferFriend />;
      case "support":
      default:
        return (
          <div className="space-y-8">
            {/* Conversations Section */}
            <SupportConversations />
            
            {/* Support Tickets Section */}
            <div className="flex items-center justify-between mb-4">
              <SupportTickets />
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => setCreateTicketOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Create Support Ticket
              </Button>
            </div>
          </div>
        );
    }
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
                  <span className="text-sm font-bold text-green-600">US${accountBalance.toFixed(2)}</span>
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
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Create Ticket Dialog */}
      <CreateTicketDialog
        open={createTicketOpen}
        onOpenChange={setCreateTicketOpen}
        onSubmit={handleTicketSubmit}
      />
    </div>
  );
};

export default SupportPage;
