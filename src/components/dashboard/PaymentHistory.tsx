
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Payment {
  id: number;
  date: string;
  referenceId: string;
  paymentType: string;
  method: string;
  status: string;
  fee: string;
  amount: number;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            ✓ paid
          </Badge>
        );
      case 'awaiting approval':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
            ⏱ awaiting approval
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reference ID</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.date}</TableCell>
                <TableCell>{payment.referenceId}</TableCell>
                <TableCell>
                  {payment.paymentType}
                  {payment.paymentType === "Withdrawal" && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-4 w-4 inline text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Withdrawal is being processed</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </TableCell>
                <TableCell>
                  {payment.method === "PayPal" ? (
                    <div className="flex items-center">
                      <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                           alt="PayPal" 
                           className="h-5 mr-1" />
                      PayPal
                    </div>
                  ) : (
                    payment.method
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell>{payment.fee}</TableCell>
                <TableCell className="font-semibold text-right">
                  ${payment.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
