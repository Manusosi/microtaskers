
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Mail,
  Settings,
  Gift,
  CreditCard,
  RefreshCcw,
  Headphones,
  Crown,
  Users,
  Menu,
  BellDot,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const TaskerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Mock data for the activity chart
  const activityData = [
    { date: "19/10", clicks: 5, earnings: 0.05 },
    { date: "18/10", clicks: 8, earnings: 0.08 },
    { date: "17/10", clicks: 12, earnings: 0.12 },
    { date: "16/10", clicks: 3, earnings: 0.03 },
    { date: "15/10", clicks: 7, earnings: 0.07 },
    { date: "14/10", clicks: 10, earnings: 0.10 },
    { date: "13/10", clicks: 6, earnings: 0.06 },
  ];

  const menuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", count: 0 },
    { icon: Mail, label: "Inbox", id: "inbox", count: 2 },
    { icon: Settings, label: "Settings", id: "settings", count: 1 },
    { icon: Gift, label: "Bonuses", id: "bonuses", count: 0 },
    { icon: CreditCard, label: "Payout", id: "payout", count: 0 },
    { icon: RefreshCcw, label: "Internal Transfer", id: "transfer", count: 0 },
    { icon: Headphones, label: "Support", id: "support", count: 0 },
    { icon: Crown, label: "Upgrade", id: "upgrade", count: 0 },
    { icon: Users, label: "Top Members", id: "members", count: 0 },
  ];

  const MenuItem = ({ icon: Icon, label, count, id }: any) => (
    <button
      onClick={() => setActiveMenu(id)}
      className={cn(
        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
        activeMenu === id
          ? "bg-purple-100 text-purple-900"
          : "hover:bg-gray-100 text-gray-700"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left">{label}</span>
      {count > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 px-4">
        <div className="h-full flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Link to="/">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="Logo"
                className="h-8"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <BellDot className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Balance:</span>
              <span className="text-sm font-bold text-purple-900">US$33.20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white hidden lg:block">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-600 to-purple-700">
              <CardContent className="p-6">
                <h3 className="text-white text-lg font-medium mb-2">ACCOUNT BALANCE</h3>
                <p className="text-white text-3xl font-bold">US$33.20</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-700 text-lg font-medium mb-2">TODAY'S WORK</h3>
                <p className="text-3xl font-bold text-gray-900">US$0.04</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-700 text-lg font-medium mb-2">TOTAL PAYOUTS</h3>
                <p className="text-3xl font-bold text-gray-900">US$0.00</p>
              </CardContent>
            </Card>
          </div>

          {/* Task Call to Action */}
          <Card className="bg-gradient-to-r from-purple-50 to-white border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">FINISH YOUR TASKS TODAY</h3>
              <p className="text-gray-600 mb-4">
                Exciting update! Ads are now accessible, and you receive $0.01 for every click.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                BEGIN WORKING
              </Button>
            </CardContent>
          </Card>

          {/* Activity Table */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Last 7 days activity</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Earning</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityData.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{71398658 + index}</TableCell>
                        <TableCell>{activity.clicks}</TableCell>
                        <TableCell>${activity.earnings.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-purple-600 h-2.5 rounded-full"
                              style={{ width: `${(activity.clicks / 15) * 100}%` }}
                            ></div>
                          </div>
                        </TableCell>
                        <TableCell>{activity.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Sidebar Content Component
const SidebarContent = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", count: 0 },
    { icon: Mail, label: "Inbox", id: "inbox", count: 2 },
    { icon: Settings, label: "Settings", id: "settings", count: 1 },
    { icon: Gift, label: "Bonuses", id: "bonuses", count: 0 },
    { icon: CreditCard, label: "Payout", id: "payout", count: 0 },
    { icon: RefreshCcw, label: "Internal Transfer", id: "transfer", count: 0 },
    { icon: Headphones, label: "Support", id: "support", count: 0 },
    { icon: Crown, label: "Upgrade", id: "upgrade", count: 0 },
    { icon: Users, label: "Top Members", id: "members", count: 0 },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-3" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default TaskerDashboard;
