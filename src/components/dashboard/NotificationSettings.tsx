
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Email notification preferences
  const [notifications, setNotifications] = useState([
    { id: "newsletter", label: "I wish to receive newsletter", checked: true },
    { id: "newJob", label: "Notify me for new job by email", checked: false },
    { id: "jobInvitation", label: "Notify me for new job invitation", checked: false },
    { id: "taskCompleted", label: "Notify me for task completed", checked: false },
    { id: "newOrder", label: "Notify me for new order by email", checked: false },
  ]);
  
  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { user } = session;
          
          // Set notification preferences if available
          if (user.user_metadata?.notifications) {
            const userNotifications = user.user_metadata.notifications;
            setNotifications(notifications.map(notification => ({
              ...notification,
              checked: userNotifications[notification.id] || notification.id === "newsletter"
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching user notifications:", error);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  // Handle notification checkbox change
  const handleNotificationChange = (id: string, checked: boolean) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, checked } : notification
    ));
  };
  
  // Save notification settings
  const saveNotificationSettings = async () => {
    try {
      setLoading(true);
      
      // Collect notification preferences
      const notificationPreferences = Object.fromEntries(
        notifications.map(notification => [notification.id, notification.checked])
      );
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          notifications: notificationPreferences,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved",
      });
    } catch (error: any) {
      console.error("Error updating notification settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update notification settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-purple-600" size={18} />
        <h3 className="font-semibold text-gray-700">Email Notifications</h3>
      </div>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`notification-${notification.id}`}
              checked={notification.checked}
              onCheckedChange={(checked) => 
                handleNotificationChange(notification.id, checked as boolean)
              }
              className="text-purple-600 border-purple-200 data-[state=checked]:bg-purple-600"
            />
            <Label 
              htmlFor={`notification-${notification.id}`}
              className="text-sm text-gray-600 cursor-pointer"
            >
              {notification.label}
            </Label>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={saveNotificationSettings}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
