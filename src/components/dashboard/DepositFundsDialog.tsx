
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface DepositFundsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DepositFundsDialog = ({ open, onOpenChange }: DepositFundsDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    // Here you would implement the actual deposit logic
    console.log("Depositing", amount, "via", paymentMethod);
    // After successful deposit, close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Upload className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-xl md:text-2xl">Deposit Funds</DialogTitle>
          <p className="text-gray-500 mt-2">
            Here you can select the amount you wish to deposit into your account.
          </p>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="payment-method" className="text-gray-700">
              Payment Method:
            </Label>
            <Select 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger id="payment-method" className="w-full">
                <SelectValue placeholder="-- Select payment method --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="card">Visa/Mastercard</SelectItem>
                <SelectItem value="mpesa">MPesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-gray-700">
              Amount:
            </Label>
            <div className="flex">
              <div className="flex items-center justify-center bg-gray-100 px-3 border border-r-0 border-input rounded-l-md">
                $
              </div>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="rounded-l-none"
                min="1"
                step="0.01"
              />
            </div>
          </div>

          {paymentMethod === "paypal" && (
            <div className="flex justify-center mt-2">
              <img 
                src="/lovable-uploads/8f9d29db-dbc7-4448-b4dd-bade2ab7eda8.png" 
                alt="PayPal Payment Options" 
                className="h-12 border rounded p-1"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeposit} 
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600"
            disabled={!paymentMethod || !amount || parseFloat(amount) <= 0}
          >
            Deposit Funds
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
