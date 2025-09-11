import { useState } from "react";
import { User, MapPin, Calendar, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-civic rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-16 h-16 text-primary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Ray Ganesh</h1>
            <p className="text-muted-foreground">Active Citizen Reporter</p>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">March 15, 1985</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">District Location</p>
                    <p className="font-medium">Georgetown, Region 4</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-sm text-muted-foreground">Reports Submitted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">8</p>
                    <p className="text-sm text-muted-foreground">Issues Resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Contribution Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className="bg-gradient-civic h-2 rounded-full w-3/4"></div>
                      </div>
                      <span className="text-sm font-medium">750</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your reports have helped improve community infrastructure and services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <Button className="w-full" onClick={() => setIsEditing(false)}>
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};