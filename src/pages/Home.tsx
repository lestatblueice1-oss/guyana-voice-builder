import { useState } from "react";
import { StruggleCard } from "@/components/StruggleCard";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { CategoryDrawer } from "@/components/CategoryDrawer";
import { GuyanaMapButton } from "@/components/GuyanaMapButton";

// Mock data for struggles
const mockStruggles = [
  {
    id: "1",
    headline: "Georgetown Market Vendors Face Persistent Flooding Issues",
    summary: "Local vendors report daily losses due to inadequate drainage system. Water accumulates during rain, damaging goods and deterring customers from accessing the market area.",
    category: "Infrastructure",
    location: "Georgetown, Region 4",
    timeAgo: "2 hours ago",
    verified: true,
  },
  {
    id: "2", 
    headline: "Rural Health Clinic Lacks Basic Medical Supplies",
    summary: "Residents of Berbice report the local clinic has been without essential medications for weeks. Many are forced to travel long distances for basic healthcare needs.",
    category: "Public Health",
    location: "Berbice, Region 6",
    timeAgo: "5 hours ago",
    verified: true,
  },
  {
    id: "3",
    headline: "Housing Development Promises Unfulfilled After Two Years",
    summary: "Families who paid deposits for affordable housing units report no progress on construction. Developer remains unreachable despite community attempts at contact.",
    category: "Housing",
    location: "Linden, Region 10",
    timeAgo: "1 day ago",
    verified: false,
  },
  {
    id: "4",
    headline: "School Children Walk Miles on Dangerous Road Daily",
    summary: "Parents express concern over children's safety on poorly maintained road to school. No street lights and heavy traffic create hazardous conditions for students.",
    category: "Education",
    location: "Anna Regina, Region 2",
    timeAgo: "2 days ago",
    verified: true,
  },
];

const categories = ["All", "Infrastructure", "Public Health", "Housing", "Education", "Transportation", "Victimization"];

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredStruggles = activeCategory === "All" 
    ? mockStruggles 
    : mockStruggles.filter(struggle => struggle.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-civic text-primary-foreground px-4 py-6 safe-area-pt">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <GuyanaMapButton onClick={() => setIsDrawerOpen(true)} />
            <div className="flex-1">
              <h1 className="font-heading font-bold text-2xl mb-1">The Citizen's Voice</h1>
            </div>
          </div>
          <p className="text-primary-foreground/80 text-sm ml-11">
            Amplifying community struggles across Guyana
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 border-b border-card-border bg-card">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-medium text-neutral-600">Filter by category</span>
          </div>
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

      {/* Struggles Feed */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          {filteredStruggles.length > 0 ? (
            filteredStruggles.map((struggle) => (
              <StruggleCard key={struggle.id} {...struggle} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-400">No struggles found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Category Drawer */}
      <CategoryDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCategorySelect={(category) => {
          setActiveCategory(category);
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};