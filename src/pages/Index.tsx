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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { 
  Clock, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock3,
  ShoppingCart,
  ChevronRight
} from "lucide-react";

const Index = () => {
  // Mock data for the earnings chart
  const earningData = Array.from({ length: 15 }, (_, i) => ({
    name: i + 1,
    amount: 0.2,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
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
            <span className="text-gray-600">Create a gig</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <span className="text-gray-600">Insights</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <span className="text-gray-600">Manage projects</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <span className="text-gray-600">Manage task</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <span className="text-gray-600">Notifications</span>
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <span className="text-gray-600">Messages</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Account balance:</div>
            <div className="text-xl font-semibold">$1,080</div>
          </div>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-3">
            <span className="text-gray-600">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Total income</div>
              <div className="text-2xl font-semibold">$1,080</div>
              <button className="mt-4 text-sm text-gray-600">Refresh</button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Withdraw requested</div>
              <div className="text-2xl font-semibold">$0</div>
              <button className="mt-4 text-sm text-gray-600">Show all invoices</button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Clock3 className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Pending income</div>
              <div className="text-2xl font-semibold">$0</div>
              <button className="mt-4 text-sm text-gray-600">Refresh</button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Available in account</div>
              <div className="text-2xl font-semibold">$1,080</div>
              <button className="mt-4 text-sm text-gray-600">Withdraw now</button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-xl font-semibold">1</span>
                </div>
                <button className="text-sm text-blue-600">View</button>
              </div>
              <div className="text-sm text-gray-600">Completed projects</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-xl font-semibold">1</span>
                </div>
                <button className="text-sm text-blue-600">View</button>
              </div>
              <div className="text-sm text-gray-600">Ongoing projects</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-xl font-semibold">0</span>
                </div>
                <button className="text-sm text-blue-600">View</button>
              </div>
              <div className="text-sm text-gray-600">Cancelled projects</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Earning history</h2>
            <div className="w-full h-[300px]">
              <LineChart
                width={800}
                height={250}
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Payouts history</h2>
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  placeholder="Search withdrawn records here"
                  className="w-64"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Filter by withdraw:</span>
                  <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
                    <span>Select</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;