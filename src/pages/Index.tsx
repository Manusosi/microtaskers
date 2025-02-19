
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Updated to match Paidwork style */}
      <nav className="border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/lovable-uploads/2a22e28a-d71d-4614-a4da-c1aafafb3bef.png" alt="Microtasks Logo" className="h-8" />
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How it works</Link>
              <Link to="/resources" className="text-gray-700 hover:text-gray-900 font-medium">Resources</Link>
              <Link to="/jobs" className="text-gray-700 hover:text-gray-900 font-medium">Jobs</Link>
              <Link to="/games" className="text-gray-700 hover:text-gray-900 font-medium">Games</Link>
              <Link to="/cashback" className="text-gray-700 hover:text-gray-900 font-medium">Cashback</Link>
              <Link to="/shops" className="text-gray-700 hover:text-gray-900 font-medium">Shops</Link>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
              <Link to="/signup/tasker">
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">Registration</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Updated with new styling */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          Start Earning with <span className="text-purple-500">Microtasks</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Join our community of global workers completing simple tasks and earning money from anywhere
          in the world. Start your journey today.
        </p>
        <div className="flex justify-center gap-6">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-6 text-lg">
            Start Earning Now
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section - Updated with modern design */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Easy Tasks</h3>
              <p className="text-gray-600">Complete simple microtasks in minutes and earn rewards instantly</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Quick Payments</h3>
              <p className="text-gray-600">Get paid weekly through multiple payment methods worldwide</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Work Anywhere</h3>
              <p className="text-gray-600">Access tasks from any device, anywhere in the world</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section - Updated with modern cards */}
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
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full">Register as an Advertiser</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section - Updated with modern design */}
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
