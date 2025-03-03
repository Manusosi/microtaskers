import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Users, 
  Trophy,
  Globe,
  Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const AboutUs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useState(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUserRole(session.user.user_metadata.role);
      }
    };
    
    checkSession();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
    
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const handleReferralClick = () => {
    if (isLoggedIn) {
      if (userRole === 'tasker') {
        navigate('/dashboard');
      } else {
        navigate('/advertiser-dashboard');
      }
    } else {
      navigate('/signup/tasker');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50 flex flex-col">
      <Navigation />
      
      <div className="flex-grow">
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-purple-800 mb-6">
                About Microtaskers
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Connecting global talent with micro-opportunities for a more accessible future of work
              </p>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png" 
                  alt="Microtaskers Logo"
                  className="h-20 md:h-28"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl blur-3xl opacity-40"></div>
                  <img 
                    src="/lovable-uploads/be12698a-21e4-4459-a590-8aa3b6ec273e.png" 
                    alt="Our Mission" 
                    className="relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  At Microtaskers, we're revolutionizing the gig economy by breaking down barriers to entry 
                  and creating accessible income opportunities for everyone, everywhere. We believe that everyone 
                  should have the chance to earn income, regardless of location, background, or specialized skills.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our platform connects people with simple, quick-to-complete tasks that can be done from anywhere, 
                  allowing them to earn money on their own schedule. We're creating a future where financial 
                  inclusion is the norm, not the exception.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Microtaskers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8 text-[#8511b4]" />
                  </div>
                  <CardTitle className="text-xl">Global Access</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Work from anywhere in the world with just an internet connection.
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-[#8511b4]" />
                  </div>
                  <CardTitle className="text-xl">Quick Payments</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Weekly payouts with multiple payment options available worldwide.
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-[#8511b4]" />
                  </div>
                  <CardTitle className="text-xl">Community Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Join thousands of workers and businesses in our thriving community.
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Trophy className="w-8 h-8 text-[#8511b4]" />
                  </div>
                  <CardTitle className="text-xl">Reward System</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Earn bonuses and unlock higher-paying tasks as you build your reputation.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                    <CardDescription>We'd love to hear from you. Fill out the form below.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea 
                          id="message" 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help?" 
                          className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                          required 
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-[#8511b4] hover:bg-[#7a0fa6]">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <Mail className="w-5 h-5 text-[#8511b4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">support@microtaskers.work</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <Phone className="w-5 h-5 text-[#8511b4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">+1 (323) 916-4947</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <MapPin className="w-5 h-5 text-[#8511b4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">9607 Lavender Mis Lane, Katy TX, 77494</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <Building className="w-5 h-5 text-[#8511b4]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Office Hours</p>
                        <p className="font-medium">Monday - Friday: 9:00 AM - 5:00 PM (CST)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-xl">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img 
                      src="/lovable-uploads/c9db11a6-bd97-44ba-9970-d990ce279b56.png" 
                      alt="Referral Program" 
                      className="w-40 h-40 object-contain"
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Refer & Earn Program</h3>
                      <p className="text-gray-600 mb-4">
                        Invite your friends to join Microtaskers! When they sign up using your referral link, 
                        you'll get a $5 bonus and 5% lifetime commission on their earnings.
                      </p>
                      <Button 
                        className="bg-[#8511b4] hover:bg-[#7a0fa6]"
                        onClick={handleReferralClick}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Get Your Referral Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
