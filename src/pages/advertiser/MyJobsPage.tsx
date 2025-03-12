import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle, Menu } from "lucide-react";
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

const MyJobsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("my-jobs");
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

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Website Testing",
      budget: 50,
      applicants: 12,
      status: "active",
      created: "2024-03-01"
    },
    {
      id: 2,
      title: "Social Media Promotion",
      budget: 75,
      applicants: 8,
      status: "active",
      created: "2024-03-05"
    },
    {
      id: 3,
      title: "App Review",
      budget: 25,
      applicants: 5,
      status: "completed",
      created: "2024-02-20"
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">My Jobs</h1>
              <Button 
                onClick={() => navigate('/submit-job')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Posted Jobs</CardTitle>
                <CardDescription>
                  Manage and monitor all the jobs you've posted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>${job.budget}</TableCell>
                        <TableCell>{job.applicants}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'active' ? 'bg-green-100 text-green-800' : 
                            job.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(job.created).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
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

export default MyJobsPage; 