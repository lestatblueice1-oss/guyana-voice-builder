import { FileText, Calendar, MapPin, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const mockReports = [
  {
    id: "1",
    title: "Georgetown Market Flooding Issues",
    category: "Infrastructure",
    location: "Georgetown, Region 4",
    date: "2024-01-15",
    status: "resolved",
    description: "Reported persistent flooding in market area affecting vendors and customers."
  },
  {
    id: "2",
    title: "Street Light Outages on Main Street",
    category: "Infrastructure", 
    location: "Georgetown, Region 4",
    date: "2024-01-10",
    status: "pending",
    description: "Multiple street lights not functioning, creating safety concerns for pedestrians."
  },
  {
    id: "3",
    title: "Medical Supply Shortage at Health Center",
    category: "Health",
    location: "Berbice, Region 6",
    date: "2024-01-08",
    status: "in-progress",
    description: "Local health center lacks basic medical supplies and medications."
  },
  {
    id: "4",
    title: "School Building Roof Damage",
    category: "Education",
    location: "Linden, Region 10",
    date: "2024-01-05",
    status: "resolved",
    description: "Storm damage to school roof affecting classroom conditions during rain."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "resolved":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "resolved":
      return <CheckCircle className="w-4 h-4" />;
    case "in-progress":
      return <Clock className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export const MyReports = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-civic rounded-full mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">My Reports</h1>
            <p className="text-muted-foreground">Track your submitted community reports</p>
          </div>

          <div className="space-y-4">
            {mockReports.map((report) => (
              <Card key={report.id} className="hover:shadow-medium transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground leading-tight flex-1">
                      {report.title}
                    </h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      {report.status.replace('-', ' ')}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {report.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {report.location.split(',')[0]}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {report.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Total Reports: {mockReports.length} • Resolved: {mockReports.filter(r => r.status === 'resolved').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};