import { Button } from "@/components/ui/button";
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
  LogOut,
  DollarSign,
  Upload,
  Download,
  UserCog,
  CheckSquare,
  MessageSquare,
  List,
  LayoutDashboard,
  Briefcase,
  ExternalLink,
  UserPlus,
  Sparkles,
  PlusCircle,
  FileText,
  Heart,
  UserCheck
} from "lucide-react";
import { MenuItem } from "./MenuItem";
import { useState, useEffect } from "react";
import { DepositFundsDialog } from "./DepositFundsDialog";
import { WithdrawFundsDialog } from "./WithdrawFundsDialog";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeTiers } from "./UpgradeTiers";
import { Badge } from "@/components/ui/badge";

export interface SidebarContentProps {
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const SidebarContent = ({ activeMenu, setActiveMenu, onLogout, isLoggedIn }: SidebarContentProps) => {
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const role = session.user.user_metadata.role || 'tasker';
        setUserRole(role);
        localStorage.setItem('userRole', role);
      }
    };
    
    checkUserRole();
  }, []);

  // Common menu items for both roles
  const commonMenuItems = [
    { icon: LayoutDashboard, label: "DASHBOARD", id: "dashboard", count: 0 },
    { icon: DollarSign, label: "MY PAYMENTS", id: "payments", count: 0 },
    { icon: Upload, label: "DEPOSIT FUNDS", id: "deposit", count: 0 },
    { icon: Download, label: "WITHDRAW FUNDS", id: "withdraw", count: 0 },
    { icon: Headphones, label: "SUPPORT", id: "support", count: 0 },
    { icon: UserPlus, label: "REFER A FRIEND", id: "refer", count: 0 },
    { icon: UserCog, label: "EDIT PROFILE", id: "profile", count: 0 },
    { icon: Settings, label: "SETTINGS", id: "settings", count: 0 },
  ];

  // Tasker-specific menu items
  const taskerMenuItems = [
    { 
      icon: Gift, 
      label: "MY OFFERS", 
      id: "offers", 
      count: 0,
      badge: { text: "Coming Soon", variant: "outline" as const }
    },
    { icon: Briefcase, label: "AVAILABLE JOBS", id: "available-jobs", count: 0 },
    { icon: CheckSquare, label: "FINISHED JOBS", id: "finished-jobs", count: 0 },
    { 
      icon: MessageSquare, 
      label: "JOB INVITATIONS", 
      id: "invitations", 
      count: 2,
      badge: { text: "Coming Soon", variant: "outline" as const }
    },
  ];

  // Advertiser-specific menu items
  const advertiserMenuItems = [
    { icon: PlusCircle, label: "SUBMIT A JOB", id: "submit-job", count: 0 },
    { icon: FileText, label: "MY JOBS", id: "my-jobs", count: 0 },
    { icon: UserCheck, label: "MY WORKERS", id: "my-workers", count: 0 },
    { icon: Heart, label: "SAVED OFFERS", id: "saved-offers", count: 0 },
  ];

  // Determine which menu items to show based on user role
  let menuItems = [];
  
  if (userRole === 'advertiser') {
    // Advertiser menu order: Dashboard, Submit a job, My Jobs, My workers, Saved offers, deposit funds, my payments, support, edit profile, refer a friend, withdraw funds, settings
    menuItems = [
      { icon: LayoutDashboard, label: "DASHBOARD", id: "dashboard", count: 0 },
      { icon: PlusCircle, label: "SUBMIT A JOB", id: "submit-job", count: 0 },
      { icon: FileText, label: "MY JOBS", id: "my-jobs", count: 0 },
      { icon: UserCheck, label: "MY WORKERS", id: "my-workers", count: 0 },
      { icon: Heart, label: "SAVED OFFERS", id: "saved-offers", count: 0 },
      { icon: Upload, label: "DEPOSIT FUNDS", id: "deposit", count: 0 },
      { icon: DollarSign, label: "MY PAYMENTS", id: "payments", count: 0 },
      { icon: Headphones, label: "SUPPORT", id: "support", count: 0 },
      { icon: UserCog, label: "EDIT PROFILE", id: "profile", count: 0 },
      { icon: UserPlus, label: "REFER A FRIEND", id: "refer", count: 0 },
      { icon: Download, label: "WITHDRAW BONUSES", id: "withdraw", count: 0 },
      { icon: Settings, label: "SETTINGS", id: "settings", count: 0 },
    ];
  } else {
    // Tasker menu
    menuItems = [
      ...commonMenuItems,
      ...taskerMenuItems
    ];
  }

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    
    // Handle special navigation cases
    if (menuId === 'settings') {
      navigate('/settings');
      return;
    } else if (menuId === 'profile') {
      navigate('/profile/edit');
      return;
    } else if (menuId === 'dashboard') {
      const role = userRole || localStorage.getItem('userRole') || 'tasker';
      navigate(`/dashboard/${role}`);
      return;
    } else if (menuId === 'support') {
      navigate('/support');
      return;
    } else if (menuId === 'payments') {
      navigate('/payments');
      return;
    } else if (menuId === 'finished-jobs') {
      navigate('/finished-jobs');
      return;
    } else if (menuId === 'upgrade') {
      setUpgradeDialogOpen(true);
      return;
    } else if (menuId === 'submit-job') {
      // Navigate to job submission page (to be implemented)
      navigate('/submit-job');
      return;
    } else if (menuId === 'my-jobs') {
      // Navigate to my jobs page (to be implemented)
      navigate('/my-jobs');
      return;
    } else if (menuId === 'saved-offers') {
      // Navigate to saved offers page (to be implemented)
      navigate('/saved-offers');
      return;
    } else if (menuId === 'my-workers') {
      // Navigate to my workers page (to be implemented)
      navigate('/my-workers');
      return;
    }
    
    // Handle deposit/withdraw dialogs
    if (menuId === 'deposit') {
      setDepositDialogOpen(true);
    } else if (menuId === 'withdraw') {
      setWithdrawDialogOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 py-6 px-4 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              {...item}
              isActive={activeMenu === item.id || 
                (item.id === 'dashboard' && location.pathname.includes('/dashboard')) ||
                (item.id === 'profile' && location.pathname.includes('/profile')) ||
                (item.id === 'settings' && location.pathname === '/settings') ||
                (item.id === 'payments' && location.pathname === '/payments') ||
                (item.id === 'support' && location.pathname === '/support') ||
                (item.id === 'finished-jobs' && location.pathname === '/finished-jobs') ||
                (item.id === 'submit-job' && location.pathname === '/submit-job') ||
                (item.id === 'my-jobs' && location.pathname === '/my-jobs') ||
                (item.id === 'saved-offers' && location.pathname === '/saved-offers') ||
                (item.id === 'my-workers' && location.pathname === '/my-workers')}
              onClick={handleMenuClick}
              onDepositClick={item.id === 'deposit' ? () => setDepositDialogOpen(true) : undefined}
              onWithdrawClick={item.id === 'withdraw' ? () => setWithdrawDialogOpen(true) : undefined}
            />
          ))}
        </nav>
      </div>
      
      {/* Upgrade Account Section - Only for Taskers */}
      {userRole !== 'advertiser' && (
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 border-none mb-4"
            onClick={() => setUpgradeDialogOpen(true)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Upgrade Account
          </Button>
          
          <UpgradeTiers open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen} />
        </div>
      )}
      
      {/* Sign Out Button */}
      <div className={`p-4 ${userRole !== 'advertiser' ? '' : 'border-t'}`}>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign out
        </Button>
      </div>
      
      {/* Deposit Funds Dialog */}
      <DepositFundsDialog 
        open={depositDialogOpen} 
        onOpenChange={setDepositDialogOpen} 
      />

      {/* Withdraw Funds Dialog */}
      <WithdrawFundsDialog 
        open={withdrawDialogOpen} 
        onOpenChange={setWithdrawDialogOpen} 
      />
    </div>
  );
};

export default SidebarContent;
