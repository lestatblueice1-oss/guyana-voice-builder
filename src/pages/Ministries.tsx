import { useState, useEffect } from "react";
import { ArrowLeft, Phone, Mail, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Ministry {
  id: string;
  ministry_id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  categories: string[];
  current_issues: string[];
  implementations: string[];
  minister_name?: string;
  minister_photo_url?: string;
}

export const Ministries = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      const { data, error } = await supabase
        .from("ministry_data")
        .select("*")
        .order("name");

      if (error) throw error;
      setMinistries(data || []);
    } catch (error) {
      console.error("Error fetching ministries:", error);
      toast({
        title: "Error",
        description: "Failed to load ministries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading ministries...</p>
        </div>
      </div>
    );
  }

  if (selectedMinistry) {
    return (
      <div className="min-h-screen bg-background pb-20 px-4">
        <div className="max-w-md mx-auto pt-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedMinistry(null)}
            className="mb-4 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ministries
          </Button>

          <div className="space-y-6">
            {/* Minister Profile Card */}
            {(selectedMinistry.minister_name || selectedMinistry.minister_photo_url) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Minister</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {selectedMinistry.minister_photo_url ? (
                      <img 
                        src={selectedMinistry.minister_photo_url} 
                        alt={`Minister ${selectedMinistry.minister_name}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{selectedMinistry.minister_name || "Minister"}</h3>
                      <p className="text-sm text-muted-foreground">{selectedMinistry.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-primary text-xl">{selectedMinistry.name}</CardTitle>
                <CardDescription>Government Ministry Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Address</p>
                    <p className="text-sm text-muted-foreground">{selectedMinistry.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Contact</p>
                    <p className="text-sm text-muted-foreground">{selectedMinistry.contact}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">{selectedMinistry.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ministry Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedMinistry.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-destructive">Current Issues</CardTitle>
                <CardDescription>Areas requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedMinistry.current_issues.map((issue, index) => (
                    <li key={index} className="text-sm bg-destructive/5 p-3 rounded-lg border-l-4 border-destructive">
                      {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Current Implementations</CardTitle>
                <CardDescription>Active programs and initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedMinistry.implementations.map((implementation, index) => (
                    <li key={index} className="text-sm bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      {implementation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 px-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Government Ministries</h1>
          <p className="text-muted-foreground text-sm">
            Monitor ministry activities and implementations across Guyana
          </p>
        </div>

        <div className="space-y-4">
          {ministries.map((ministry) => (
            <Card
              key={ministry.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedMinistry(ministry)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-primary">{ministry.name}</CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {ministry.address.split(',')[0]}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {ministry.categories.slice(0, 3).map((category) => (
                    <Badge key={category} variant="outline" className="text-xs px-2 py-0">
                      {category}
                    </Badge>
                  ))}
                  {ministry.categories.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0">
                      +{ministry.categories.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{ministry.current_issues.length} Issues</span>
                  <span>{ministry.implementations.length} Programs</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};