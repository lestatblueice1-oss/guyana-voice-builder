import { useState } from "react";
import { BarChart3, ArrowLeft, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StruggleCard } from "@/components/StruggleCard";
import { ResourcesTracker } from "@/components/ResourcesTracker";
import { Button } from "@/components/ui/button";
import { useResources, useLiveResourceData } from "@/hooks/useApi";

const categories = ["All", "Oil & Gas", "Mining", "Timber", "Bauxite", "Agriculture"];

interface ResourcesProps {
  selectedResource?: string;
  onBack: () => void;
}

export const Resources = ({ selectedResource, onBack }: ResourcesProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  const { resources, loading: resourcesLoading, error: resourcesError } = useResources();
  const { liveData, loading: liveLoading } = useLiveResourceData();

  const filteredStories = activeCategory === "All" 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  // Format timeAgo from created_at
  const formatTimeAgo = (created_at: string) => {
    const now = new Date();
    const created = new Date(created_at);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / 60000);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

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
          {/* Live dashboard content */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg border border-card-border">
              <h3 className="text-sm text-muted-foreground mb-1">Daily Production</h3>
              {liveLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <p className="text-2xl font-bold text-primary">
                  {liveData?.oil_production?.daily_barrels?.toLocaleString() || '380K'} BPD
                </p>
              )}
            </div>
            <div className="bg-card p-4 rounded-lg border border-card-border">
              <h3 className="text-sm text-muted-foreground mb-1">Monthly Revenue</h3>
              {liveLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <p className="text-2xl font-bold text-secondary">
                  ${(liveData?.revenue?.monthly_usd / 1000000).toFixed(1) || '2.1'}B
                </p>
              )}
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
          {resourcesLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : resourcesError ? (
            <div className="text-center py-8">
              <p className="text-destructive">Error: {resourcesError}</p>
            </div>
          ) : filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <StruggleCard 
                key={story.id} 
                {...story} 
                headline={story.title}
                summary={story.description}
                timeAgo={formatTimeAgo(story.created_at)}
                verified={true}
              />
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