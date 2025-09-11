import { BarChart3, TrendingUp, DollarSign, Truck } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResourcesTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  onResourceSelect: (resource: string) => void;
}

const resources = [
  { id: "oil-gas", label: "Oil & Gas", icon: TrendingUp },
  { id: "mining", label: "Mining", icon: BarChart3 },
  { id: "timber", label: "Timber", icon: Truck },
  { id: "bauxite", label: "Bauxite", icon: DollarSign },
  { id: "agriculture", label: "Agriculture", icon: BarChart3 },
];

export const ResourcesTracker = ({ isOpen, onClose, onResourceSelect }: ResourcesTrackerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-3/4 ml-auto rounded-l-xl border-l border-card-border">
        <div className="p-6 h-full">
          <div className="text-center mb-8 pt-4">
            <h2 className="font-heading font-bold text-xl text-foreground">Resource Tracker</h2>
            <p className="text-muted-foreground text-sm">Monitor Guyana's natural resources</p>
          </div>

          <div className="space-y-3">
            {resources.map(({ id, label, icon: Icon }) => (
              <Card
                key={id}
                className="cursor-pointer hover:shadow-medium transition-all duration-200 hover:scale-[1.02]"
                onClick={() => {
                  onResourceSelect(id);
                  onClose();
                }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{label}</h3>
                    <p className="text-sm text-muted-foreground">View dashboard</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};