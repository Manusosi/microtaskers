
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter, Copy, Link as LinkIcon, Users, DollarSign, Send, UserPlus, Gift, ExternalLink, ChevronRight, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ReferFriend = () => {
  const [friends, setFriends] = useState([
    { firstName: "", email: "" },
    { firstName: "", email: "" },
    { firstName: "", email: "" },
  ]);
  const { toast } = useToast();
  
  // Generate a unique referral link based on the current domain
  const currentDomain = window.location.origin;
  const userReferralId = "13"; // This would be fetched from user's data in a real app
  const referralLink = `${currentDomain}/?ref=${userReferralId}`;
  
  const bbCode = `[url=${referralLink}]Join Microtaskers Ads today![/url]`;
  const htmlCode = `<a href="${referralLink}" target="_blank">Join Microtaskers Ads today!</a>`;
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} has been copied to clipboard.`,
    });
  };
  
  const handleFriendChange = (index: number, field: "firstName" | "email", value: string) => {
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
        description: "Please enter at least one friend's name and email address.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the invitations to the backend
    toast({
      title: "Invitations Sent!",
      description: `Sent invitations to ${validFriends.length} friends.`,
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Header with intro text */}
      <div className="flex items-center gap-3">
        <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
          <UserPlus className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">Refer a Friend</h2>
      </div>
      
      {/* Intro card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-7/12">
              <h3 className="text-lg font-medium mb-2 text-gray-800">How it works</h3>
              <p className="text-gray-700 mb-4">
                Tell your friends about Microtaskers Ads. We'll credit your account with a <span className="font-bold text-purple-600">$1.00</span> bonus once your friend's 
                account balance reaches <span className="font-bold text-gray-700">$20.00</span>.
              </p>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Share your unique link</h4>
                    <p className="text-gray-600 text-sm">Send your referral link to friends via email, social media, or any other way.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Friends sign up</h4>
                    <p className="text-gray-600 text-sm">Your friends create an account and start completing tasks.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Get rewarded</h4>
                    <p className="text-gray-600 text-sm">Earn $1.00 when your friend's account reaches $20.00 in earnings.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-5/12 bg-purple-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Your Stats</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Link Clicks</span>
                    <LinkIcon className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
                </div>
                
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Referrals</span>
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending</span>
                    <DollarSign className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 mt-1">$0.00</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-md shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">Earnings</span>
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mt-1">$0.00</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Referral Tools Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Gift className="text-purple-600" size={20} />
            Referral Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="link">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="link">Referral Link</TabsTrigger>
              <TabsTrigger value="email">Email Friends</TabsTrigger>
              <TabsTrigger value="code">HTML & BBCode</TabsTrigger>
            </TabsList>
            
            {/* Referral Link Tab */}
            <TabsContent value="link" className="space-y-4">
              <div>
                <Label htmlFor="ref-link" className="text-sm font-medium mb-2 block">Your unique referral link:</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-purple-50 border border-purple-100 p-3 rounded-md overflow-hidden">
                    <code className="text-purple-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis block" id="ref-link">
                      {referralLink}
                    </code>
                  </div>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="border-purple-200 hover:bg-purple-50 flex-shrink-0"
                    onClick={() => copyToClipboard(referralLink, "Referral link")}
                  >
                    <Copy className="w-4 h-4 text-purple-600" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 my-6">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-[#1877F2] text-white hover:bg-[#1864D2] border-[#1877F2]"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank')}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Share on Facebook
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-[#1DA1F2] text-white hover:bg-[#1A91DA] border-[#1DA1F2]"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Join%20Microtaskers%20Ads!`, '_blank')}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-purple-200 hover:bg-purple-50 text-purple-700"
                  onClick={() => {
                    window.open(`mailto:?subject=Join Microtaskers Ads&body=I've been using Microtaskers Ads and think you might like it too. Use my referral link to sign up: ${referralLink}`, '_blank');
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Link
                </Button>
              </div>
            </TabsContent>
            
            {/* Email Friends Tab */}
            <TabsContent value="email" className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                Enter your friends' details below to send them an invitation directly. Each will receive a personalized email with your referral link.
              </p>
              
              <div className="space-y-5">
                {friends.map((friend, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-700 mb-3">Friend #{index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`friend-${index}-name`} className="text-sm">
                          First Name
                          {index === 0 && <span className="ml-1 text-red-600">*</span>}
                        </Label>
                        <Input
                          id={`friend-${index}-name`}
                          value={friend.firstName}
                          onChange={(e) => handleFriendChange(index, "firstName", e.target.value)}
                          required={index === 0}
                          className="border-purple-200 focus-visible:ring-purple-400"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`friend-${index}-email`} className="text-sm">
                          Email Address
                          {index === 0 && <span className="ml-1 text-red-600">*</span>}
                        </Label>
                        <Input
                          id={`friend-${index}-email`}
                          type="email"
                          value={friend.email}
                          onChange={(e) => handleFriendChange(index, "email", e.target.value)}
                          required={index === 0}
                          className="border-purple-200 focus-visible:ring-purple-400"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleSendInvitations}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitations
                </Button>
              </div>
            </TabsContent>
            
            {/* HTML & BBCode Tab */}
            <TabsContent value="code" className="space-y-6">
              <div>
                <Label htmlFor="bb-code" className="text-sm font-medium mb-2 block">BBCode for forums:</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-purple-50 border border-purple-100 p-3 rounded-md overflow-auto">
                    <code className="text-purple-700 text-sm" id="bb-code">{bbCode}</code>
                  </div>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="border-purple-200 hover:bg-purple-50"
                    onClick={() => copyToClipboard(bbCode, "BBCode")}
                  >
                    <Copy className="w-4 h-4 text-purple-600" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="html-code" className="text-sm font-medium mb-2 block">HTML for websites:</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-purple-50 border border-purple-100 p-3 rounded-md overflow-auto">
                    <code className="text-purple-700 text-sm" id="html-code">{htmlCode}</code>
                  </div>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="border-purple-200 hover:bg-purple-50"
                    onClick={() => copyToClipboard(htmlCode, "HTML")}
                  >
                    <Copy className="w-4 h-4 text-purple-600" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* My Referrals section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="text-purple-600" size={20} />
            My Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 p-6 rounded-md border border-purple-100 text-center">
            <p className="text-purple-600 mb-2">
              You have not received any referrals at this time.
            </p>
            <p className="text-sm text-gray-600">
              Share your referral link with friends to start earning rewards!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
