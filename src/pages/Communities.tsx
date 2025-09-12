import { Users, MapPin, MessageCircle, TrendingUp, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCommunities } from "@/hooks/useApi";

export const Communities = () => {
  const { communities, loading, error } = useCommunities();
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
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-destructive">Error: {error}</p>
              </div>
            ) : communities.length > 0 ? (
              communities.map((community) => (
                <Card key={community.id} className="hover:shadow-medium transition-all duration-200 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-1">{community.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          {community.district}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Community
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {community.description || "Building stronger communities together."}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="w-4 h-4 text-secondary" />
                          <span className="font-medium">{community.member_count?.toLocaleString() || '0'}</span>
                          <span className="text-muted-foreground">members</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <MessageCircle className="w-4 h-4 text-primary" />
                          <span className="font-medium">0</span>
                          <span className="text-muted-foreground">issues</span>
                        </div>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-neutral-400">No communities found.</p>
              </div>
            )}
          </div>

          <Card className="mt-6 bg-gradient-subtle border-primary/20">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold mb-2">Join the Movement</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with {communities.reduce((sum, c) => sum + (c.member_count || 0), 0).toLocaleString()} citizens working to improve Guyana
              </p>
              <div className="text-xs text-muted-foreground">
                Active Communities: {communities.length} • Growing Daily
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};