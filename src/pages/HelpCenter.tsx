
import Navigation from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-purple-800 mb-6">
              Help Center
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10">
              Find resources, guides, and answers to help you get the most from Microtaskers
            </p>
            
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search for help..." 
                  className="pl-10 pr-4 py-6 text-lg rounded-full"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" />
                <Button className="absolute right-1.5 top-1.5 bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Help Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Everything you need to know to begin with Microtaskers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Creating Your Account</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Setting Up Your Profile</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Finding Your First Task</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Getting Paid</Link></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>Account & Settings</CardTitle>
                <CardDescription>Manage your account, privacy and security</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Updating Your Information</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Security Settings</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Payment Methods</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Notification Preferences</Link></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>Tasks & Earnings</CardTitle>
                <CardDescription>Learn about tasks, completion and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Task Categories Explained</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Task Completion Guidelines</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Earning Potential</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Payment Schedule</Link></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Solutions to common issues</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Login Problems</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Task Submission Issues</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Payment Delays</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Account Recovery</Link></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>For Advertisers</CardTitle>
                <CardDescription>Resources for businesses posting tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Creating Effective Tasks</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Pricing Guidelines</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Reviewing Submissions</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Billing Information</Link></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>Community & Referrals</CardTitle>
                <CardDescription>Build your network and earn more</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Referral Program Details</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Community Guidelines</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Success Stories</Link></li>
                  <li className="text-[#8511b4] hover:underline"><Link to="#">Earning Maximization Tips</Link></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Contact Support */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-8">Our support team is ready to assist you with any questions or issues.</p>
          <Link to="/contact">
            <Button className="bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full px-8 py-6">Contact Support</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
