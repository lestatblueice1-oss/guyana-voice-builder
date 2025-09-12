import { useState } from "react";
import { StruggleCard } from "@/components/StruggleCard";
import { Badge } from "@/components/ui/badge";
import { CategoryDrawer } from "@/components/CategoryDrawer";
import { UserAvatar } from "@/components/UserAvatar";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { Search, Sparkles } from "lucide-react";

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
    category: "Health",
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

const categories = ["All", "Infrastructure", "Health", "Housing", "Education", "Transportation", "Victimization"];

interface HomeProps {
  onProfileMenuSelect: (menu: string) => void;
}

export const Home = ({ onProfileMenuSelect }: HomeProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredStruggles = activeCategory === "All" 
    ? mockStruggles 
    : mockStruggles.filter(struggle => struggle.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-civic text-primary-foreground px-4 py-6 safe-area-pt">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <UserAvatar onClick={() => setIsProfileDrawerOpen(true)} />
            <div className="flex-1">
              <h1 className="font-heading font-bold text-2xl">The Citizen's Voice</h1>
              <p className="text-primary-foreground/80 text-sm mt-1">
                Amplifying community struggles across Guyana
              </p>
            </div>
          </div>
          
          {/* Search and AI Help */}
          <div className="ml-11 mt-3 flex items-center gap-3">
            <div className={`flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-3 py-2 transition-all duration-200 ${
              isSearchFocused ? "bg-primary-foreground/20" : ""
            }`}>
              <Search className="w-4 h-4 text-primary-foreground/60" />
              <input
                type="text"
                placeholder="Search entire app..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/60 border-none outline-none w-40"
              />
            </div>
            
            <button className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg px-3 py-2 transition-all duration-200">
              <Sparkles className="w-4 h-4 text-primary-foreground/80" />
              <span className="text-sm text-primary-foreground/80">AI Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Struggles Feed */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          {mockStruggles.length > 0 ? (
            mockStruggles.map((struggle) => (
              <StruggleCard key={struggle.id} {...struggle} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-400">No struggles found.</p>
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

      {/* Profile Drawer */}
      <ProfileDrawer 
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        onMenuSelect={onProfileMenuSelect}
      />
    </div>
  );
};