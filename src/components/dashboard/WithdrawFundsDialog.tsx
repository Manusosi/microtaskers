
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
import { Check, Download, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface WithdrawFundsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WithdrawFundsDialog = ({ open, onOpenChange }: WithdrawFundsDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = () => {
    if (!paymentMethod || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount and select a payment method", {
        description: "Make sure all fields are filled correctly.",
      });
      return;
    }
    
    if (!accountDetails) {
      toast.error("Please enter your account details", {
        description: "We need your account information to process the withdrawal.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Withdrawal request submitted!", {
        description: `Your request to withdraw $${amount} via ${paymentMethod} is being processed.`,
      });
      // After successful submission, close the dialog
      onOpenChange(false);
      // Reset form
      setPaymentMethod("");
      setAmount("");
      setAccountDetails("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Download className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl md:text-2xl">Withdraw Funds</DialogTitle>
          <p className="text-muted-foreground mt-2">
            Request a withdrawal from your account to your preferred payment method.
          </p>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-foreground">
              Amount
            </Label>
            <div className="flex">
              <div className="flex items-center justify-center bg-muted px-3 border border-r-0 border-input rounded-l-md">
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
            {amount && parseFloat(amount) > 0 && (
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                Minimum withdrawal amount: $10.00. Processing can take 1-3 business days.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="withdrawal-method" className="text-foreground">
              Method
            </Label>
            <Select 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger id="withdrawal-method" className="w-full">
                <SelectValue placeholder="-- Select payment method --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="skrill">Skrill</SelectItem>
                <SelectItem value="wire">Wire Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "paypal" && (
            <div className="grid gap-2">
              <Label htmlFor="paypal-email">PayPal Email</Label>
              <Input 
                id="paypal-email" 
                type="email" 
                placeholder="your-email@example.com"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
              />
            </div>
          )}
          
          {paymentMethod === "skrill" && (
            <div className="grid gap-2">
              <Label htmlFor="skrill-email">Skrill Email</Label>
              <Input 
                id="skrill-email" 
                type="email" 
                placeholder="your-email@example.com"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
              />
            </div>
          )}
          
          {paymentMethod === "wire" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input 
                  id="bank-name" 
                  placeholder="Enter bank name" 
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-name">Account Holder Name</Label>
                <Input id="account-name" placeholder="Enter account holder name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-number">Account Number/IBAN</Label>
                <Input id="account-number" placeholder="Enter account number or IBAN" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="swift-code">SWIFT/BIC Code</Label>
                <Input id="swift-code" placeholder="Enter SWIFT or BIC code" />
              </div>
            </div>
          )}
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
            <p className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
              <span>
                Withdrawals are subject to review. You may be asked to verify your identity before funds are released.
              </span>
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleWithdraw} 
            className="w-full sm:w-auto"
            variant="success"
            disabled={!paymentMethod || !amount || parseFloat(amount) <= 0 || !accountDetails || isLoading}
          >
            {isLoading ? (
              <>Processing...</>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Withdraw ${amount ? parseFloat(amount).toFixed(2) : "0.00"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
