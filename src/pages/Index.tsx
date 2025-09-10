import { useState } from "react";
import { Home } from "./Home";
import { Report } from "./Report";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "report":
        return <Report />;
      case "search":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center pb-20">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Search Coming Soon</h2>
              <p className="text-muted-foreground">
                Advanced search features will be available in the next update.
              </p>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center pb-20">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Profile Coming Soon</h2>
              <p className="text-muted-foreground">
                User profiles and account management will be available soon.
              </p>
            </div>
          </div>
        );
      default:
        return <Home />;
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
