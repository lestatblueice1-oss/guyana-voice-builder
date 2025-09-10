import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, MapPin, Users } from "lucide-react";

const Dashboard = () => {
  // Mock data for analytics
  const districtStats = [
    { district: "District 1", region: "Barima-Waini", reports: 23, trending: "Infrastructure" },
    { district: "District 2", region: "Pomeroon-Supenaam", reports: 45, trending: "Public Health" },
    { district: "District 3", region: "Essequibo Islands-West Demerara", reports: 67, trending: "Housing" },
    { district: "District 4", region: "Demerara-Mahaica", reports: 123, trending: "Transportation" },
    { district: "District 5", region: "Mahaica-Berbice", reports: 34, trending: "Education" },
    { district: "District 6", region: "East Berbice-Corentyne", reports: 89, trending: "Victimization" },
    { district: "District 7", region: "Cuyuni-Mazaruni", reports: 12, trending: "Infrastructure" },
    { district: "District 8", region: "Potaro-Siparuni", reports: 8, trending: "Public Health" },
    { district: "District 9", region: "Upper Takutu-Upper Essequibo", reports: 15, trending: "Housing" },
    { district: "District 10", region: "Upper Demerara-Berbice", reports: 56, trending: "Education" }
  ];

  const categoryStats = [
    { category: "Infrastructure", count: 156, percentage: 33.2 },
    { category: "Public Health", count: 89, percentage: 18.9 },
    { category: "Housing", count: 78, percentage: 16.6 },
    { category: "Education", count: 67, percentage: 14.3 },
    { category: "Transportation", count: 45, percentage: 9.6 },
    { category: "Victimization", count: 35, percentage: 7.4 }
  ];

  const totalReports = districtStats.reduce((sum, district) => sum + district.reports, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-civic text-primary-foreground px-4 py-6 safe-area-pt">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-2xl mb-1">Community Dashboard</h1>
          <p className="text-primary-foreground/80 text-sm">
            Real-time insights from across all districts
          </p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalReports}</div>
                <p className="text-xs text-muted-foreground">Across all districts</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Most Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">District 4</div>
                <p className="text-xs text-muted-foreground">123 reports this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Issues by Category
              </CardTitle>
              <CardDescription>Distribution of reported struggles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryStats.map((stat) => (
                <div key={stat.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="civic" className="text-xs min-w-fit">
                      {stat.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{stat.count} reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground min-w-fit">
                      {stat.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* District Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                District Activity
              </CardTitle>
              <CardDescription>Reports and trending issues by region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {districtStats.map((district) => (
                <div key={district.district} className="border border-card-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{district.district}</h3>
                      <p className="text-sm text-muted-foreground">{district.region}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{district.reports}</div>
                      <p className="text-xs text-muted-foreground">reports</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Trending:</span>
                    <Badge variant="outline" className="text-xs">
                      {district.trending}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };