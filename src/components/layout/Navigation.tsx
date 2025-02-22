
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
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
  );
};

export default Navigation;
