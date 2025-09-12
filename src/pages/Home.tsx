import { useState } from "react";
import { StruggleCard } from "@/components/StruggleCard";
import { Badge } from "@/components/ui/badge";
import { CategoryDrawer } from "@/components/CategoryDrawer";
import { UserAvatar } from "@/components/UserAvatar";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { Search, Sparkles, Loader } from "lucide-react";
import { useStruggles } from "@/hooks/useApi";

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

  const { struggles, loading, error } = useStruggles();

  const filteredStruggles = activeCategory === "All" 
    ? struggles 
    : struggles.filter(struggle => struggle.category === activeCategory);

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
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-destructive">Error: {error}</p>
            </div>
          ) : filteredStruggles.length > 0 ? (
            filteredStruggles.map((struggle) => (
              <StruggleCard 
                key={struggle.id} 
                {...struggle} 
                timeAgo={formatTimeAgo(struggle.created_at)}
              />
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