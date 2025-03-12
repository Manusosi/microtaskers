import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ExternalLink, Menu } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "@/components/dashboard/SidebarContent";

const SavedOffersPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("saved-offers");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        const role = session.user.user_metadata.role || 'tasker';
        setUserRole(role);
        
        // Redirect if not an advertiser
        if (role !== 'advertiser') {
          navigate('/dashboard/tasker');
        }
      } else {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!isLoggedIn || userRole !== 'advertiser') {
    return null;
  }

  // Sample saved offers data
  const savedOffers = [
    {
      id: 1,
      title: "Social Media Management",
      provider: "MarketingPro",
      price: 150,
      rating: 4.8,
      saved: "2024-03-05"
    },
    {
      id: 2,
      title: "Content Writing",
      provider: "WordCraft",
      price: 75,
      rating: 4.5,
      saved: "2024-03-02"
    },
    {
      id: 3,
      title: "Logo Design",
      provider: "DesignMaster",
      price: 200,
      rating: 4.9,
      saved: "2024-02-28"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <div className="sticky top-0 left-0 right-0 h-16 bg-white border-b z-40 px-4 shadow-sm">
        <div className="h-full flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="overflow-y-auto h-full pb-20">
                  <SidebarContent
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    onLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <a href="/">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="Logo"
                className="h-8"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <SidebarContent
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Saved Offers</h1>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Saved Offers</CardTitle>
                <CardDescription>
                  Review and manage offers you've saved for later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Offer Title</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Saved On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">{offer.title}</TableCell>
                        <TableCell>{offer.provider}</TableCell>
                        <TableCell>${offer.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            {offer.rating}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(offer.saved).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Heart className="h-4 w-4 mr-1 fill-current" />
                              Unsave
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedOffersPage; 