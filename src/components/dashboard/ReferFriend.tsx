
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter, Copy, Link, Users, DollarSign, Send, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      {/* Header with intro text */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
          <UserPlus className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">Refer a Friend</h2>
      </div>
      
      {/* Intro card */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
        <p className="text-gray-700">
          Tell your friends about Microtaskers Ads. We'll credit your account with a <span className="font-bold text-green-600">$1.00</span> bonus once your friend's 
          account balance reaches <span className="font-bold text-gray-700">$20.00</span>. Use your unique referral link to refer your friends.
        </p>
      </div>
      
      {/* Referral link section */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-700">Your referral link:</h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-gray-100 border border-gray-200 p-3 rounded-md">
            <code>{referralLink}</code>
          </div>
          <Button 
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(referralLink, "Referral link")}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Social share buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <Button
            size="icon"
            className="bg-[#1877F2] text-white hover:bg-[#1864D2]"
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank')}
          >
            <Facebook className="w-4 h-4" />
          </Button>
          <Button 
            size="icon"
            className="bg-[#1DA1F2] text-white hover:bg-[#1A91DA]"
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Join%20Microtaskers%20Ads!`, '_blank')}
          >
            <Twitter className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* BBCode and HTML sections */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-700">BBCode for forums:</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 border border-gray-200 p-3 rounded-md">
              <code>{bbCode}</code>
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
          <h3 className="text-lg font-medium mb-2 text-gray-700">HTML for websites:</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 border border-gray-200 p-3 rounded-md">
              <code>{htmlCode}</code>
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
      
      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-200 p-4 rounded-md flex flex-col items-center">
          <span className="text-2xl font-bold">0</span>
          <div className="flex items-center text-sm text-gray-600">
            <Link className="w-4 h-4 mr-1" />
            referral link clicks
          </div>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-md flex flex-col items-center">
          <span className="text-2xl font-bold">0</span>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            referrals
          </div>
        </div>
        
        <div className="bg-amber-100 p-4 rounded-md flex flex-col items-center">
          <span className="text-2xl font-bold">$0.00</span>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            referrals pending
          </div>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-md flex flex-col items-center">
          <span className="text-2xl font-bold">$0.00</span>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            referrals paid
          </div>
        </div>
      </div>
      
      {/* Send Invitations section */}
      <div className="pt-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Send className="text-gray-600" size={24} />
          <h2 className="text-2xl font-semibold text-gray-700">Send Invitations</h2>
        </div>
        
        <p className="text-center mb-6">
          Refer your friends and get <span className="font-bold text-green-600">$1.00</span>! It's easy. Enter up to 5 email addresses of your friends. 
          Each friend will receive a link to join us and you will receive <span className="font-bold text-green-600">$1.00</span> per each referred member.
        </p>
        
        <div className="space-y-4">
          {friends.map((friend, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
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
        
        <div className="flex justify-center mt-6">
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSendInvitations}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Invitations
          </Button>
        </div>
      </div>
      
      {/* My Referrals section */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
            <Users className="text-white" size={16} />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">My Referrals</h2>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-center">
          <p className="text-blue-600">
            You have not received any referrals at this time.
          </p>
        </div>
      </div>
    </div>
  );
};
