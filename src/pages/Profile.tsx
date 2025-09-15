import { useState, useEffect } from "react";
import { User, MapPin, Calendar, Edit3, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useImageUpload } from "@/hooks/useImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id?: string;
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  date_of_birth?: string;
  district_location?: string;
}

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { uploadImage, uploading } = useImageUpload({
    bucket: "profile-images",
    path: user?.id
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        // Create default profile if doesn't exist
        const newProfile: UserProfile = {
          user_id: user.id,
          display_name: user.email?.split('@')[0] || "User",
          district_location: "Georgetown, Region 4"
        };
        
        const { data: createdProfile, error: createError } = await supabase
          .from("profiles")
          .insert(newProfile)
          .select()
          .single();

        if (createError) throw createError;
        setProfile(createdProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    const url = await uploadImage(file);
    if (url && profile) {
      const updatedProfile = { ...profile, avatar_url: url };
      setProfile(updatedProfile);
      await updateProfile(updatedProfile);
    }
  };

  const updateProfile = async (updatedProfile: UserProfile) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("user_id", user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (profile) {
      await updateProfile(profile);
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-civic rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-primary-foreground" />
                </div>
              )}
              
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    asChild
                    disabled={uploading}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <label htmlFor="avatar-upload">
                      <Upload className="w-4 h-4" />
                    </label>
                  </Button>
                </div>
              )}
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
              {profile?.display_name || "User"}
            </h1>
            <p className="text-muted-foreground">Active Citizen Reporter</p>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input
                        id="display-name"
                        value={profile?.display_name || ""}
                        onChange={(e) => profile && setProfile({...profile, display_name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="date-of-birth">Date of Birth</Label>
                      <Input
                        id="date-of-birth"
                        type="date"
                        value={profile?.date_of_birth || ""}
                        onChange={(e) => profile && setProfile({...profile, date_of_birth: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="district">District Location</Label>
                      <Input
                        id="district"
                        value={profile?.district_location || ""}
                        onChange={(e) => profile && setProfile({...profile, district_location: e.target.value})}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">
                          {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "Not set"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">District Location</p>
                        <p className="font-medium">{profile?.district_location || "Not set"}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-sm text-muted-foreground">Reports Submitted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">8</p>
                    <p className="text-sm text-muted-foreground">Issues Resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Contribution Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className="bg-gradient-civic h-2 rounded-full w-3/4"></div>
                      </div>
                      <span className="text-sm font-medium">750</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your reports have helped improve community infrastructure and services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};