import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Clock, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock3,
  ShoppingCart,
  ChevronRight,
  Briefcase,
  FileText,
  User,
  Calendar,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  // Mock data for the earnings chart
  const earningData = Array.from({ length: 15 }, (_, i) => ({
    name: i + 1,
    amount: Math.random() * 2000,
  }));

  // Mock data for latest offers
  const latestOffers = [
    { id: 1, title: "Website Development", budget: "$500", deadline: "2 days" },
    { id: 2, title: "Logo Design", budget: "$200", deadline: "3 days" },
    { id: 3, title: "Content Writing", budget: "$300", deadline: "1 day" }
  ];

  // Mock data for recent jobs
  const recentJobs = [
    { id: 1, title: "Mobile App UI", client: "John Doe", status: "In Progress" },
    { id: 2, title: "SEO Optimization", client: "Jane Smith", status: "Completed" },
    { id: 3, title: "Database Design", client: "Mike Johnson", status: "Review" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Trigger */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full bg-white">
              <div className="flex items-center space-x-3 p-4 border-b">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-medium">Ava Anderson</h3>
                  <span className="text-sm text-green-500 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    Active
                  </span>
                </div>
              </div>

              <nav className="space-y-4 p-4">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Create a gig</span>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Insights</span>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Manage projects</span>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Manage task</span>
                </button>
              </nav>

              <div className="mt-auto p-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Account balance:</div>
                  <div className="text-xl font-semibold">$1,080</div>
                </div>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
                  <LogOut className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Logout</span>
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4 hidden lg:flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <h3 className="font-medium">Ava Anderson</h3>
            <span className="text-sm text-green-500 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              Active
            </span>
          </div>
        </div>

        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Create a gig</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Insights</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Manage projects</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Manage task</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Account balance:</div>
            <div className="text-xl font-semibold">$1,080</div>
          </div>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <LogOut className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 p-4 md:p-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Total income</div>
              <div className="text-xl md:text-2xl font-semibold">$1,080</div>
              <button className="mt-4 text-sm text-gray-600">Refresh</button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Withdraw requested</div>
              <div className="text-xl md:text-2xl font-semibold">$0</div>
              <button className="mt-4 text-sm text-gray-600">Show all invoices</button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Clock3 className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Pending income</div>
              <div className="text-xl md:text-2xl font-semibold">$0</div>
              <button className="mt-4 text-sm text-gray-600">Refresh</button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Available in account</div>
              <div className="text-xl md:text-2xl font-semibold">$1,080</div>
              <button className="mt-4 text-sm text-gray-600">Withdraw now</button>
            </CardContent>
          </Card>
        </div>

        {/* Latest Offers and Recent Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Latest Offers</h2>
              <div className="space-y-4">
                {latestOffers.map((offer) => (
                  <div key={offer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-medium">{offer.title}</h3>
                      <p className="text-sm text-gray-600">Budget: {offer.budget}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      Deadline: {offer.deadline}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Jobs</h2>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-gray-600">Client: {job.client}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      Status: {job.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-lg md:text-xl font-semibold">1</span>
                </div>
                <button className="text-sm text-blue-600">View</button>
              </div>
              <div className="text-sm text-gray-600">Completed projects</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-lg md:text-xl font-semibold">1</span>
                </div>
                <button className="text-sm text-blue-600">View</button>
              </div>
              <div className="text-sm text-gray-600">Ongoing projects</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-lg md:text-xl font-semibold">0</span>
                </div>
                <button className="text-sm text-blue-600">View</button>
              </div>
              <div className="text-sm text-gray-600">Cancelled projects</div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card className="mb-8">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-6">Earning history</h2>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={earningData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payouts History */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
              <h2 className="text-lg md:text-xl font-semibold">Payouts history</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <Input
                  type="text"
                  placeholder="Search withdrawn records here"
                  className="w-full sm:w-64"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Filter by withdraw:</span>
                  <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
                    <span>Select</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ref#</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <span className="text-4xl">😕</span>
                        </div>
                        <div className="text-lg font-medium">Oops!! record not found</div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
