import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  created_at: string;
  evidence_urls: string[];
}

export const AdminReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast({
        title: "Error",
        description: "Failed to load reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ 
          status,
          reviewed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq("id", reportId);

      if (error) throw error;

      // Update local state
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status } : report
      ));

      // If approved, also add to struggles table
      if (status === "approved") {
        const report = reports.find(r => r.id === reportId);
        if (report) {
          const { error: struggleError } = await supabase
            .from("struggles")
            .insert({
              headline: report.title,
              summary: report.description,
              category: report.category,
              location: report.location || "Unknown Location",
              user_id: (await supabase.auth.getUser()).data.user?.id,
              verified: true
            });

          if (struggleError) {
            console.error("Error adding to struggles:", struggleError);
          }
        }
      }

      toast({
        title: "Success",
        description: `Report ${status}`,
      });
    } catch (error) {
      console.error("Error updating report:", error);
      toast({
        title: "Error",
        description: "Failed to update report",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading reports...</p>
      </div>
    );
  }

  const pendingReports = reports.filter(r => r.status === "pending");
  const reviewedReports = reports.filter(r => r.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Pending Reports */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          Pending Reports ({pendingReports.length})
        </h3>
        
        {pendingReports.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No pending reports</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{report.category}</Badge>
                        <Badge variant="secondary">{report.location}</Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-amber-600">
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{report.description}</p>
                  
                  {report.evidence_urls && report.evidence_urls.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Evidence:</p>
                      <div className="flex flex-wrap gap-2">
                        {report.evidence_urls.map((url, index) => (
                          <Button key={index} variant="outline" size="sm" asChild>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-3 h-3 mr-1" />
                              View {index + 1}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => updateReportStatus(report.id, "approved")}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => updateReportStatus(report.id, "rejected")}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Reviewed Reports */}
      {reviewedReports.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Decisions</h3>
          <div className="space-y-4">
            {reviewedReports.slice(0, 5).map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.category}</p>
                    </div>
                    <Badge 
                      variant={report.status === "approved" ? "default" : "destructive"}
                    >
                      {report.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};