
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";

export interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  count: number;
  id: string;
  isActive?: boolean;
  onClick: (id: string) => void;
}

export const MenuItem = ({ icon: Icon, label, count, id, isActive, onClick }: MenuItemProps) => (
  <button
    onClick={() => onClick(id)}
    className={cn(
      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
      isActive
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
