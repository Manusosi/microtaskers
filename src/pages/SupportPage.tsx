import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileQuestion, MessageSquare, ChevronRight } from 'lucide-react';

const SupportPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
          <p className="text-gray-600 mb-8">Find answers to your questions or get in touch with our support team</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Knowledge Base */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <BookOpen className="h-5 w-5" />
                <h3 className="text-xl font-semibold">Knowledge Base</h3>
              </div>
              <p className="text-gray-600 mb-4">Browse our comprehensive guides and tutorials</p>
              <Button 
                variant="link" 
                onClick={() => navigate('/help')}
                className="p-0 h-auto text-blue-500 hover:text-blue-600 font-semibold flex items-center"
              >
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Card>

            {/* FAQs */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-green-500 mb-2">
                <FileQuestion className="h-5 w-5" />
                <h3 className="text-xl font-semibold">FAQs</h3>
              </div>
              <p className="text-gray-600 mb-4">Find answers to commonly asked questions</p>
              <Button 
                variant="link" 
                onClick={() => navigate('/faq')}
                className="p-0 h-auto text-green-500 hover:text-green-600 font-semibold flex items-center"
              >
                View FAQs <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Card>

            {/* Contact Us */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-purple-500 mb-2">
                <MessageSquare className="h-5 w-5" />
                <h3 className="text-xl font-semibold">Contact Us</h3>
              </div>
              <p className="text-gray-600 mb-4">Get in touch with our support team directly</p>
              <Button 
                variant="link" 
                onClick={() => navigate('/contact')}
                className="p-0 h-auto text-purple-500 hover:text-purple-600 font-semibold flex items-center"
              >
                Contact <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
