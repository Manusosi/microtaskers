
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PaymentSummaryProps {
  summary: {
    accountBalance: number;
    totalDeposit: number;
    totalWithdrawal: number;
  };
}

export const PaymentSummary = ({ summary }: PaymentSummaryProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-1 flex flex-col items-start">
            <span className="text-gray-600 font-medium">Account Balance:</span>
            <span className="text-2xl font-bold text-green-600">
              ${summary.accountBalance.toFixed(2)}
            </span>
          </div>
          
          <div className="col-span-3 md:col-span-1 flex flex-col items-center">
            <span className="text-gray-600 font-medium">Total Deposit:</span>
            <span className="text-2xl font-bold text-gray-800">
              {summary.totalDeposit}
            </span>
          </div>
          
          <div className="col-span-3 md:col-span-1 flex flex-col items-end">
            <span className="text-gray-600 font-medium">Total Withdrawal:</span>
            <span className="text-2xl font-bold text-gray-800">
              {summary.totalWithdrawal}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
