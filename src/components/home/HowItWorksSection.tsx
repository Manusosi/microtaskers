
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  return (
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

          <StepCard
            number={1}
            title="SEARCH JOBS"
            description="Browse through our extensive list of available microtasks. Find tasks that match your skills and interests."
            showArrow
          />

          <StepCard
            number={2}
            title="APPLY"
            description="Select tasks you want to complete and submit your application. Our system matches you with the best opportunities."
            showArrow
          />

          <StepCard
            number={3}
            title="GET PAID"
            description="Complete tasks successfully and receive payment directly to your account. Enjoy weekly payouts and flexible payment options."
            showArrow={false}
          />
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
  );
};

const StepCard = ({ number, title, description, showArrow }: { number: number; title: string; description: string; showArrow: boolean }) => (
  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in">
    <div className="w-16 h-16 bg-gradient-to-br from-[#8511b4] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-semibold text-xl group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
    {showArrow && (
      <div className="absolute -bottom-3 right-4 md:block hidden">
        <ArrowRight className="w-6 h-6 text-[#8511b4] animate-pulse" />
      </div>
    )}
  </div>
);

export default HowItWorksSection;
