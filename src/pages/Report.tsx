import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Shield, Eye, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Infrastructure", "Public Health", "Housing", "Education", "Transportation", "Other"];

export const Report = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!description.trim() || !selectedCategory) {
      toast({
        title: "Missing Information",
        description: "Please provide a description and select a category.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted Successfully",
        description: "Your report will be reviewed within 24 hours.",
      });
      
      // Reset form
      setDescription("");
      setSelectedCategory("");
    }, 2000);
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
          <Card className="p-6 border-2 border-dashed border-card-border">
            <div className="text-center space-y-3">
              <Upload className="w-8 h-8 text-accent mx-auto" />
              <div>
                <Button variant="action" size="lg" className="w-full">
                  Upload Video/Audio Evidence
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Optional: Add photos, videos, or audio recordings to support your report
                </p>
              </div>
            </div>
          </Card>

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
              disabled={isSubmitting || !description.trim() || !selectedCategory}
              className="w-full"
              variant="civic"
              size="lg"
            >
              {isSubmitting ? "Submitting Report..." : "Submit Report"}
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