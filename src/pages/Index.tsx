import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b shadow-sm bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png" alt="Microtaskers Logo" className="h-12" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How it works</Link>
              <Link to="/resources" className="text-gray-700 hover:text-gray-900 font-medium">Resources</Link>
              <Link to="/jobs" className="text-gray-700 hover:text-gray-900 font-medium">Jobs</Link>
              <Link to="/games" className="text-gray-700 hover:text-gray-900 font-medium">Games</Link>
              <Link to="/cashback" className="text-gray-700 hover:text-gray-900 font-medium">Cashback</Link>
              <Link to="/shops" className="text-gray-700 hover:text-gray-900 font-medium">Shops</Link>
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
                    <Link 
                      to="/signup/advertiser" 
                      className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold mb-2">I want to post tasks and hire</h3>
                      <p className="text-sm text-gray-600">Post tasks and hire professionals.</p>
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 animate-fade-in">
              <Link to="/how-it-works" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">How it works</Link>
              <Link to="/resources" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Resources</Link>
              <Link to="/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Jobs</Link>
              <Link to="/games" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Games</Link>
              <Link to="/cashback" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Cashback</Link>
              <Link to="/shops" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Shops</Link>
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
                    <Link 
                      to="/signup/advertiser" 
                      className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold mb-2">I want to post tasks and hire</h3>
                      <p className="text-sm text-gray-600">Post tasks and hire professionals.</p>
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Updated with modern design and animation */}
      <section className="relative container mx-auto px-6 py-16 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#e9d5ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
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
                    Start as a Tasker
                  </Button>
                </Link>
                <Link to="/signup/advertiser">
                  <Button 
                    variant="outline" 
                    className="rounded-full px-8 py-6 text-lg border-[#8511b4] text-[#8511b4] hover:bg-purple-50 transition-all hover:-translate-y-1 w-full md:w-auto"
                  >
                    Start as an Advertiser
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Image with animations */}
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
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-200 rounded-full animate-bounce delay-100"></div>
              <div className="absolute top-1/2 -right-4 w-6 h-6 bg-purple-300 rounded-full animate-bounce delay-300"></div>
              <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Registration Section */}
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
            <Link to="/signup/advertiser">
              <Button className="w-full bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full">Register as an Advertiser</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
          <p className="text-center text-gray-600 mb-12">Complete tasks in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold">
                1
              </div>
              <h3 className="font-semibold">SEARCH JOBS</h3>
              <p className="text-gray-600 mt-2">Browse available tasks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold">
                2
              </div>
              <h3 className="font-semibold">APPLY</h3>
              <p className="text-gray-600 mt-2">Select tasks you want to complete</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold">
                3
              </div>
              <h3 className="font-semibold">GET PAID</h3>
              <p className="text-gray-600 mt-2">Complete tasks and earn money</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
