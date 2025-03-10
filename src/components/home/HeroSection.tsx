import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdvertiserOptionsDialog from "@/components/dialogs/AdvertiserOptionsDialog";

const HeroSection = () => {
  return (
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
  );
};

const AdvertisingOption = ({ icon, title, bgColor }: { icon: React.ReactNode; title: string; bgColor: string }) => (
  <div className="text-center space-y-2">
    <div className={`${bgColor} rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center`}>
      {icon}
    </div>
    <h3 className="font-semibold">{title}</h3>
  </div>
);

const TrafficIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 10L20 15L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 4V9C4 11.2091 5.79086 13 8 13H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SalesIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15C19.1277 15.8031 19.0306 16.6511 19.115 17.4897C19.1994 18.3282 19.4627 19.1407 19.888 19.878C20.0637 20.1755 20.1064 20.5293 20.0071 20.8579C19.9077 21.1866 19.6738 21.4644 19.363 21.634C17.5 22.776 15.306 23.416 13 23.416C10.694 23.416 8.5 22.776 6.637 21.634C6.32623 21.4644 6.09227 21.1866 5.99289 20.8579C5.89351 20.5293 5.93624 20.1755 6.112 19.878C6.53734 19.1407 6.80058 18.3282 6.88498 17.4897C6.96937 16.6511 6.87229 15.8031 6.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.8999 7.5C10.2099 5.3 11.2099 2.5 14.9999 2.5C19.9999 2.5 20.9999 6.5 20.9999 8.5C20.9999 10.5 19.9999 12.5 18.9999 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EngagementIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeadsIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15C19.1277 15.8031 19.0306 16.6511 19.115 17.4897C19.1994 18.3282 19.4627 19.1407 19.888 19.878C20.0637 20.1755 20.1064 20.5293 20.0071 20.8579C19.9077 21.1866 19.6738 21.4644 19.363 21.634C17.5 22.776 15.306 23.416 13 23.416C10.694 23.416 8.5 22.776 6.637 21.634C6.32623 21.4644 6.09227 21.1866 5.99289 20.8579C5.89351 20.5293 5.93624 20.1755 6.112 19.878C6.53734 19.1407 6.80058 18.3282 6.88498 17.4897C6.96937 16.6511 6.87229 15.8031 6.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const JobsIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default HeroSection;
