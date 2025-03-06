
import { TicketCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
        <CardContent className="p-6">
          <div className="text-center py-8 text-gray-500">
            <p>If you have any question, please feel free to create support ticket.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
