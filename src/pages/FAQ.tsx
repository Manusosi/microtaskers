import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50 flex flex-col">
      <Navigation />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-purple-800 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Find answers to the most common questions about Microtaskers
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">What is Microtaskers?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    Microtaskers is a platform that connects people who want to earn money by completing small tasks with businesses and individuals who need these tasks completed. Our platform makes it easy to find, apply for, and get paid for work that matches your skills.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">How do I get paid?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    We offer weekly payments through multiple methods including PayPal, direct bank transfer, and cryptocurrency. Once your tasks are verified as complete, the payment is processed according to our weekly payment schedule.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">Is Microtaskers available worldwide?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    Yes! Microtaskers is available globally. You can sign up and start working from anywhere in the world as long as you have an internet connection.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">What kind of tasks can I find on Microtaskers?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    We offer a wide variety of tasks including social media engagement, content viewing, account creation, reviews, data entry, and much more. New task categories are regularly added to the platform.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">How much can I earn?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    Earnings vary based on the tasks you complete, your efficiency, and how much time you dedicate. Some users earn a few dollars for occasional work, while our most active users can earn a substantial side income.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">Is there a fee to join?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    No, it's completely free to join Microtaskers as a worker. We make our money by charging a small fee to the businesses that post tasks.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">How do I contact support?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    You can reach our support team by emailing support@microtaskers.work or through the contact form on our Contact page. We aim to respond to all inquiries within 24-48 hours.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-xl font-semibold px-4">What is the referral program?</AccordionTrigger>
                  <AccordionContent className="px-4 text-gray-600">
                    Our referral program rewards you for inviting friends to Microtaskers. When someone signs up using your referral link, you'll receive a $5 bonus and earn 5% commission on their earnings for life.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
