import { Users, MapPin, MessageCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockCommunities = [
  {
    id: "1",
    name: "Georgetown Residents Coalition",
    location: "Georgetown, Region 4",
    members: 1247,
    activeIssues: 8,
    category: "Urban Development",
    description: "Working together to improve infrastructure and city services in Georgetown."
  },
  {
    id: "2", 
    name: "Berbice Health Advocates",
    location: "Berbice, Region 6",
    members: 623,
    activeIssues: 5,
    category: "Healthcare",
    description: "Advocating for better healthcare services and medical facilities in rural areas."
  },
  {
    id: "3",
    name: "Linden Education Forum", 
    location: "Linden, Region 10",
    members: 834,
    activeIssues: 12,
    category: "Education",
    description: "Parents and educators working to improve educational opportunities for children."
  },
  {
    id: "4",
    name: "West Demerara Environmental Watch",
    location: "West Demerara, Region 3", 
    members: 456,
    activeIssues: 3,
    category: "Environment",
    description: "Protecting natural resources and promoting sustainable development practices."
  }
];

export const Communities = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-hope rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Communities</h1>
            <p className="text-muted-foreground">Connect with local community groups</p>
          </div>

          <div className="space-y-4">
            {mockCommunities.map((community) => (
              <Card key={community.id} className="hover:shadow-medium transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-1">{community.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        {community.location}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {community.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="font-medium">{community.members.toLocaleString()}</span>
                        <span className="text-muted-foreground">members</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span className="font-medium">{community.activeIssues}</span>
                        <span className="text-muted-foreground">issues</span>
                      </div>
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-gradient-subtle border-primary/20">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold mb-2">Join the Movement</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with {mockCommunities.reduce((sum, c) => sum + c.members, 0).toLocaleString()} citizens working to improve Guyana
              </p>
              <div className="text-xs text-muted-foreground">
                Active Communities: {mockCommunities.length} • Total Issues: {mockCommunities.reduce((sum, c) => sum + c.activeIssues, 0)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};