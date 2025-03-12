import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Mail, Star, Menu } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "@/components/dashboard/SidebarContent";

const MyWorkersPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("my-workers");
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

  // Sample workers data
  const workers = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "",
      skills: ["Web Development", "Testing"],
      jobsCompleted: 12,
      rating: 4.8,
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "",
      skills: ["Content Writing", "SEO"],
      jobsCompleted: 8,
      rating: 4.7,
      status: "active"
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "",
      skills: ["Graphic Design", "UI/UX"],
      jobsCompleted: 15,
      rating: 4.9,
      status: "inactive"
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
            <h1 className="text-3xl font-bold mb-6">My Workers</h1>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Hired Workers</CardTitle>
                <CardDescription>
                  Manage and communicate with workers you've hired for your jobs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Worker</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Jobs Completed</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={worker.avatar} />
                              <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{worker.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {worker.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-purple-50">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{worker.jobsCompleted}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            {worker.rating}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            worker.status === 'active' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button variant="ghost" size="sm">
                              View Profile
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

export default MyWorkersPage; 