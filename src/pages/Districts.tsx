import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin } from "lucide-react";

const Districts = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = [
    {
      id: "district-1",
      name: "District 1 (Barima-Waini)",
      region: "Barima-Waini",
      categories: ["Infrastructure", "Transportation", "Public Health"],
      majorIssues: ["Poor road conditions", "Limited healthcare access", "Water supply issues"]
    },
    {
      id: "district-2", 
      name: "District 2 (Pomeroon-Supenaam)",
      region: "Pomeroon-Supenaam",
      categories: ["Public Health", "Education", "Infrastructure"],
      majorIssues: ["Clinic supply shortages", "School transportation", "Drainage problems"]
    },
    {
      id: "district-3",
      name: "District 3 (Essequibo Islands-West Demerara)",
      region: "Essequibo Islands-West Demerara", 
      categories: ["Housing", "Infrastructure", "Transportation"],
      majorIssues: ["Housing development delays", "Bridge maintenance", "Ferry services"]
    },
    {
      id: "district-4",
      name: "District 4 (Demerara-Mahaica)",
      region: "Demerara-Mahaica",
      categories: ["Transportation", "Housing", "Victimization"],
      majorIssues: ["Traffic congestion", "Affordable housing", "Crime in communities"]
    },
    {
      id: "district-5",
      name: "District 5 (Mahaica-Berbice)",
      region: "Mahaica-Berbice",
      categories: ["Education", "Infrastructure", "Public Health"],
      majorIssues: ["School facilities", "Road repairs", "Medical supplies"]
    },
    {
      id: "district-6",
      name: "District 6 (East Berbice-Corentyne)",
      region: "East Berbice-Corentyne",
      categories: ["Victimization", "Public Health", "Education"],
      majorIssues: ["Community safety", "Healthcare access", "Educational resources"]
    },
    {
      id: "district-7",
      name: "District 7 (Cuyuni-Mazaruni)",
      region: "Cuyuni-Mazaruni",
      categories: ["Infrastructure", "Transportation", "Housing"],
      majorIssues: ["Mining area access", "Worker housing", "Equipment transport"]
    },
    {
      id: "district-8",
      name: "District 8 (Potaro-Siparuni)",
      region: "Potaro-Siparuni",
      categories: ["Public Health", "Infrastructure", "Education"],
      majorIssues: ["Remote healthcare", "Communication networks", "Distance learning"]
    },
    {
      id: "district-9",
      name: "District 9 (Upper Takutu-Upper Essequibo)",
      region: "Upper Takutu-Upper Essequibo",
      categories: ["Housing", "Education", "Transportation"],
      majorIssues: ["Rural housing", "School access", "Cross-border transport"]
    },
    {
      id: "district-10",
      name: "District 10 (Upper Demerara-Berbice)",
      region: "Upper Demerara-Berbice",
      categories: ["Education", "Infrastructure", "Housing"],
      majorIssues: ["University access", "Urban planning", "Student housing"]
    }
  ];

  if (selectedDistrict) {
    const district = districts.find(d => d.id === selectedDistrict);
    if (!district) return null;

    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-gradient-civic text-primary-foreground px-4 py-6 safe-area-pt">
          <div className="max-w-md mx-auto">
            <button 
              onClick={() => setSelectedDistrict(null)}
              className="flex items-center gap-2 mb-3 text-primary-foreground/80 hover:text-primary-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Districts</span>
            </button>
            <h1 className="font-heading font-bold text-xl mb-1">District {district.id.split('-')[1]}</h1>
            <p className="text-primary-foreground/80 text-sm">{district.region}</p>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* Categories */}
            <div>
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Problem Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {district.categories.map((category) => (
                  <Badge key={category} variant="civic" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Major Issues */}
            <div>
              <h2 className="font-semibold text-foreground mb-3">Major Issues Reported</h2>
              <div className="space-y-2">
                {district.majorIssues.map((issue, index) => (
                  <div key={index} className="bg-card border border-card-border rounded-lg p-3">
                    <p className="text-sm text-foreground">{issue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Select Your District
          </h1>
          <p className="text-muted-foreground">
            Choose your district to view local community reports and issues.
          </p>
        </div>

        <div className="space-y-3">
          {districts.map((district, index) => (
            <Button
              key={district.id}
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-6"
              onClick={() => setSelectedDistrict(district.id)}
            >
              <div>
                <div className="font-semibold text-foreground">
                  District {index + 1}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {district.region}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Districts };