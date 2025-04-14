
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  DollarSign,
  Shield,
  MessageSquare,
  Settings,
  LogOut,
  UserCog,
  FileText,
  AlertTriangle,
  BarChart3,
  Gauge,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface AdminSidebarContentProps {
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const AdminSidebarContent = ({ 
  activeMenu, 
  setActiveMenu, 
  onLogout, 
  isLoggedIn 
}: AdminSidebarContentProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "DASHBOARD", id: "dashboard" },
    { icon: Users, label: "USER MANAGEMENT", id: "user-management" },
    { icon: Briefcase, label: "JOB MANAGEMENT", id: "job-management" },
    { icon: DollarSign, label: "FINANCIAL", id: "financial" },
    { icon: Shield, label: "CONTENT MODERATION", id: "content-moderation" },
    { icon: MessageSquare, label: "SUPPORT", id: "support" },
    { icon: AlertTriangle, label: "REPORTS", id: "reports" },
    { icon: BarChart3, label: "ANALYTICS", id: "analytics" },
    { icon: Gauge, label: "SYSTEM STATUS", id: "system-status" },
    { icon: Bell, label: "NOTIFICATIONS", id: "notifications" },
    { icon: Settings, label: "SETTINGS", id: "settings" },
  ];

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    
    // Handle special navigation cases
    if (menuId === 'dashboard') {
      navigate('/admin');
    } else if (menuId === 'user-management') {
      navigate('/admin/users');
    } else if (menuId === 'job-management') {
      navigate('/admin/jobs');
    } else if (menuId === 'financial') {
      navigate('/admin/financial');
    } else if (menuId === 'content-moderation') {
      navigate('/admin/moderation');
    } else if (menuId === 'support') {
      navigate('/admin/support');
    } else if (menuId === 'reports') {
      navigate('/admin/reports');
    } else if (menuId === 'analytics') {
      navigate('/admin/analytics');
    } else if (menuId === 'system-status') {
      navigate('/admin/system');
    } else if (menuId === 'notifications') {
      navigate('/admin/notifications');
    } else if (menuId === 'settings') {
      navigate('/admin/settings');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4">
        <div className="flex items-center gap-3 px-2 py-3 bg-purple-100 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Admin Portal</h3>
            <p className="text-xs text-gray-500">Full access</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeMenu === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeMenu === item.id
                  ? "bg-purple-100 text-purple-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                activeMenu === item.id ? "text-purple-600" : "text-gray-500"
              }`} />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      
      {/* Sign Out Button */}
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebarContent;
