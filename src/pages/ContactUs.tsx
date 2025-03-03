
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check 
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f3e8ff_0%,_transparent_40%)] opacity-70"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-950 to-purple-800 mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10">
              Have questions or need assistance? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                  <CardDescription>We'd love to hear from you. Fill out the form below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help?" 
                        className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                        required 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#8511b4] hover:bg-[#7a0fa6]">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Mail className="w-5 h-5 text-[#8511b4]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">support@microtaskers.work</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Phone className="w-5 h-5 text-[#8511b4]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+1 (323) 916-4947</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <MapPin className="w-5 h-5 text-[#8511b4]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">9607 Lavender Mis Labe, Katy TX, 77494</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Building className="w-5 h-5 text-[#8511b4]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Office Hours</p>
                      <p className="font-medium">Monday - Friday: 9:00 AM - 5:00 PM (CST)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Section */}
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Find Us</h3>
                <div className="rounded-xl overflow-hidden h-80 bg-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.9913322847!2d-95.8252!3d29.7866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640db3afdbb6c97%3A0x2b1d33a9087a222!2sKaty%2C%20TX%2077494!5e0!3m2!1sen!2sus!4v1651582976427!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              
              {/* Refer a Friend */}
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-xl">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img 
                    src="/lovable-uploads/c9db11a6-bd97-44ba-9970-d990ce279b56.png" 
                    alt="Referral Program" 
                    className="w-40 h-40 object-contain"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Refer & Earn Program</h3>
                    <p className="text-gray-600 mb-4">
                      Invite your friends to join Microtaskers! When they sign up using your referral link, 
                      you'll get a $5 bonus and 5% lifetime commission on their earnings.
                    </p>
                    <Button className="bg-[#8511b4] hover:bg-[#7a0fa6]">
                      <Check className="w-4 h-4 mr-2" />
                      Get Your Referral Link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How quickly will I receive a response?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We typically respond to all inquiries within 24-48 business hours. For urgent matters, please contact us by phone.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Can I visit your office in person?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Yes, we welcome visitors during our regular office hours. However, we recommend scheduling an appointment beforehand to ensure someone is available to assist you.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Do you offer customer support on weekends?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">While our office is closed on weekends, we monitor emails for urgent issues. For immediate weekend assistance, please use our live chat feature on the dashboard.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
