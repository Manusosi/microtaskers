
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface Registration {
  id: number;
  username: string;
  email: string;
  role: string;
  country: string;
  registeredAt: string;
}

interface RecentRegistrationsTableProps {
  registrations: Registration[];
}

export const RecentRegistrationsTable = ({ registrations }: RecentRegistrationsTableProps) => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Registered</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {registrations.map((registration) => (
          <TableRow key={registration.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{registration.username}</div>
                  <div className="text-xs text-gray-500">{registration.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{getRoleBadge(registration.role)}</TableCell>
            <TableCell>{registration.country}</TableCell>
            <TableCell>
              {new Date(registration.registeredAt).toLocaleString(undefined, {
                dateStyle: 'short',
                timeStyle: 'short'
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
