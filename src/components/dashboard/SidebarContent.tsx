
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { MenuItem } from "./MenuItem";
import { useState } from "react";
import { DepositFundsDialog } from "./DepositFundsDialog";
import { WithdrawFundsDialog } from "./WithdrawFundsDialog";

export interface SidebarContentProps {
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const SidebarContent = ({ activeMenu, setActiveMenu, onLogout, isLoggedIn }: SidebarContentProps) => {
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", count: 0 },
    { icon: DollarSign, label: "My Payments", id: "payments", count: 0 },
    { icon: Upload, label: "Deposit Funds", id: "deposit", count: 0 },
    { icon: Download, label: "Withdraw Funds", id: "withdraw", count: 0 },
    { icon: Headphones, label: "Support", id: "support", count: 0 },
    { icon: UserPlus, label: "Refer a Friend", id: "refer", count: 0 },
    { icon: UserCog, label: "Edit Profile", id: "profile", count: 0 },
    { icon: Gift, label: "My Offers", id: "offers", count: 0 },
    { icon: Briefcase, label: "Available Jobs", id: "available-jobs", count: 0 },
    { icon: CheckSquare, label: "Finished Jobs", id: "finished-jobs", count: 0 },
    { icon: MessageSquare, label: "Job Invitations", id: "invitations", count: 2 },
    { icon: Settings, label: "Settings", id: "settings", count: 0 },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              {...item}
              isActive={activeMenu === item.id}
              onClick={setActiveMenu}
              onDepositClick={item.id === 'deposit' ? () => setDepositDialogOpen(true) : undefined}
              onWithdrawClick={item.id === 'withdraw' ? () => setWithdrawDialogOpen(true) : undefined}
            />
          ))}
        </nav>
      </div>
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
