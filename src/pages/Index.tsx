<lov-code>
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
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

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

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

            <div className="group h-64 [perspective:1000px] animate-fade-in animation-delay-400">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">1</span>
                    <img src="/lovable-uploads/526eabc7-4308-4d23-814f-b7735205a7b6.png" alt="Facebook" className="w-24 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Facebook</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Earn by engaging with Facebook content, pages, and communities.</p>
                </div>
              </div>
            </div>

            <div className="group h-64 [perspective:1000px] animate-fade-in animation-delay-500">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">0</span>
                    <img src="/lovable-uploads/8787b530-b72e-45ce-a0b1-68bfedd16ec6.png" alt="Instagram" className="w-24 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Instagram</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Get paid to engage with Instagram posts, stories, and content.</p>
                </div>
              </div>
            </div>

            <div className="group h-64 [perspective:1000px] animate-fade-in animation-delay-600">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">0</span>
                    <img src="/lovable-uploads/da7d2f0c-d766-4666-a581-355263ac9092.png" alt="Pay Per Lead" className="w-24 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Pay Per Lead</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Earn commission by referring potential customers to businesses.</p>
                </div>
              </div>
            </div>

            <div className="
