import { Home, Plus, MapPin, BarChart, Diamond, Bot } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "districts", icon: MapPin, label: "Districts" },
    { id: "dashboard", icon: BarChart, label: "Dashboard" },
    { id: "report", icon: Plus, label: "Report" },
    { id: "ai-help", icon: Bot, label: "AI Help" },
    { id: "resources", icon: Diamond, label: "" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              activeTab === id
                ? id === "resources" 
                  ? "text-civic-blue bg-civic-blue/5" 
                  : "text-primary bg-primary/5"
                : "text-neutral-400 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <Icon className={`w-5 h-5 ${id === "resources" ? "text-civic-blue" : ""}`} />
            {label && <span className="text-xs font-medium">{label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};