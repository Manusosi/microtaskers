import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Pencil,
  Trash2,
  Clock,
  Users,
  DollarSign,
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Menu,
  BellDot,
  BookOpen,
  FileQuestion,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SidebarContent from "@/components/dashboard/SidebarContent";

interface Job {
  id: number;
  title: string;
  description: string;
  budget: number;
  ratePerTask: number;
  totalTasks: number;
  completedTasks: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  countries: string[];
  createdAt: string;
  deadline: string;
  applicants: number;
}

const MyJobsPage = () => {
  const [activeMenu, setActiveMenu] = useState("my-jobs");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  
  // Sample job data
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Website Testing and Bug Reporting",
      description: "Test our e-commerce website functionality across different devices and browsers. Report any bugs, UI issues, or usability problems found.",
      budget: 500,
      ratePerTask: 2.50,
      totalTasks: 200,
      completedTasks: 145,
      status: 'active',
      countries: ['United States', 'Canada', 'United Kingdom'],
      createdAt: "2024-03-10",
      deadline: "2024-03-25",
      applicants: 48
    },
    {
      id: 2,
      title: "Social Media Content Engagement",
      description: "Like, comment, and share our social media posts. Must provide genuine, relevant engagement. Minimum account age requirement: 6 months.",
      budget: 300,
      ratePerTask: 0.75,
      totalTasks: 400,
      completedTasks: 400,
      status: 'completed',
      countries: ['Worldwide'],
      createdAt: "2024-03-01",
      deadline: "2024-03-15",
      applicants: 156
    },
    {
      id: 3,
      title: "Product Review Writing",
      description: "Write honest, detailed reviews for our new line of eco-friendly home products. Must have experience with similar products. Reviews should be 100-150 words.",
      budget: 750,
      ratePerTask: 5.00,
      totalTasks: 150,
      completedTasks: 0,
      status: 'draft',
      countries: ['Australia', 'New Zealand', 'Singapore'],
      createdAt: "2024-03-12",
      deadline: "2024-04-12",
      applicants: 0
    }
  ]);

  const getStatusBadge = (status: Job['status']) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      draft: "bg-gray-100 text-gray-800"
    };

    const icons = {
      active: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      paused: <AlertCircle className="h-4 w-4 text-yellow-600" />,
      completed: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
      draft: <Clock className="h-4 w-4 text-gray-600" />
    };

    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

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
                <SidebarContent
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  isLoggedIn={isLoggedIn}
                />
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="MicroTaskers"
                className="h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-xl font-bold text-gray-900" style={{ display: 'none' }}>
                MicroTaskers
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <BellDot className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center space-x-2 bg-purple-100 px-3 py-1.5 rounded-full">
              <span className="text-sm font-bold text-purple-600">Advertiser</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <SidebarContent
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
                <p className="text-gray-600">Manage your posted jobs and track their progress</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Post New Job
              </Button>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold">Job Details</TableHead>
                      <TableHead className="font-semibold">Budget & Rate</TableHead>
                      <TableHead className="font-semibold">Progress</TableHead>
                      <TableHead className="font-semibold">Location</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="max-w-md">
                            <h3 className="font-medium text-gray-900">{job.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {job.applicants} applicants
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">${job.budget.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">${job.ratePerTask.toFixed(2)} per task</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-600 rounded-full"
                                  style={{ width: `${(job.completedTasks / job.totalTasks) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {((job.completedTasks / job.totalTasks) * 100).toFixed(0)}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {job.completedTasks} of {job.totalTasks} tasks completed
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {job.countries.map((country, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                {country}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(job.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Support Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How can we help you?</h2>
              <p className="text-gray-600 mb-6">Find answers to your questions or contact our support team</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>
    </div>
  );
};

export default MyJobsPage; 