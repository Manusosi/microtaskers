
import { TicketCheck, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SupportTickets = () => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3">
        <div className="bg-purple-100 p-2 rounded-lg">
          <TicketCheck className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Support Tickets</h2>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Tickets</CardTitle>
          <CardDescription>Track all your support requests</CardDescription>
        </CardHeader>
        <CardContent className="pt-1">
          <div className="text-center py-8 text-gray-500">
            <TicketCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-2">You don't have any active support tickets.</p>
            <p className="text-sm text-gray-400 mb-6">If you encounter any issues or have questions, feel free to create a new support ticket.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
