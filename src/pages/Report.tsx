import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Shield, Eye, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useImageUpload } from "@/hooks/useImageUpload";
import { supabase } from "@/integrations/supabase/client";

const categories = ["Infrastructure", "Public Health", "Housing", "Education", "Transportation", "Other"];

export const Report = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { uploadImage, uploading } = useImageUpload({
    bucket: "report-evidence",
    path: user?.id
  });

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setEvidenceFiles(prev => [...prev, ...fileArray].slice(0, 3)); // Max 3 files
    }
  };

  const removeFile = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !selectedCategory) {
      toast({
        title: "Missing Information",
        description: "Please provide a title, description, and select a category.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a report.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload evidence files
      const evidenceUrls: string[] = [];
      for (const file of evidenceFiles) {
        const url = await uploadImage(file);
        if (url) evidenceUrls.push(url);
      }

      // Submit report to database
      const { error } = await supabase
        .from("reports")
        .insert({
          title: title.trim(),
          description: description.trim(),
          category: selectedCategory,
          location: location.trim() || "Not specified",
          evidence_urls: evidenceUrls,
          submitted_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Report Submitted Successfully",
        description: "Your report will be reviewed within 24 hours.",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setSelectedCategory("");
      setLocation("");
      setEvidenceFiles([]);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-civic text-primary-foreground px-4 py-6 safe-area-pt">
        <div className="max-w-md mx-auto">
          <h1 className="font-heading font-bold text-2xl mb-1">Report a Struggle</h1>
          <p className="text-primary-foreground/80 text-sm">
            Help your community by sharing important issues
          </p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Privacy Notice */}
          <Card className="p-4 bg-gradient-subtle border-card-border">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-secondary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Your privacy is protected</p>
                <p className="text-muted-foreground">
                  All reports are reviewed by AI and human moderators before publication. 
                  Personal information is kept confidential.
                </p>
              </div>
            </div>
          </Card>

          {/* Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Report Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief title describing the issue"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/100 characters
            </p>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Category <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "civic" : "outline"}
                  className="p-3 cursor-pointer text-center justify-center"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label htmlFor="location" className="text-sm font-medium text-foreground">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Specific location or area affected"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Describe the issue <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Provide details about the community struggle you want to report. Be specific about the location, impact on residents, and any relevant background information..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
          </div>

          {/* Media Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Evidence (Optional)
            </Label>
            <Card className="p-6 border-2 border-dashed border-card-border">
              <div className="text-center space-y-3">
                <Upload className="w-8 h-8 text-accent mx-auto" />
                <div>
                  <input
                    type="file"
                    accept="image/*,video/*,audio/*"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="evidence-upload"
                    disabled={uploading}
                  />
                  <Button 
                    variant="action" 
                    size="lg" 
                    className="w-full"
                    asChild
                    disabled={uploading || evidenceFiles.length >= 3}
                  >
                    <label htmlFor="evidence-upload">
                      {uploading ? "Uploading..." : "Upload Evidence"}
                    </label>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload photos, videos, or audio recordings (max 3 files)
                  </p>
                </div>
              </div>
              
              {evidenceFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Selected Files:</p>
                  {evidenceFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Review Process Notice */}
          <Card className="p-4 bg-muted/50 border-card-border">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Review Process</p>
                <p className="text-muted-foreground">
                  Reports are reviewed within 24 hours. You'll be notified when your 
                  submission is published or if additional information is needed.
                </p>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !description.trim() || !selectedCategory || uploading}
              className="w-full"
              variant="civic"
              size="lg"
            >
              {isSubmitting ? "Submitting Report..." : uploading ? "Uploading Files..." : "Submit Report"}
            </Button>
          </div>

          {/* Guidelines */}
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Reporting Guidelines</p>
                <ul className="text-amber-700 space-y-1 text-xs">
                  <li>• Focus on community issues that affect multiple residents</li>
                  <li>• Provide factual, verifiable information</li>
                  <li>• Avoid personal disputes or individual complaints</li>
                  <li>• Respect privacy - don't include personal details of others</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};