
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { SecuritySettings } from "@/components/dashboard/SecuritySettings";
import { NotificationSettings } from "@/components/dashboard/NotificationSettings";
import { ProfileSkillsSettings } from "@/components/dashboard/ProfileSkillsSettings";
import { Menu, Shield, Bell, User, Code } from "lucide-react";

const SettingsPage = () => {
  const [activeMenu, setActiveMenu] = useState("settings");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <div className="sticky top-0 left-0 right-0 h-16 bg-white border-b z-40 px-4 shadow-sm">
        <div className="h-full flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              </SheetContent>
            </Sheet>
            <Link to="/">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="Logo"
                className="h-8"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-6 ml-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <SidebarContent
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700">Settings</h2>
            </div>
            
            <Tabs defaultValue="security" className="space-y-6">
              <TabsList className="bg-white border mb-6 p-1">
                <TabsTrigger value="security" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                  <Code className="w-4 h-4 mr-2" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="security" className="mt-0">
                <SecuritySettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="skills" className="mt-0">
                <ProfileSkillsSettings />
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <p className="text-center py-6">
                    <Link to="/profile/edit" className="text-purple-600 hover:text-purple-700 font-medium">
                      Go to profile editor
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
