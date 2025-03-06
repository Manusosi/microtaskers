
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter, Copy, Link, Users, DollarSign, Send, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const ReferFriend = () => {
  const [friends, setFriends] = useState([
    { firstName: "", email: "" },
    { firstName: "", email: "" },
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
      {/* Intro Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
            <UserPlus className="w-6 h-6 mr-2 text-purple-600" />
            Refer a Friend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Tell your friends about Microtaskers Ads. We'll credit your account with a <span className="font-bold text-green-600">$1.00</span> bonus once your friend's 
            account balance reaches <span className="font-bold text-gray-700">$20.00</span>. Use your unique referral link to refer your friends.
          </p>
        </CardContent>
      </Card>
      
      {/* Referral Link Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium text-gray-800">Your referral link:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-3 border rounded-md bg-gray-50">
              <code className="text-sm">{referralLink}</code>
            </div>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(referralLink, "Referral link")}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-[#1877F2] text-white hover:bg-[#1864D2]"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank')}
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              className="bg-[#1DA1F2] text-white hover:bg-[#1A91DA]"
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Join%20Microtaskers%20Ads!`, '_blank')}
            >
              <Twitter className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">BBCode for forums:</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-3 border rounded-md bg-gray-50">
                  <code className="text-sm">{bbCode}</code>
                </div>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(bbCode, "BBCode")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">HTML for websites:</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-3 border rounded-md bg-gray-50">
                  <code className="text-sm">{htmlCode}</code>
                </div>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(htmlCode, "HTML")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-gray-100">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
              <Link className="w-4 h-4 mr-1" />
              referral link clicks
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-100">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              referrals
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-100">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold">$0.00</div>
            <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-1" />
              referrals pending earnings
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold">$0.00</div>
            <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-1" />
              referrals paid earnings
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Send Invitations Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-medium text-gray-800">
            <Send className="w-5 h-5 mr-2 text-purple-600" />
            Send Invitations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Refer your friends and get <span className="font-bold text-green-600">$1.00</span>! It's easy. Enter up to 5 email addresses of your friends. 
            Each friend will receive a link to join us and you will receive <span className="font-bold text-green-600">$1.00</span> per each referred member.
          </p>
          
          <div className="space-y-4">
            {friends.map((friend, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor={`friend-${index}-name`} className="text-sm">
                    Friend #{index + 1} First Name:
                    {index === 0 && <span className="ml-1 text-red-600">*</span>}
                  </Label>
                  <Input
                    id={`friend-${index}-name`}
                    value={friend.firstName}
                    onChange={(e) => handleFriendChange(index, "firstName", e.target.value)}
                    required={index === 0}
                  />
                </div>
                <div>
                  <Label htmlFor={`friend-${index}-email`} className="text-sm">
                    Friend #{index + 1} Email Address:
                    {index === 0 && <span className="ml-1 text-red-600">*</span>}
                  </Label>
                  <Input
                    id={`friend-${index}-email`}
                    type="email"
                    value={friend.email}
                    onChange={(e) => handleFriendChange(index, "email", e.target.value)}
                    required={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSendInvitations}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Invitations
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* My Referrals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-medium text-gray-800">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            My Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center bg-blue-50 rounded-md">
            <p className="text-sm text-blue-600">
              You have not received any referrals at this time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
