
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/lovable-uploads/4aafc7f3-b959-4082-a140-77be485247da.png" alt="Microtasks Logo" className="h-8" />
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/jobs" className="text-gray-600 hover:text-gray-900">Jobs</Link>
              <Link to="/offers" className="text-gray-600 hover:text-gray-900">Offers</Link>
              <Link to="/workers" className="text-gray-600 hover:text-gray-900">Find Workers</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Earn Money with <span className="text-purple-500">Microtasks</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Join thousands of people completing simple tasks and earning money from anywhere
          in the world. Start earning today with just a few clicks.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-purple-500 hover:bg-purple-600">Start Earning Now</Button>
          <Button variant="outline">Browse Tasks</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-2">Easy Tasks</h3>
            <p className="text-gray-600">Complete simple tasks in minutes</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-2">Quick Payments</h3>
            <p className="text-gray-600">Get paid weekly via multiple methods</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-2">Work Anywhere</h3>
            <p className="text-gray-600">Complete tasks from any location</p>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">We are Popular Everywhere</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">I want to complete tasks and earn money</h3>
            <p className="text-gray-600 mb-6">Find Tasks and get paid.</p>
            <Link to="/signup/tasker">
              <Button variant="outline" className="w-full">Register as a Tasker</Button>
            </Link>
          </div>
          <div className="text-center p-8 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">I want to post tasks and hire.</h3>
            <p className="text-gray-600 mb-6">Post Tasks and Hire professionals.</p>
            <Link to="/signup/advertiser">
              <Button className="w-full bg-purple-500 hover:bg-purple-600">Register as an Advertiser</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="bg-purple-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How it works?</h2>
          <p className="text-center text-gray-600 mb-12">We have easy step process for complete a job or offers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-500">1</span>
              </div>
              <h3 className="font-semibold">SEARCH JOBS</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-500">2</span>
              </div>
              <h3 className="font-semibold">APPLY</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-500">3</span>
              </div>
              <h3 className="font-semibold">FINAL</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
