import { useState } from "react";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Ministry {
  id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  categories: string[];
  currentIssues: string[];
  implementations: string[];
}

const ministries: Ministry[] = [
  {
    id: "finance",
    name: "Ministry of Finance",
    address: "49 Main & Urquhart Streets, Georgetown, Guyana",
    contact: "592 227 3992, 592 225 6088, 592 227 7935",
    email: "publicrelations@finance.gov.gy",
    categories: ["Budget", "Tax Policy", "Economic Development", "Public Debt"],
    currentIssues: ["2024 Budget Implementation", "Tax Reform Initiative", "Debt Management Strategy"],
    implementations: ["Digital Tax Platform", "Budget Transparency Portal", "Economic Recovery Program"]
  },
  {
    id: "health",
    name: "Ministry of Health",
    address: "1 Brickdam, Georgetown, Guyana",
    contact: "592 227 7986",
    email: "mophguyanapr@gmail.com",
    categories: ["Healthcare", "Public Health", "Medical Services", "Health Policy"],
    currentIssues: ["Healthcare Access in Rural Areas", "Medical Equipment Shortages", "Staff Training Programs"],
    implementations: ["Telemedicine Initiative", "Mobile Health Clinics", "Healthcare Worker Training Program"]
  },
  {
    id: "education",
    name: "Ministry of Education",
    address: "21 Brickdam, Georgetown, Guyana",
    contact: "592 223 7900",
    email: "educationministrygy@gmail.com",
    categories: ["Primary Education", "Secondary Education", "Higher Education", "Technical Training"],
    currentIssues: ["School Infrastructure", "Teacher Shortage", "Educational Technology"],
    implementations: ["Digital Learning Platform", "Teacher Training Program", "School Improvement Projects"]
  },
  {
    id: "housing",
    name: "Ministry of Housing and Water",
    address: "41 Brickdam & United Nations Place, Georgetown, Guyana",
    contact: "592 223 7521",
    email: "ps.housing.water@gmail.com",
    categories: ["Housing Development", "Water Supply", "Sanitation", "Urban Planning"],
    currentIssues: ["Housing Shortage", "Water Access in Remote Areas", "Sewerage Systems"],
    implementations: ["Low-Income Housing Program", "Water Infrastructure Expansion", "Smart City Initiative"]
  },
  {
    id: "agriculture",
    name: "Ministry of Agriculture",
    address: "Regent Street & Vlissengen Road, Bourda, Georgetown, Guyana",
    contact: "592 223 7291",
    email: "agri.pr.gy@gmail.com",
    categories: ["Crop Production", "Livestock", "Food Security", "Agricultural Technology"],
    currentIssues: ["Climate Change Impact", "Market Access", "Agricultural Modernization"],
    implementations: ["Smart Agriculture Program", "Farmer Support Initiative", "Food Security Strategy"]
  },
  {
    id: "natural-resources",
    name: "Ministry of Natural Resources",
    address: "96 Duke Street, Kingston, Georgetown, Guyana",
    contact: "592 231 2506, 592 231 2511",
    email: "ministry@nre.gov.gy",
    categories: ["Mining", "Forestry", "Petroleum", "Environmental Protection"],
    currentIssues: ["Environmental Impact", "Resource Management", "Local Content Development"],
    implementations: ["Sustainable Mining Initiative", "Forest Conservation Program", "Local Content Policy"]
  },
  {
    id: "culture-youth-sport",
    name: "Ministry of Culture, Youth and Sport",
    address: "71-72 Main Street, Georgetown, Guyana",
    contact: "592 226 8562",
    email: "minofcyf@gmail.com",
    categories: ["Sports Development", "Cultural Heritage", "Youth Programs", "Recreation"],
    currentIssues: ["Youth Employment", "Sports Infrastructure", "Cultural Preservation"],
    implementations: ["Youth Skills Program", "Sports Facility Upgrade", "Cultural Heritage Project"]
  },
  {
    id: "public-works",
    name: "Ministry of Public Works",
    address: "Wight's Lane, Kingston, Georgetown, Guyana",
    contact: "592 225 6510",
    email: "ministryofpublicworksgy@gmail.com",
    categories: ["Infrastructure", "Road Maintenance", "Public Buildings", "Transportation"],
    currentIssues: ["Road Network Maintenance", "Bridge Repairs", "Public Building Upgrades"],
    implementations: ["National Road Improvement Program", "Bridge Rehabilitation Project", "Infrastructure Modernization"]
  },
  {
    id: "tourism",
    name: "Ministry of Tourism, Industry and Commerce",
    address: "229 South Road, Lacytown, Georgetown, Guyana",
    contact: "592 226 2505",
    email: "info@business.gov.gy",
    categories: ["Tourism Development", "Industry Growth", "Trade", "Business Development"],
    currentIssues: ["Tourism Infrastructure", "Business Support", "Trade Facilitation"],
    implementations: ["Tourism Promotion Campaign", "SME Support Program", "Trade Facilitation Initiative"]
  },
  {
    id: "home-affairs",
    name: "Ministry of Home Affairs",
    address: "6 Brickdam, Georgetown, Guyana",
    contact: "592 226 2444/5",
    email: "minister@moha.gov.gy",
    categories: ["Public Safety", "Immigration", "Police Services", "Emergency Management"],
    currentIssues: ["Crime Prevention", "Border Security", "Emergency Response"],
    implementations: ["Community Policing Program", "Border Security Enhancement", "Emergency Response System"]
  }
];

export const Ministries = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

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
                  {selectedMinistry.currentIssues.map((issue, index) => (
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
                  <span>{ministry.currentIssues.length} Issues</span>
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