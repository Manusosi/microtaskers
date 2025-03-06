import React, { useState } from "react";
import {
  Home,
  Briefcase,
  Wallet,
  MessageCircle,
  Settings,
  LogOut,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => (
  <Button
    variant="ghost"
    className={`w-full justify-start px-4 py-2.5 rounded-md font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
      active ? "bg-accent text-accent-foreground" : ""
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </Button>
);

const SidebarContent = ({
  activeMenu,
  setActiveMenu,
  onLogout,
  isLoggedIn,
}: {
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
  onLogout: () => void;
  isLoggedIn: boolean;
}) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-6">
        <Link to="/" className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-lg font-bold">Microtaskers</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        <div className="space-y-1">
          <MenuItem
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            active={activeMenu === "dashboard"}
            onClick={() => {
              setActiveMenu("dashboard");
              navigate("/dashboard");
            }}
          />
          <MenuItem
            icon={<Briefcase className="h-5 w-5" />}
            label="Jobs"
            active={activeMenu === "jobs"}
            onClick={() => {
              setActiveMenu("jobs");
              navigate("/jobs");
            }}
          />
          <MenuItem
            icon={<Wallet className="h-5 w-5" />}
            label="Payments"
            active={activeMenu === "payments"}
            onClick={() => {
              setActiveMenu("payments");
              navigate("/payments");
            }}
          />
          <MenuItem
            icon={<MessageCircle className="h-5 w-5" />}
            label="Support"
            active={activeMenu === "support"}
            onClick={() => {
              setActiveMenu("support");
              navigate("/support");
            }}
          />
          <MenuItem
            icon={<UserPlus className="h-5 w-5" />}
            label="Refer a Friend"
            active={activeMenu === "refer"}
            onClick={() => {
              setActiveMenu("refer");
              navigate("/refer");
            }}
          />
        </div>
        
        <div>
          <h3 className="font-medium text-sm px-4">Settings</h3>
          <div className="space-y-1 mt-2">
            <MenuItem
              icon={<Settings className="h-5 w-5" />}
              label="Account"
              active={activeMenu === "account"}
              onClick={() => {
                setActiveMenu("account");
                navigate("/account");
              }}
            />
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={onLogout}
          disabled={!isLoggedIn}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default SidebarContent;
