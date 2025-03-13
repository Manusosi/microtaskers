import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  BellDot, 
  Menu,
  MessageCircle,
  TicketCheck,
  PlusCircle,
  LifeBuoy,
  Search,
  HelpCircle,
  MessageSquare,
  BookOpen,
  FileQuestion,
  ChevronRight,
  Mail,
  Phone,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { SupportConversations } from "@/components/support/SupportConversations";
import { SupportTickets } from "@/components/support/SupportTickets";
import { CreateTicketDialog } from "@/components/support/CreateTicketDialog";
import { ReferFriend } from "@/components/dashboard/ReferFriend";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupportPage = () => {
  const [activeMenu, setActiveMenu] = useState("support");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSubmitTicket = async () => {
    const ticketData = {
      subject,
      description,
      urgency,
      timestamp: new Date().toISOString(),
      userId: session?.user.id || 'anonymous',
      status: 'Open',
    };
    
    setTicketCreated(true);
    setSubject('');
    setDescription('');
    setUrgency('medium');
  };

  const accountBalance = 33.20;

  const faqItems = [
    { 
      title: "How do I get paid for completed tasks?", 
      description: "Payment is processed automatically after your task is approved. Funds will appear in your account balance, which you can withdraw at any time."
    },
    {
      title: "What if my task is rejected?",
      description: "If your task is rejected, you'll receive feedback explaining why. You can review the feedback and try again if the job allows resubmissions."
    },
    {
      title: "How long does it take to approve a task?",
      description: "Most tasks are reviewed within 24-48 hours after submission. Some tasks may take longer depending on the advertiser's schedule."
    },
    {
      title: "What payment methods are available for withdrawal?",
      description: "We support withdrawal via PayPal, bank transfer, and cryptocurrency for most regions. The available methods depend on your location."
    }
  ];

  // Determine what content to show based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "refer":
        return <ReferFriend />;
      case "support":
      default:
        return (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Support Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold">How can we help you?</h1>
                  <p className="mt-2 text-purple-100">Find answers to your questions or contact our support team</p>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="secondary" 
                    onClick={() => setCreateTicketOpen(true)}
                    className="bg-white text-purple-700 hover:bg-gray-100"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Ticket
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 relative">
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  className="pl-10 pr-4 py-3 w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white focus:ring-1 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              </div>
            </div>
            
            {/* Quick Help Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" /> Knowledge Base
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Browse our comprehensive guides and tutorials</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-blue-500 p-0 h-auto">
                    Explore <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <FileQuestion className="h-5 w-5 mr-2 text-green-500" /> FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Find answers to commonly asked questions</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-green-500 p-0 h-auto">
                    View FAQs <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="h-5 w-5 mr-2 text-purple-500" /> Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Get in touch with our support team directly</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-purple-500 p-0 h-auto">
                    Contact <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Main Support Content */}
            <Tabs defaultValue="tickets" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="tickets" className="flex-1">My Support Tickets</TabsTrigger>
                <TabsTrigger value="faq" className="flex-1">Frequently Asked Questions</TabsTrigger>
                <TabsTrigger value="contact" className="flex-1">Contact Methods</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tickets" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <TicketCheck className="h-5 w-5 mr-2 text-purple-600" /> My Support Tickets
                    </CardTitle>
                    <CardDescription>
                      View and manage your support tickets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <LifeBuoy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="mb-2">You do not have any support tickets at this time.</p>
                      <p className="text-sm text-gray-400 mb-6">If you have any questions or issues, please create a new support ticket.</p>
                      <Button 
                        onClick={() => setCreateTicketOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Ticket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <HelpCircle className="h-5 w-5 mr-2 text-purple-600" /> Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Quick answers to common questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {faqItems.map((faq, index) => (
                        <div key={index} className="py-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.title}</h3>
                          <p className="text-gray-600">{faq.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View More FAQs <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Phone className="h-5 w-5 mr-2 text-purple-600" /> Contact Methods
                    </CardTitle>
                    <CardDescription>
                      Different ways to reach our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-medium">Email Support</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">For general inquiries and non-urgent issues</p>
                        <p className="text-sm font-medium">support@taskpro.com</p>
                        <p className="text-xs text-gray-500 mt-1">Response time: 24-48 hours</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <MessageSquare className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="font-medium">Live Chat</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">For immediate assistance during business hours</p>
                        <p className="text-xs text-gray-500 mt-1">Available: Mon-Fri, 9AM-5PM EST</p>
                        <Button className="mt-2 bg-green-600 hover:bg-green-700">
                          Start Chat <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
        onSubmit={handleSubmitTicket}
      />
    </div>
  );
};

export default SupportPage;
