
import { MessageCircle, User, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SupportConversations = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-purple-100 p-2 rounded-lg">
          <MessageCircle className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Conversations</h2>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Support Chat History</CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-2">You don't have any conversations with our support team yet.</p>
            <p className="text-sm text-gray-400 mb-6">When you chat with our support agents, your conversations will appear here.</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Start a New Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
