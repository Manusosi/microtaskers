
import Navigation from "@/components/layout/Navigation";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-purple-800 mb-6">
              Terms of Use
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10">
              Please read these terms and conditions carefully before using our service.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Terms of Service</h2>
            <p>These Terms of Service govern your use of the Microtaskers platform and website. By accessing or using our service, you agree to be bound by these Terms.</p>
            
            <h2>2. User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
            
            <h2>3. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Microtaskers and its licensors.</p>
            
            <h2>4. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.</p>
            
            <h2>5. Limitation of Liability</h2>
            <p>In no event shall Microtaskers, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            
            <h2>6. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2>7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@microtaskers.work.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
