
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdvertiserOptionsDialog from "@/components/dialogs/AdvertiserOptionsDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  reward: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const faqItems: FaqItem[] = [
    {
      question: "What is Microtaskers?",
      answer: "Microtaskers is a platform that connects people who want to earn money by completing simple tasks with businesses that need help with small online jobs. You can work from anywhere in the world at your own pace."
    },
    {
      question: "How much can I earn?",
      answer: "Earnings vary based on the type and complexity of tasks. Most microtasks pay between $0.10 to $5 per task. Active users typically earn $200-$500 per month working part-time, but earnings can be higher depending on your dedication and the tasks you choose."
    },
    {
      question: "How do I get paid?",
      answer: "We offer multiple payment methods including PayPal, direct bank transfer, cryptocurrency, and gift cards. Payments are processed weekly for all completed and approved tasks. The minimum payout threshold is $10."
    },
    {
      question: "What types of tasks can I do?",
      answer: "Tasks include social media engagement, writing reviews, account creation, data entry, content moderation, surveys, app testing, and many more. New task categories are added regularly based on demand."
    },
    {
      question: "Is this available worldwide?",
      answer: "Yes! Microtaskers is available globally. We have tasks for workers from all countries, though some tasks may be region-specific. We support multiple languages and payment methods that work internationally."
    }
  ];

  useEffect(() => {
    // Fetch tasks from the API
    axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Failed to load tasks.",
          variant: "destructive",
        });
      });
  }, []);

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
      navigate('/dashboard');
    } else {
      navigate('/advertiser-dashboard');
    }
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('how-it-works');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50">
      <nav className="sticky top-0 z-50 border-b shadow-sm bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png" alt="Microtaskers Logo" className="h-12" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" onClick={scrollToHowItWorks} className="text-gray-700 hover:text-gray-900 font-medium">How it works</a>
              <a href="#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</a>
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
              <a href="#how-it-works" onClick={scrollToHowItWorks} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">How it works</a>
              <a href="#faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">FAQ</a>
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

      <section className="relative container mx-auto px-6 py-16 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#e9d5ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in md:text-left text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-purple-800">
                Start Earning with <br/> <span className="text-[#8511b4]">Microtasks</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-xl">
                Join our community of global workers completing simple tasks and earning money from anywhere
                in the world. Start your journey today.
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                <Link to="/signup/tasker">
                  <Button 
                    className="bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full px-8 py-6 text-lg shadow-lg shadow-purple-200 transition-all hover:shadow-purple-300 hover:-translate-y-1 w-full md:w-auto"
                  >
                    Start Earning Now
                  </Button>
                </Link>
                <AdvertiserOptionsDialog 
                  trigger={
                    <Button 
                      variant="outline" 
                      className="rounded-full px-8 py-6 text-lg border-[#8511b4] text-[#8511b4] hover:bg-purple-50 transition-all hover:-translate-y-1 w-full md:w-auto"
                    >
                      Start as an Advertiser
                    </Button>
                  }
                />
              </div>
            </div>

            <div className="relative animate-fade-in order-first md:order-last">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <img 
                src="/lovable-uploads/be12698a-21e4-4459-a590-8aa3b6ec273e.png" 
                alt="Person working on laptop" 
                className="relative w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-700 ease-in-out animate-float"
                style={{
                  animation: "float 6s ease-in-out infinite"
                }}
              />
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-200 rounded-full animate-bounce delay-100"></div>
              <div className="absolute top-1/2 -right-4 w-6 h-6 bg-purple-300 rounded-full animate-bounce delay-300"></div>
              <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/80 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Easy Tasks</h3>
              <p className="text-gray-600">Complete simple microtasks in minutes and earn rewards instantly</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Quick Payments</h3>
              <p className="text-gray-600">Get paid weekly through multiple payment methods worldwide</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Work Anywhere</h3>
              <p className="text-gray-600">Access tasks from any device, anywhere in the world</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">I want to complete tasks and earn money</h3>
            <p className="text-gray-600 mb-6">Find tasks and get paid for your work.</p>
            <Link to="/signup/tasker">
              <Button variant="outline" className="w-full rounded-full">Register as a Tasker</Button>
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">I want to post tasks and hire</h3>
            <p className="text-gray-600 mb-6">Post tasks and hire professionals.</p>
            <AdvertiserOptionsDialog 
              trigger={
                <Button className="w-full bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full">Register as an Advertiser</Button>
              }
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gradient-to-br from-purple-50 to-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-[#8511b4] mb-4">How it works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Complete tasks in three simple steps and start earning money from anywhere in the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#8511b4] to-purple-400 transform -translate-y-1/2">
              <div className="absolute right-0 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8511b4] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-semibold text-xl group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">SEARCH JOBS</h3>
              <p className="text-gray-600 text-center">Browse through our extensive list of available microtasks. Find tasks that match your skills and interests.</p>
              <div className="absolute -bottom-3 right-4 md:block hidden">
                <ArrowRight className="w-6 h-6 text-[#8511b4] animate-pulse" />
              </div>
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in animation-delay-200">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8511b4] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-semibold text-xl group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">APPLY</h3>
              <p className="text-gray-600 text-center">Select tasks you want to complete and submit your application. Our system matches you with the best opportunities.</p>
              <div className="absolute -bottom-3 right-4 md:block hidden">
                <ArrowRight className="w-6 h-6 text-[#8511b4] animate-pulse" />
              </div>
            </div>

            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in animation-delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8511b4] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-semibold text-xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">GET PAID</h3>
              <p className="text-gray-600 text-center">Complete tasks successfully and receive payment directly to your account. Enjoy weekly payouts and flexible payment options.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/signup/tasker">
              <Button 
                className="bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full px-8 py-6 text-lg shadow-lg shadow-purple-200 transition-all hover:shadow-purple-300 hover:-translate-y-1"
              >
                Start Earning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-[#8511b4] mb-4">Find Your Jobs Easily</h2>
            <div className="w-24 h-1 bg-[#8511b4] mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Latest Categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Job Category 1 */}
            <div className="group h-64 [perspective:1000px] animate-fade-in">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">4</span>
                    <img src="/lovable-uploads/b461bd74-8623-43b9-b1fb-3d3b5cc027f1.png" alt="Pay Per View" className="w-24 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Pay Per View</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Get paid to view articles and content online. Easy tasks with quick payments.</p>
                </div>
              </div>
            </div>

            {/* Job Category 2 */}
            <div className="group h-64 [perspective:1000px] animate-fade-in animation-delay-100">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">4</span>
                    <img src="/lovable-uploads/c1303b64-1aa3-4000-be21-705f91cba43b.png" alt="Youtube Subscribe" className="w-36 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Follow, Subscribe</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Earn by following and subscribing to various social media channels and content creators.</p>
                </div>
              </div>
            </div>

            {/* Job Category 3 */}
            <div className="group h-64 [perspective:1000px] animate-fade-in animation-delay-200">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">2</span>
                    <img src="/lovable-uploads/b0bfd66e-cfcf-47b7-9ce9-68dda7d7b542.png" alt="Create Account" className="w-24 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Create Account</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Make money by creating accounts on various platforms and completing basic setup tasks.</p>
                </div>
              </div>
            </div>

            {/* Job Category 4 */}
            <div className="group h-64 [perspective:1000px] animate-fade-in animation-delay-300">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">2</span>
                    <img src="/lovable-uploads/c52530cf-29b3-46cf-bbdc-2853cd6fb608.png" alt="Google Review" className="w-36 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Google Review</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Share your honest experience and get paid for writing Google reviews for businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Section - Restored */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="order-2 md:order-1">
              <img 
                src="/lovable-uploads/1605810230434-7631ac76ec81.png" 
                alt="Refer friends and earn" 
                className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Refer Friends & Earn More</h2>
              <div className="w-20 h-1 bg-[#8511b4] rounded-full"></div>
              <p className="text-lg text-gray-600">
                Share Microtaskers with your friends and earn 5% of their earnings for life! 
                The more friends you invite, the more passive income you generate.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">$5 Sign-up Bonus</h3>
                  <p className="text-gray-600">For every friend who joins using your referral link</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">5% Lifetime</h3>
                  <p className="text-gray-600">Commission on all your referrals' earnings forever</p>
                </div>
              </div>
              <Button 
                className="bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full px-8 py-3 text-white font-medium"
              >
                Get Your Referral Link
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-[#8511b4] mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#8511b4] mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Everything you need to know about Microtaskers</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border-b border-gray-200 last:border-0"
              >
                <button
                  className="flex justify-between items-center w-full py-6 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-medium text-gray-900">{item.question}</h3>
                  <div className="text-purple-700">
                    {openFaqIndex === index ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/signup/tasker">
              <Button 
                className="bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full px-8 py-3 text-lg shadow-md shadow-purple-100 transition-all hover:shadow-purple-200"
              >
                Start Earning Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with white background and faded brand color gradient */}
      <footer className="bg-gradient-to-b from-white to-purple-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo only */}
            <div className="col-span-1">
              <div className="flex items-center mb-6 justify-center md:justify-start">
                <img
                  src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                  alt="Microtaskers Logo"
                  className="h-12"
                />
              </div>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors text-purple-800"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors text-purple-800"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors text-purple-800"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center md:text-left">Quick Links</h3>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <Link to="/signup/tasker" className="text-gray-600 hover:text-purple-800 transition-colors">Get Started</Link>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-600 hover:text-purple-800 transition-colors">How It Works</a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-600 hover:text-purple-800 transition-colors">FAQ</a>
                </li>
                <li>
                  <Link to="/jobs" className="text-gray-600 hover:text-purple-800 transition-colors">Browse Jobs</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-purple-800 transition-colors">About Us</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center md:text-left">Categories</h3>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <Link to="/category/social-media" className="text-gray-600 hover:text-purple-800 transition-colors">Social Media</Link>
                </li>
                <li>
                  <Link to="/category/reviews" className="text-gray-600 hover:text-purple-800 transition-colors">Reviews</Link>
                </li>
                <li>
                  <Link to="/category/account-creation" className="text-gray-600 hover:text-purple-800 transition-colors">Account Creation</Link>
                </li>
                <li>
                  <Link to="/category/data-entry" className="text-gray-600 hover:text-purple-800 transition-colors">Data Entry</Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center md:text-left">Newsletter</h3>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-[#8511b4] hover:bg-[#7a0fa6] text-white font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Microtaskers. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
