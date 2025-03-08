
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ProfileSkillsSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
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

  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { user } = session;
          
          // Set skills if available
          if (user.user_metadata?.skills && Array.isArray(user.user_metadata.skills)) {
            const userSkills = user.user_metadata.skills;
            setSkills(skills.map(skill => ({
              ...skill,
              checked: userSkills.includes(skill.id)
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching user skills:", error);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  // Handle skill checkbox change
  const handleSkillChange = (id: string, checked: boolean) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, checked } : skill
    ));
  };
  
  // Save skills settings
  const saveSkillsSettings = async () => {
    try {
      setLoading(true);
      
      // Collect the selected skills
      const selectedSkills = skills
        .filter(skill => skill.checked)
        .map(skill => skill.id);
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          skills: selectedSkills,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Skills updated",
        description: "Your worker skills have been saved",
      });
    } catch (error: any) {
      console.error("Error updating skills:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update skills",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
      
      <div className="mt-6">
        <Button 
          onClick={saveSkillsSettings}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {loading ? "Saving..." : "Save Skills"}
        </Button>
      </div>
    </div>
  );
};
