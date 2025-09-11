import { useState } from "react";
import { BarChart3, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StruggleCard } from "@/components/StruggleCard";
import { ResourcesTracker } from "@/components/ResourcesTracker";
import { Button } from "@/components/ui/button";

// Mock data for resource stories
const resourceStories = [
  {
    id: "oil-1",
    headline: "ExxonMobil Reports Record 380,000 BPD from Stabroek Block",
    summary: "Latest production figures show Guyana's oil output reaching new heights with three FPSOs operational. Revenue sharing benefits local communities.",
    category: "Oil & Gas",
    location: "Stabroek Block, Offshore",
    timeAgo: "3 hours ago",
    verified: true,
  },
  {
    id: "mining-1",
    headline: "Aurora Gold Mine Expands Operations in Region 7",
    summary: "New mining concessions approved for expanded gold extraction. Local employment opportunities increase by 200 positions.",
    category: "Mining",
    location: "Cuyuni-Mazaruni, Region 7",
    timeAgo: "6 hours ago",
    verified: true,
  },
  {
    id: "agriculture-1",
    headline: "Rice Production Reaches 700,000 Tonnes This Season",
    summary: "Favorable weather conditions and improved irrigation systems boost rice yields across Region 2 and 3 farming areas.",
    category: "Agriculture",
    location: "Essequibo, Region 2",
    timeAgo: "1 day ago",
    verified: true,
  },
  {
    id: "timber-1",
    headline: "Sustainable Logging Initiative Launched in Region 8",
    summary: "New forestry management program aims to balance timber extraction with environmental conservation efforts.",
    category: "Timber",
    location: "Potaro-Siparuni, Region 8",
    timeAgo: "2 days ago",
    verified: false,
  },
  {
    id: "bauxite-1",
    headline: "BOSAI Bauxite Company Increases Annual Production Target",
    summary: "Chinese-owned mining operation announces 15% increase in bauxite extraction for export to aluminum refineries.",
    category: "Bauxite",
    location: "Linden, Region 10",
    timeAgo: "3 days ago",
    verified: true,
  }
];

const categories = ["All", "Oil & Gas", "Mining", "Timber", "Bauxite", "Agriculture"];

interface ResourcesProps {
  selectedResource?: string;
  onBack: () => void;
}

export const Resources = ({ selectedResource, onBack }: ResourcesProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  const filteredStories = activeCategory === "All" 
    ? resourceStories 
    : resourceStories.filter(story => story.category === activeCategory);

  if (selectedResource) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-gradient-civic text-primary-foreground p-6">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-heading font-bold text-2xl">{selectedResource.replace('-', ' & ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Dashboard</h1>
          </div>
        </div>

        <div className="p-6">
          {/* Mock dashboard content */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg border border-card-border">
              <h3 className="text-sm text-muted-foreground mb-1">Daily Production</h3>
              <p className="text-2xl font-bold text-primary">380K BPD</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-card-border">
              <h3 className="text-sm text-muted-foreground mb-1">Monthly Revenue</h3>
              <p className="text-2xl font-bold text-secondary">$2.1B</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg border border-card-border">
            <h3 className="font-semibold mb-2">Production Trend</h3>
            <div className="h-32 bg-gradient-subtle rounded flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart visualization</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-civic text-primary-foreground px-4 py-6 safe-area-pt">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-heading font-bold text-2xl">Resources Watch</h1>
            <button
              onClick={() => setIsTrackerOpen(true)}
              className="px-4 py-2 bg-primary-foreground/10 rounded-lg text-sm font-medium hover:bg-primary-foreground/20 transition-all duration-200"
            >
              Tracker
            </button>
          </div>
          <p className="text-primary-foreground/80 text-sm">
            Monitor Guyana's natural resource developments
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 border-b border-card-border bg-card">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "civic" : "outline"}
                className="whitespace-nowrap cursor-pointer"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Feed */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <StruggleCard key={story.id} {...story} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-400">No resource stories found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Resources Tracker Drawer */}
      <ResourcesTracker 
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        onResourceSelect={() => {}}
      />
    </div>
  );
};