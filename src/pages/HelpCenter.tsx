
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50 flex flex-col">
      <Navigation />
      
      <div className="flex-grow">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-purple-800 mb-6">
                Help Center
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Find answers, guides, and support for all your Microtaskers questions
              </p>
            </div>
          </div>
        </section>
        
        {/* Help Center Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-lg text-gray-600 mb-10">
                Our help center resources are coming soon. In the meantime, please contact our support team with any questions.
              </p>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
