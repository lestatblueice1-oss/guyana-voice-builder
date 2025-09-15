import { useState, useEffect } from "react";
import { Edit, Upload, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useImageUpload } from "@/hooks/useImageUpload";

interface MinistryData {
  id: string;
  ministry_id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  categories: string[];
  current_issues: string[];
  implementations: string[];
  minister_name?: string;
  minister_photo_url?: string;
}

export const AdminMinistries = () => {
  const [ministries, setMinistries] = useState<MinistryData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { uploadImage, uploading } = useImageUpload({
    bucket: "ministry-photos"
  });

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      const { data, error } = await supabase
        .from("ministry_data")
        .select("*")
        .order("name");

      if (error) throw error;
      setMinistries(data || []);
    } catch (error) {
      console.error("Error fetching ministries:", error);
      toast({
        title: "Error",
        description: "Failed to load ministries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ministry: MinistryData) => {
    setEditingId(ministry.id);
  };

  const handleSave = async (ministry: MinistryData) => {
    try {
      const { error } = await supabase
        .from("ministry_data")
        .update({
          name: ministry.name,
          address: ministry.address,
          contact: ministry.contact,
          email: ministry.email,
          categories: ministry.categories,
          current_issues: ministry.current_issues,
          implementations: ministry.implementations,
          minister_name: ministry.minister_name,
          minister_photo_url: ministry.minister_photo_url,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq("id", ministry.id);

      if (error) throw error;

      setEditingId(null);
      toast({
        title: "Success",
        description: "Ministry updated successfully",
      });
    } catch (error) {
      console.error("Error updating ministry:", error);
      toast({
        title: "Error",
        description: "Failed to update ministry",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (file: File, ministryId: string) => {
    const url = await uploadImage(file);
    if (url) {
      setMinistries(ministries.map(m => 
        m.id === ministryId 
          ? { ...m, minister_photo_url: url }
          : m
      ));
    }
  };

  const updateMinistry = (id: string, field: string, value: any) => {
    setMinistries(ministries.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading ministries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Ministry Management</h3>
        <p className="text-muted-foreground">Edit ministry information and minister details</p>
      </div>

      {ministries.map((ministry) => {
        const isEditing = editingId === ministry.id;
        
        return (
          <Card key={ministry.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{ministry.name}</CardTitle>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(ministry)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleSave(ministry)}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Minister Photo */}
              <div>
                <Label>Minister Photo</Label>
                <div className="flex items-center gap-4 mt-2">
                  {ministry.minister_photo_url ? (
                    <img 
                      src={ministry.minister_photo_url} 
                      alt="Minister"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">No Photo</span>
                    </div>
                  )}
                  {isEditing && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, ministry.id);
                        }}
                        className="hidden"
                        id={`photo-${ministry.id}`}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        disabled={uploading}
                      >
                        <label htmlFor={`photo-${ministry.id}`}>
                          <Upload className="w-4 h-4 mr-2" />
                          {uploading ? "Uploading..." : "Upload"}
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Minister Name */}
              <div>
                <Label>Minister Name</Label>
                {isEditing ? (
                  <Input
                    value={ministry.minister_name || ""}
                    onChange={(e) => updateMinistry(ministry.id, "minister_name", e.target.value)}
                    placeholder="Enter minister name"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {ministry.minister_name || "Not specified"}
                  </p>
                )}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Address</Label>
                  {isEditing ? (
                    <Textarea
                      value={ministry.address}
                      onChange={(e) => updateMinistry(ministry.id, "address", e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{ministry.address}</p>
                  )}
                </div>
                
                <div>
                  <Label>Contact</Label>
                  {isEditing ? (
                    <Input
                      value={ministry.contact}
                      onChange={(e) => updateMinistry(ministry.id, "contact", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{ministry.contact}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                {isEditing ? (
                  <Input
                    value={ministry.email}
                    onChange={(e) => updateMinistry(ministry.id, "email", e.target.value)}
                    type="email"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{ministry.email}</p>
                )}
              </div>

              {/* Categories */}
              <div>
                <Label>Categories</Label>
                {isEditing ? (
                  <Input
                    value={ministry.categories.join(", ")}
                    onChange={(e) => updateMinistry(ministry.id, "categories", e.target.value.split(", ").filter(Boolean))}
                    placeholder="Separate with commas"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{ministry.categories.join(", ")}</p>
                )}
              </div>

              {/* Current Issues */}
              <div>
                <Label>Current Issues</Label>
                {isEditing ? (
                  <Textarea
                    value={ministry.current_issues.join("\n")}
                    onChange={(e) => updateMinistry(ministry.id, "current_issues", e.target.value.split("\n").filter(Boolean))}
                    rows={3}
                    placeholder="One issue per line"
                  />
                ) : (
                  <ul className="text-sm text-muted-foreground">
                    {ministry.current_issues.map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Implementations */}
              <div>
                <Label>Current Implementations</Label>
                {isEditing ? (
                  <Textarea
                    value={ministry.implementations.join("\n")}
                    onChange={(e) => updateMinistry(ministry.id, "implementations", e.target.value.split("\n").filter(Boolean))}
                    rows={3}
                    placeholder="One implementation per line"
                  />
                ) : (
                  <ul className="text-sm text-muted-foreground">
                    {ministry.implementations.map((impl, index) => (
                      <li key={index}>• {impl}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};