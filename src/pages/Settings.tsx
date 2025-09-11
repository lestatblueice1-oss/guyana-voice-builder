import { Settings as SettingsIcon, Bell, Shield, Palette, HelpCircle, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const settingsGroups = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { id: "push-notifications", label: "Push Notifications", description: "Receive alerts about your reports", enabled: true },
      { id: "email-updates", label: "Email Updates", description: "Get weekly summaries via email", enabled: false },
      { id: "community-alerts", label: "Community Alerts", description: "Notifications about your area", enabled: true }
    ]
  },
  {
    title: "Privacy & Security", 
    icon: Shield,
    settings: [
      { id: "location-sharing", label: "Location Sharing", description: "Share precise location with reports", enabled: true },
      { id: "anonymous-reporting", label: "Anonymous Reporting", description: "Hide your identity in reports", enabled: false },
      { id: "data-collection", label: "Usage Analytics", description: "Help improve the app", enabled: true }
    ]
  },
  {
    title: "Personalization",
    icon: Palette,
    settings: [
      { id: "dark-mode", label: "Dark Mode", description: "Use dark theme", enabled: false },
      { id: "compact-view", label: "Compact View", description: "Show more content on screen", enabled: false },
      { id: "auto-refresh", label: "Auto Refresh", description: "Automatically update content", enabled: true }
    ]
  }
];

export const Settings = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <SettingsIcon className="w-8 h-8 text-neutral-600" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Customize your app experience</p>
          </div>

          <div className="space-y-6">
            {settingsGroups.map((group) => (
              <Card key={group.title}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <group.icon className="w-5 h-5 text-primary" />
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <h3 className="font-medium">{setting.label}</h3>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            {/* Additional Options */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="w-5 h-5 mr-3" />
                  Help & FAQ
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <SettingsIcon className="w-5 h-5 mr-3" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardContent className="p-4">
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground pt-4">
              <p>The Citizen's Voice v1.0.0</p>
              <p>Made with ❤️ for Guyana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};