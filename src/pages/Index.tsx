import { useState } from "react";
import { Home } from "./Home";
import { Report } from "./Report";
import { Districts } from "./Districts";
import { Ministries } from "./Ministries";
import { Dashboard } from "./Dashboard";
import { Resources } from "./Resources";
import { Profile } from "./Profile";
import { MyReports } from "./MyReports";
import { Communities } from "./Communities";
import { Surveys } from "./Surveys";
import { Settings } from "./Settings";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const handleProfileMenuSelect = (menu: string) => {
    setActiveTab(menu);
  };

  const handleResourceSelect = (resource: string) => {
    setSelectedResource(resource);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onProfileMenuSelect={handleProfileMenuSelect} />;
      case "report":
        return <Report />;
      case "districts":
        return <Districts />;
      case "ministries":
        return <Ministries />;
      case "dashboard":
        return <Dashboard />;
      case "resources":
        return (
          <Resources
            selectedResource={selectedResource}
            onBack={() => setSelectedResource(null)}
          />
        );
      case "profile":
        return <Profile />;
      case "reports":
        return <MyReports />;
      case "communities":
        return <Communities />;
      case "surveys":
        return <Surveys />;
      case "settings":
        return <Settings />;
      case "ai-help":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center pb-20">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">AI Help Coming Soon</h2>
              <p className="text-muted-foreground">
                AI assistance will be available to help guide you through the app.
              </p>
            </div>
          </div>
        );
      default:
        return <Home onProfileMenuSelect={handleProfileMenuSelect} />;
    }
  };

  return (
    <div className="relative">
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
