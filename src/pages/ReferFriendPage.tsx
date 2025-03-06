
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  BellDot, 
  Menu,
  UserPlus,
  Copy,
  Share2,
  Mail,
  Gift,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { useToast } from "@/hooks/use-toast";

const ReferFriendPage = () => {
  const [activeMenu, setActiveMenu] = useState("refer");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [referralId, setReferralId] = useState("13"); // This would be unique per user
  const [friends, setFriends] = useState([
    { firstName: "", email: "" },
    { firstName: "", email: "" },
    { firstName: "", email: "" },
    { firstName: "", email: "" },
    { firstName: "", email: "" },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get the current domain
  const domain = window.location.origin;
  const referralLink = `${domain}/signup?ref=${referralId}`;
  const forumCode = `[url='${referralLink}']Join Microtaskers today![/url]`;
  const htmlCode = `<a href='${referralLink}' target='_blank'>Join Microtaskers today!</a>`;

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Your referral link has been copied to clipboard.",
      variant: "default",
    });
  };

  const handleFriendChange = (index, field, value) => {
    const newFriends = [...friends];
    newFriends[index] = { ...newFriends[index], [field]: value };
    setFriends(newFriends);
  };

  const handleSendInvitations = () => {
    // Filter out empty entries
    const validFriends = friends.filter(friend => friend.firstName && friend.email);
    
    if (validFriends.length === 0) {
      toast({
        title: "No valid entries",
        description: "Please enter at least one friend's name and email.",
        variant: "destructive",
      });
      return;
    }

    // Here you would send the invitations via your backend
    console.log("Sending invitations to:", validFriends);
    
    toast({
      title: "Invitations sent!",
      description: `Invitations sent to ${validFriends.length} friend${validFriends.length > 1 ? 's' : ''}.`,
      variant: "default",
    });
  };

  const accountBalance = 33.20;

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
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-8 mb-8 text-white shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <UserPlus className="h-12 w-12" />
                <h1 className="text-3xl font-bold">Refer a Friend</h1>
              </div>
              <p className="text-lg opacity-90">
                Tell your friends about Microtaskers. We'll credit your account with <span className="font-bold">US$1.00</span> bonus
                once your friend's account balance reaches <span className="font-bold">US$20.00</span>. Use your unique referral link to refer your friends.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Referral Link Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Share2 className="mr-2 h-5 w-5 text-purple-600" />
                    Your Referral Link
                  </CardTitle>
                  <CardDescription>Share this link with your friends to earn bonuses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex">
                    <Input
                      value={referralLink}
                      readOnly
                      className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
                    />
                    <Button 
                      onClick={() => copyToClipboard(referralLink)}
                      className="rounded-l-none bg-purple-600 hover:bg-purple-700"
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </div>
                  
                  <div>
                    <Label>BBCode for forums:</Label>
                    <Textarea
                      value={forumCode}
                      readOnly
                      className="mt-1 text-sm font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label>HTML for websites:</Label>
                    <Textarea
                      value={htmlCode}
                      readOnly
                      className="mt-1 text-sm font-mono"
                    />
                  </div>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <Button onClick={() => copyToClipboard(referralLink)} variant="outline" className="flex-1">
                      <Copy className="h-4 w-4 mr-2" /> Copy Link
                    </Button>
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        window.open(`https://twitter.com/intent/tweet?text=Join%20me%20on%20Microtaskers%20and%20earn%20money%20for%20tasks!%20${encodeURIComponent(referralLink)}`, '_blank')
                      }}
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.9-2.4c-.8.5-1.7.9-2.6 1a4.3 4.3 0 0 0-7.3 4c-3.6-.2-6.8-2-9-4.6a4.2 4.2 0 0 0 1.3 5.7 4.3 4.3 0 0 1-2-.5v.1c0 2 1.5 3.8 3.4 4.2a4.3 4.3 0 0 1-2 .1 4.3 4.3 0 0 0 4 3 8.7 8.7 0 0 1-5.3 1.8c-.3 0-.7 0-1-.1a12.2 12.2 0 0 0 6.6 1.9c7.9 0 12.2-6.5 12.2-12.2v-.6c.8-.6 1.5-1.3 2.1-2.2z"></path>
                      </svg>
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-purple-600" />
                    Your Referral Stats
                  </CardTitle>
                  <CardDescription>Track how your referrals are performing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-gray-700">0</div>
                      <div className="text-sm text-gray-500 mt-1">Referral link clicks</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-gray-700">0</div>
                      <div className="text-sm text-gray-500 mt-1">Referrals</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-purple-600">$0.00</div>
                      <div className="text-sm text-gray-500 mt-1">Referrals pending earnings</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-600">$0.00</div>
                      <div className="text-sm text-gray-500 mt-1">Referrals paid earnings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Send Invitations Section */}
            <Card className="shadow-md mb-8">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-t-xl">
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-6 w-6" />
                  Send Invitations
                </CardTitle>
                <CardDescription className="text-white opacity-90">
                  Refer your friends and get $1.00! It's easy. Enter up to 5 email addresses of your friends.
                  Each friend will receive a link to join us and you will receive $1.00 per each referred member.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {friends.map((friend, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`friend-${index+1}-name`}>
                          Friend #{index+1} First Name: {index === 0 && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                          id={`friend-${index+1}-name`}
                          value={friend.firstName}
                          onChange={(e) => handleFriendChange(index, 'firstName', e.target.value)}
                          required={index === 0}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`friend-${index+1}-email`}>
                          Friend #{index+1} Email Address: {index === 0 && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                          id={`friend-${index+1}-email`}
                          type="email"
                          value={friend.email}
                          onChange={(e) => handleFriendChange(index, 'email', e.target.value)}
                          required={index === 0}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  onClick={handleSendInvitations}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-5 text-lg flex items-center"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send Invitations
                </Button>
              </CardFooter>
            </Card>

            {/* My Referrals Section */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-purple-600" />
                  My Referrals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-blue-800">
                  You have not received any referrals at this time.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferFriendPage;
