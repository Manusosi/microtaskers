
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, 
  BellDot, 
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  User,
  Shield,
  Ban,
  Mail,
  Trash2,
  Edit,
  Download,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebarContent from "@/components/admin/AdminSidebarContent";

// Define user interface
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  country: string;
  joined: string;
  lastLogin: string;
  completed_tasks?: number;
  posted_jobs?: number;
}

const UsersPage = () => {
  const [activeMenu, setActiveMenu] = useState("user-management");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const navigate = useNavigate();

  // Sample users data
  const users: User[] = [
    {
      id: "1",
      username: "johndoe",
      email: "john.doe@example.com",
      role: "Tasker",
      status: "Active",
      country: "United States",
      joined: "2024-03-15",
      lastLogin: "2024-04-13",
      completed_tasks: 24
    },
    {
      id: "2",
      username: "janedoe",
      email: "jane.doe@example.com",
      role: "Advertiser",
      status: "Active",
      country: "Canada",
      joined: "2024-02-28",
      lastLogin: "2024-04-10",
      posted_jobs: 5
    },
    {
      id: "3",
      username: "samuel_wilson",
      email: "sam.wilson@example.com",
      role: "Tasker",
      status: "Suspended",
      country: "Australia",
      joined: "2024-01-10",
      lastLogin: "2024-03-20",
      completed_tasks: 12
    },
    {
      id: "4",
      username: "lisajackson",
      email: "lisa.jackson@example.com",
      role: "Advertiser",
      status: "Inactive",
      country: "United Kingdom",
      joined: "2023-12-05",
      lastLogin: "2024-02-15",
      posted_jobs: 3
    },
    {
      id: "5",
      username: "michaelbrown",
      email: "michael.brown@example.com",
      role: "Admin",
      status: "Active",
      country: "Germany",
      joined: "2023-10-18",
      lastLogin: "2024-04-14"
    },
    {
      id: "6",
      username: "sarahsmith",
      email: "sarah.smith@example.com",
      role: "Tasker",
      status: "Active",
      country: "France",
      joined: "2024-03-02",
      lastLogin: "2024-04-12",
      completed_tasks: 8
    },
    {
      id: "7",
      username: "robertjohnson",
      email: "robert.johnson@example.com",
      role: "Advertiser",
      status: "Active",
      country: "Spain",
      joined: "2024-01-25",
      lastLogin: "2024-04-08",
      posted_jobs: 7
    }
  ];

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole.toLowerCase();
    
    const matchesStatus = selectedStatus === "all" || user.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case 'advertiser':
        return <Badge className="bg-blue-100 text-blue-800">Advertiser</Badge>;
      case 'tasker':
        return <Badge className="bg-green-100 text-green-800">Tasker</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
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
                <AdminSidebarContent
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="MicroTaskers"
                className="h-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const nextSibling = target.nextSibling as HTMLElement;
                  if (nextSibling) {
                    nextSibling.style.display = 'block';
                  }
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
            <div className="hidden md:flex items-center space-x-2 bg-red-100 px-3 py-1.5 rounded-full">
              <span className="text-sm font-bold text-red-600">Admin</span>
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-purple-100">
              <span className="text-sm font-medium text-purple-700">A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <AdminSidebarContent
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage and monitor all users</p>
              </div>
              
              <div className="flex space-x-2">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      <label className="mr-2 text-sm text-gray-600">Role:</label>
                      <select 
                        className="border rounded-md p-2 text-sm"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="advertiser">Advertiser</option>
                        <option value="tasker">Tasker</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="mr-2 text-sm text-gray-600">Status:</label>
                      <select 
                        className="border rounded-md p-2 text-sm"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium">{user.username}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {user.role === "Tasker" ? 
                            `${user.completed_tasks} tasks` : 
                            user.role === "Advertiser" ? 
                            `${user.posted_jobs} jobs` : 
                            "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit User</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Email User</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Change Role</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-amber-600">
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Suspend Account</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Account</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

export default UsersPage;
