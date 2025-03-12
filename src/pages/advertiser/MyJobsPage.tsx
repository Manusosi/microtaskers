import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PlusCircle, Menu, Users } from "lucide-react";
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
import { Database } from "@/types/database";

type Job = Database['public']['Tables']['jobs']['Row'] & {
  applications_count: number;
  pending_applications: number;
  completed_applications: number;
};

const MyJobsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("my-jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        } else {
          // Fetch jobs with application counts
          const { data: jobsData, error } = await supabase
            .from('jobs')
            .select(`
              *,
              applications_count:job_applications(count),
              pending_applications:job_applications(count)
              completed_applications:job_applications(count)
            `)
            .eq('advertiser_id', session.user.id)
            .eq('job_applications.status', 'pending')
            .eq('job_applications.status', 'completed')
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching jobs:', error);
          } else {
            setJobs(jobsData || []);
          }
          setIsLoading(false);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getJobStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SidebarContent 
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    isLoggedIn={isLoggedIn}
                  />
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-semibold text-gray-900">My Jobs</h1>
            </div>
            <Button 
              onClick={() => navigate('/advertiser/submit-job')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Job Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <span className="text-2xl font-bold text-green-600">
                    {jobs.filter(job => job.status === 'active').length}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <span className="text-2xl font-bold text-purple-600">{jobs.length}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Featured Jobs</p>
                  <span className="text-2xl font-bold text-amber-600">
                    {jobs.filter(job => job.is_featured).length}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Premium Jobs</p>
                  <span className="text-2xl font-bold text-blue-600">
                    {jobs.filter(job => job.is_premium).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Jobs</CardTitle>
              <CardDescription>Manage your job postings</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading jobs...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs yet</h3>
                  <p className="text-gray-600 mb-4">Get started by posting your first job</p>
                  <Button 
                    onClick={() => navigate('/advertiser/submit-job')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Job Title</TableHead>
                      <TableHead className="font-semibold">Budget</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Applications</TableHead>
                      <TableHead className="font-semibold">Posted</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id} className={`
                        ${job.is_featured ? 'bg-amber-50' : job.is_premium ? 'bg-blue-50' : ''}
                        hover:bg-opacity-75
                      `}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{job.title}</span>
                            {job.is_featured && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            )}
                            {job.is_premium && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Premium
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>${job.budget}</TableCell>
                        <TableCell className="capitalize">{job.type}</TableCell>
                        <TableCell>{getJobStatusBadge(job.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{job.applications_count} total</span>
                              <span className="text-xs text-gray-500">
                                {job.pending_applications} pending · {job.completed_applications} completed
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/advertiser/jobs/${job.id}`)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyJobsPage; 