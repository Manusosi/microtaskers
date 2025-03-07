
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Lock, 
  Edit, 
  Camera, 
  ExternalLink, 
  ChevronDown, 
  Info,
  DollarSign,
  SaveIcon,
  X,
  Check,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const EditProfile = () => {
  const { toast } = useToast();
  
  // Profile information state
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    accountType: "Standard Account",
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    minJobPrice: "5.00",
    bio: "",
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Skills state with initial data
  const [skills, setSkills] = useState([
    { id: "signup", label: "Sign up", checked: false },
    { id: "clickSearch", label: "Click or Search", checked: false },
    { id: "youtube", label: "Youtube", checked: false },
    { id: "facebook", label: "Facebook", checked: false },
    { id: "twitter", label: "Twitter", checked: false },
    { id: "forums", label: "Forums", checked: false },
    { id: "writeArticle", label: "Write an Article", checked: false },
    { id: "writeReview", label: "Write a Review", checked: false },
    { id: "votingRating", label: "Voting & Rating", checked: false },
    { id: "surveys", label: "Surveys", checked: false },
    { id: "websiteOwners", label: "Website Owners", checked: false },
    { id: "leads", label: "Leads", checked: false },
    { id: "dataMining", label: "Data Mining", checked: false },
    { id: "writeComment", label: "Write a Comment", checked: false },
    { id: "searchClick", label: "Search & Click", checked: false },
    { id: "bookmark", label: "Bookmark", checked: false },
    { id: "contentModeration", label: "Content Moderation", checked: false },
    { id: "other", label: "Other", checked: false },
  ]);
  
  // Email notification preferences
  const [notifications, setNotifications] = useState([
    { id: "newsletter", label: "I wish to receive newsletter", checked: true },
    { id: "newJob", label: "Notify me for new job by email", checked: false },
    { id: "jobInvitation", label: "Notify me for new job invitation", checked: false },
    { id: "taskCompleted", label: "Notify me for task completed", checked: false },
    { id: "newOrder", label: "Notify me for new order by email", checked: false },
  ]);

  // Character count state
  const [bioCharCount, setBioCharCount] = useState(0);
  const maxBioChars = 400;
  
  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { user } = session;
          setUserId(user.id);
          
          // Set email from auth
          setFormData(prev => ({
            ...prev,
            email: user.email || "",
            username: user.user_metadata?.username || user.email?.split('@')[0] || "",
            firstName: user.user_metadata?.first_name || "",
            lastName: user.user_metadata?.last_name || "",
            phone: user.phone || user.user_metadata?.phone || "",
            country: user.user_metadata?.country || "United States",
          }));
          
          // Check if the user has an avatar
          if (user.user_metadata?.avatar_url) {
            setAvatarUrl(user.user_metadata.avatar_url);
          }
          
          // Set bio character count
          if (user.user_metadata?.bio) {
            setFormData(prev => ({
              ...prev,
              bio: user.user_metadata.bio
            }));
            setBioCharCount(user.user_metadata.bio.length);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [toast]);
  
  // Handle avatar change
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Check file size (maximum 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Avatar ready",
        description: "Your avatar will be changed after saving changes",
      });
    }
  };
  
  // Handle form data change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "bio") {
      // Limit bio to maxBioChars characters
      if (value.length <= maxBioChars) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setBioCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle skill checkbox change
  const handleSkillChange = (id: string, checked: boolean) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, checked } : skill
    ));
  };
  
  // Handle notification checkbox change
  const handleNotificationChange = (id: string, checked: boolean) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, checked } : notification
    ));
  };
  
  // Submit password change
  const handlePasswordSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    }
  };
  
  // Upload avatar to storage
  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatar || !userId) return null;
    
    try {
      // Create a unique file name
      const fileExt = avatar.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatar);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  };
  
  // Submit profile changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Upload avatar if changed
      let avatarUpdated = false;
      let avatarPublicUrl = avatarUrl;
      
      if (avatar) {
        avatarPublicUrl = await uploadAvatar();
        avatarUpdated = true;
      }
      
      // Collect the selected skills
      const selectedSkills = skills
        .filter(skill => skill.checked)
        .map(skill => skill.id);
      
      // Collect notification preferences
      const notificationPreferences = Object.fromEntries(
        notifications.map(notification => [notification.id, notification.checked])
      );
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
          min_job_price: formData.minJobPrice,
          bio: formData.bio,
          skills: selectedSkills,
          notifications: notificationPreferences,
          account_type: formData.accountType,
          ...(avatarUpdated && { avatar_url: avatarPublicUrl }),
        },
      });
      
      if (error) throw error;
      
      // Update local avatar state if needed
      if (avatarUpdated && avatarPublicUrl) {
        setAvatarUrl(avatarPublicUrl);
        setAvatar(null);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Profile preview component
  const ProfilePreview = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-purple-100">
            {avatarPreview ? (
              <img 
                src={avatarPreview} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-100">
                <User className="text-purple-600 h-12 w-12" />
              </div>
            )}
          </div>
          <h2 className="mt-4 font-semibold text-xl">{formData.firstName} {formData.lastName}</h2>
          <p className="text-gray-500">@{formData.username}</p>
          <div className="mt-2 inline-block bg-purple-100 px-3 py-1 rounded-full text-purple-800 text-sm">
            {formData.accountType}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p>{formData.email}</p>
            </div>
            {formData.phone && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p>{formData.phone}</p>
              </div>
            )}
            {formData.company && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company</h3>
                <p>{formData.company}</p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500">Country</h3>
              <p>{formData.country}</p>
            </div>
          </div>
        </div>
        
        {formData.bio && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">About Me</h3>
            <p className="text-gray-700">{formData.bio}</p>
          </div>
        )}
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.filter(skill => skill.checked).map(skill => (
              <span key={skill.id} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {skill.label}
              </span>
            ))}
            {skills.filter(skill => skill.checked).length === 0 && (
              <p className="text-gray-500 italic">No skills selected</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
            <Edit className="text-white" size={20} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">Edit Profile</h2>
        </div>
        
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
              <Eye size={14} className="mr-1" />
              View my profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Profile Preview</DialogTitle>
            </DialogHeader>
            <ProfilePreview />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Avatar and Password */}
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="text-purple-600" size={18} />
              <h3 className="font-semibold text-gray-700">Avatar</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full overflow-hidden mb-4 flex items-center justify-center">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover"
                  />
                ) : avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-purple-600" size={40} />
                )}
              </div>
              
              <Input 
                id="avatar-upload" 
                type="file" 
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              
              <Label 
                htmlFor="avatar-upload" 
                className="bg-purple-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
              >
                <Camera size={16} />
                Change avatar
              </Label>
              
              <p className="text-xs text-gray-500 mt-2">Max. file size: 5MB</p>
            </div>
          </div>
          
          {/* Password Change Section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-purple-600" size={18} />
              <h3 className="font-semibold text-gray-700">Change password</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-sm text-gray-600">
                  Current Password
                </Label>
                <Input 
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="newPassword" className="text-sm text-gray-600">
                  New password
                </Label>
                <Input 
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="text-sm text-gray-600">
                  Confirm password
                </Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                onClick={handlePasswordSubmit}
                disabled={loading}
              >
                Change Password
              </Button>
            </div>
          </div>
          
          {/* Worker Skills Section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-purple-600" size={18} />
              <h3 className="font-semibold text-gray-700">Worker Skills</h3>
            </div>
            
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skill-${skill.id}`}
                    checked={skill.checked}
                    onCheckedChange={(checked) => 
                      handleSkillChange(skill.id, checked as boolean)
                    }
                    className="text-purple-600 border-purple-200 data-[state=checked]:bg-purple-600"
                  />
                  <Label 
                    htmlFor={`skill-${skill.id}`}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {skill.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle and Right columns - Main form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details */}
              <div className="text-gray-500 flex items-center">
                <span>Registered as</span>
              </div>
              <div className="text-gray-700">worker</div>
              
              <div>
                <Label htmlFor="username" className="text-sm text-gray-600">
                  Username<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div className="flex items-end">
                <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded-md text-sm flex items-center">
                  <Info size={14} className="mr-1" />
                  {formData.accountType}
                </div>
              </div>
              
              {/* Personal Details */}
              <div>
                <Label htmlFor="firstName" className="text-sm text-gray-600">
                  First Name<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-sm text-gray-600">
                  Last Name<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm text-gray-600">
                  Email Address<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled
                  className="border-purple-200 focus-visible:ring-purple-400 bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <Label htmlFor="company" className="text-sm text-gray-600">
                  Company
                </Label>
                <Input 
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              {/* Address Details */}
              <div>
                <Label htmlFor="addressLine1" className="text-sm text-gray-600">
                  Address Line 1
                </Label>
                <Input 
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="addressLine2" className="text-sm text-gray-600">
                  Address Line 2
                </Label>
                <Input 
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="city" className="text-sm text-gray-600">
                  City
                </Label>
                <Input 
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="state" className="text-sm text-gray-600">
                  State
                </Label>
                <Input 
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode" className="text-sm text-gray-600">
                  Zip Code
                </Label>
                <Input 
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="country" className="text-sm text-gray-600">
                  Country
                </Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleSelectChange("country", value)}
                >
                  <SelectTrigger className="border-purple-200 focus:ring-purple-400">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">
                      <div className="flex items-center">
                        <span className="mr-2">🇺🇸</span>
                        United States
                      </div>
                    </SelectItem>
                    <SelectItem value="Canada">
                      <div className="flex items-center">
                        <span className="mr-2">🇨🇦</span>
                        Canada
                      </div>
                    </SelectItem>
                    <SelectItem value="United Kingdom">
                      <div className="flex items-center">
                        <span className="mr-2">🇬🇧</span>
                        United Kingdom
                      </div>
                    </SelectItem>
                    <SelectItem value="Australia">
                      <div className="flex items-center">
                        <span className="mr-2">🇦🇺</span>
                        Australia
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm text-gray-600">
                  Phone
                </Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div className="flex items-end gap-2">
                <Label htmlFor="minJobPrice" className="text-sm text-gray-600 mb-2 flex items-center">
                  Min Job Price 
                  <div className="ml-1 cursor-help relative group">
                    <Info size={14} className="text-purple-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-xs rounded w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                      The minimum amount you are willing to accept for a job
                    </div>
                  </div>
                </Label>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input 
                    id="minJobPrice"
                    name="minJobPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.minJobPrice}
                    onChange={handleInputChange}
                    className="pl-8 border-purple-200 focus-visible:ring-purple-400"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="bio" className="text-sm text-gray-600">
                    Something about you
                  </Label>
                  <span className={`text-xs ${bioCharCount > maxBioChars * 0.9 ? 'text-amber-600' : 'text-gray-500'}`}>
                    {bioCharCount}/{maxBioChars} characters
                  </span>
                </div>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="h-32 border-purple-200 focus-visible:ring-purple-400"
                  placeholder="Tell us about yourself... (max 400 characters)"
                  maxLength={maxBioChars}
                />
              </div>
              
              {/* Email Notifications */}
              <div className="md:col-span-2 border-t pt-4 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-purple-600">
                    <Bell />
                  </div>
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
              </div>
              
              {/* Action Buttons */}
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
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
