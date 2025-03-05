
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";

interface AccountSummaryProps {
  balance: number;
  accountType: string;
}

export const AccountSummary = ({ balance, accountType }: AccountSummaryProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Balance</h3>
        <div className="flex items-center">
          <div className="mr-3">
            <img 
              src="/lovable-uploads/ce44c630-eae9-4ff1-8b34-66bdbd935960.png" 
              alt="Balance icon" 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23fbbf24' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 6v6l4 2'%3E%3C/path%3E%3C/svg%3E";
              }}
            />
          </div>
          <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 grid grid-cols-2 gap-3">
        <Button className="bg-green-500 hover:bg-green-600">
          <Upload className="mr-2 h-4 w-4" />
          Deposit
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Download className="mr-2 h-4 w-4" />
          Withdraw
        </Button>
      </div>
      
      <div className="p-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Account Type</h4>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-sm font-medium">{accountType} account</span>
        </div>
      </div>
    </div>
  );
};
