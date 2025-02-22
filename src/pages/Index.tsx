import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
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

      {/* How it works Section - Enhanced with animations and better design */}
      <section id="how-it-works" className="bg-gradient-to-br from-purple-50 to-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-[#8511b4] mb-4">How it works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Complete tasks in three simple steps and start earning money from anywhere in the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting Lines (visible on desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#8511b4] to-purple-400 transform -translate-y-1/2">
              <div className="absolute right-0 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            {/* Step 1 */}
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

            {/* Step 2 */}
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

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in animation-delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8511b4] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-semibold text-xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">GET PAID</h3>
              <p className="text-gray-600 text-center">Complete tasks successfully and receive payment directly to your account. Enjoy weekly payouts and flexible payment options.</p>
            </div>
          </div>

          {/* Call to Action */}
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

      {/* Latest Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Jobs Easily</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Latest Categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* PPV Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">4</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="Pay Per View" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Pay Per View</h3>
            </div>

            {/* Follow, Subscribe Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in animation-delay-100">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">4</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="Follow, Subscribe" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Follow, Subscribe</h3>
            </div>

            {/* Create Account Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in animation-delay-200">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">2</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="Create Account" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Create Account</h3>
            </div>

            {/* Google Review Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in animation-delay-300">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">2</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="Google Review" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Google Review</h3>
            </div>

            {/* Facebook Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in animation-delay-400">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">1</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="Facebook" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Facebook</h3>
            </div>

            {/* Instagram Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in animation-delay-500">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">0</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="Instagram" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Instagram</h3>
            </div>

            {/* Pay Per Lead Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in animation-delay-600">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">0</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="Pay Per Lead" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Pay Per Lead</h3>
            </div>

            {/* TikTok Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group animate-fade-in animation-delay-700">
              <div className="relative mb-4">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">0</span>
                <img src="/lovable-uploads/436e807f-4584-43d0-9a0a-cdad4eba2023.png" alt="TikTok" className="w-24 h-24 mx-auto object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tiktok</h3>
            </div>
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full px-8 py-3 text-lg font-semibold transition-all hover:-translate-y-1">
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
