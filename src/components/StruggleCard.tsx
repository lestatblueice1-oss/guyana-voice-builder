import { MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StruggleCardProps {
  id: string;
  headline: string;
  summary: string;
  category: string;
  location: string;
  timeAgo: string;
  verified?: boolean;
}

export const StruggleCard = ({
  headline,
  summary,
  category,
  location,
  timeAgo,
  verified = false,
}: StruggleCardProps) => {
  return (
    <Card className="p-4 shadow-soft border-card-border hover:shadow-medium transition-all duration-200">
      <div className="space-y-3">
        {/* Header with category and verification */}
        <div className="flex items-center justify-between">
          <Badge variant="civic" className="text-xs font-medium">
            {category}
          </Badge>
          {verified && (
            <Badge variant="verified" className="text-xs">
              Verified
            </Badge>
          )}
        </div>

        {/* Headline */}
        <h2 className="font-heading font-bold text-lg leading-tight text-foreground">
          {headline}
        </h2>

        {/* Summary */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {summary}
        </p>

        {/* Footer with location and time */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};