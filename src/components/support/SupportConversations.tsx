
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const SupportConversations = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <MessageCircle className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Conversations</h2>
      </div>
      
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-8 text-gray-500">
            <p>You do not have conversations with users at this time.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
