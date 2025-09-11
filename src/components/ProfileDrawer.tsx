import { User, FileText, Users, MessageSquare, Settings } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuSelect: (menu: string) => void;
}

const menuItems = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "reports", icon: FileText, label: "My Reports" },
  { id: "communities", icon: Users, label: "Communities" },
  { id: "surveys", icon: MessageSquare, label: "Surveys" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export const ProfileDrawer = ({ isOpen, onClose, onMenuSelect }: ProfileDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-3/4 ml-auto rounded-l-xl border-l border-card-border">
        <div className="p-6 h-full">
          {/* Profile Header */}
          <div className="text-center mb-8 pt-4">
            <div className="w-24 h-24 bg-gradient-civic rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="font-heading font-bold text-xl text-foreground">Ray Ganesh</h2>
            <p className="text-muted-foreground text-sm">Georgetown, Region 4</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  onMenuSelect(id);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-all duration-200 text-left"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};