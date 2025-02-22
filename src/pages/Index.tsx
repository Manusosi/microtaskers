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

      {/* Hero Section */}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="rounded-full px-8 py-6 text-lg border-[#8511b4] text-[#8511b4] hover:bg-purple-50 transition-all hover:-translate-y-1 w-full md:w-auto"
                    >
                      Start as an Advertiser
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center mb-6">
                        Microtaskers Ads offers many ways to advertise
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8">
                      <div className="text-center space-y-2">
                        <div className="bg-[#4169E1] rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 10L20 15L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 4V9C4 11.2091 5.79086 13 8 13H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="font-semibold">Traffic</h3>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <div className="bg-[#63B3ED] rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.4 15C19.1277 15.8031 19.0306 16.6511 19.115 17.4897C19.1994 18.3282 19.4627 19.1407 19.888 19.878C20.0637 20.1755 20.1064 20.5293 20.0071 20.8579C19.9077 21.1866 19.6738 21.4644 19.363 21.634C17.5 22.776 15.306 23.416 13 23.416C10.694 23.416 8.5 22.776 6.637 21.634C6.32623 21.4644 6.09227 21.1866 5.99289 20.8579C5.89351 20.5293 5.93624 20.1755 6.112 19.878C6.53734 19.1407 6.80058 18.3282 6.88498 17.4897C6.96937 16.6511 6.87229 15.8031 6.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.8999 7.5C10.2099 5.3 11.2099 2.5 14.9999 2.5C19.9999 2.5 20.9999 6.5 20.9999 8.5C20.9999 10.5 19.9999 12.5 18.9999 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="font-semibold">Sales</h3>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="bg-[#4169E1] rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="font-semibold">Engagement</h3>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="bg-[#4169E1] rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.4 15C19.1277 15.8031 19.0306 16.6511 19.115 17.4897C19.1994 18.3282 19.4627 19.1407 19.888 19.878C20.0637 20.1755 20.1064 20.5293 20.0071 20.8579C19.9077 21.1866 19.6738 21.4644 19.363 21.634C17.5 22.776 15.306 23.416 13 23.416C10.694 23.416 8.5 22.776 6.637 21.634C6.32623 21.4644 6.09227 21.1866 5.99289 20.8579C5.89351 20.5293 5.93624 20.1755 6.112 19.878C6.53734 19.1407 6.80058 18.3282 6.88498 17.4897C6.96937 16.6511 6.87229 15.8031 6.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="font-semibold">Leads</h3>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="bg-[#2D3748] rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="font-semibold">Jobs</h3>
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <Link to="/signup/advertiser">
                        <Button className="bg-[#8511b4] hover:bg-[#7a0fa6] text-white rounded-full px-8 py-6 text-lg font-semibold transition-all hover:-translate-y-1">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
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

      {/* Latest Categories Section */}
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

            <div className="group h-64 [perspective:1000px] animate-fade-in animation-delay-700">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-6 text-center [backface-visibility:hidden]">
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 bg-[#8511b4] text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">0</span>
                    <img src="/lovable-uploads/2013a180-d04f-4ed1-9413-dfdc43180709.png" alt="TikTok" className="w-24 h-24 mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Tiktok</h3>
                </div>
                <div className="absolute inset-0 bg-[#8511b4] text-white rounded-xl shadow-md p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <p className="text-lg">Make money by engaging with TikTok content and creating simple videos.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button className="bg-[#8511b4] hover:bg-[#7a0fa6] text-white rounded-full px-8 py-3 text-lg font-semibold transition-all hover:-translate-y-1">
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
