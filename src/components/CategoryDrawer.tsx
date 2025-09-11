import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
}

const categoryData = {
  INFRASTRUCTURE: [
    {
      id: "inf-1",
      title: "Georgetown Market Drainage System Failure",
      description: "Persistent flooding during rainfall causes vendor losses and customer accessibility issues.",
      location: "Georgetown, Region 4",
      timeAgo: "2 hours ago"
    },
    {
      id: "inf-2", 
      title: "Anna Regina Road Conditions Deteriorating",
      description: "Potholes and damaged surfaces making transportation dangerous for vehicles and pedestrians.",
      location: "Anna Regina, Region 2",
      timeAgo: "6 hours ago"
    },
    {
      id: "inf-3",
      title: "Berbice Bridge Maintenance Overdue",
      description: "Structural concerns raised by engineers regarding the safety of the main crossing.",
      location: "Berbice, Region 6", 
      timeAgo: "1 day ago"
    }
  ],
  HEALTH: [
    {
      id: "hea-1",
      title: "Rural Clinic Medical Supply Shortage",
      description: "Essential medications unavailable for weeks, forcing residents to travel long distances.",
      location: "Berbice, Region 6",
      timeAgo: "5 hours ago"
    },
    {
      id: "hea-2",
      title: "Maternity Ward Understaffed at Regional Hospital",
      description: "Shortage of qualified midwives affecting quality of care for expecting mothers.",
      location: "Linden, Region 10",
      timeAgo: "12 hours ago"
    },
    {
      id: "hea-3",
      title: "Mental Health Services Limited in Remote Areas",
      description: "Communities lack access to counselors and psychiatric care facilities.",
      location: "Bartica, Region 7",
      timeAgo: "2 days ago"
    }
  ],
  HOUSING: [
    {
      id: "hou-1",
      title: "Affordable Housing Development Stalled",
      description: "Families who paid deposits report no construction progress after two years.",
      location: "Linden, Region 10",
      timeAgo: "1 day ago"
    },
    {
      id: "hou-2",
      title: "Squatter Settlement Lacks Basic Utilities",
      description: "Residents without access to clean water, electricity, or proper sanitation.",
      location: "Georgetown, Region 4",
      timeAgo: "3 days ago"
    },
    {
      id: "hou-3",
      title: "Rising Rental Costs Displacing Families",
      description: "Low-income families forced to relocate due to unaffordable housing market.",
      location: "New Amsterdam, Region 6",
      timeAgo: "1 week ago"
    }
  ],
  EDUCATION: [
    {
      id: "edu-1",
      title: "Students Walk Dangerous Route to School Daily",
      description: "Poorly maintained road with no street lights creates hazardous conditions.",
      location: "Anna Regina, Region 2",
      timeAgo: "2 days ago"
    },
    {
      id: "edu-2",
      title: "Computer Lab Equipment Outdated and Non-Functional",
      description: "Students unable to access modern technology for digital literacy programs.",
      location: "Mahdia, Region 8",
      timeAgo: "4 days ago"
    },
    {
      id: "edu-3",
      title: "Teacher Shortage Affecting Rural Schools",
      description: "Multiple grade levels taught by single teacher due to staffing issues.",
      location: "Lethem, Region 9",
      timeAgo: "1 week ago"
    }
  ]
};

export const CategoryDrawer = ({ isOpen, onClose, onCategorySelect }: CategoryDrawerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      onCategorySelect(category);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full bg-card z-50 transition-transform duration-300 ease-out shadow-strong ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '75vw', maxWidth: '320px' }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-foreground">Categories</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {Object.keys(categoryData).map((category) => (
              <div key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedCategory === category
                      ? 'border-primary bg-primary/5'
                      : 'border-card-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{category}</span>
                    <Badge variant="outline" className="text-xs">
                      {categoryData[category as keyof typeof categoryData].length}
                    </Badge>
                  </div>
                </button>

                {/* Issues List */}
                {selectedCategory === category && (
                  <div className="mt-3 space-y-3 pl-2">
                    {categoryData[category as keyof typeof categoryData].map((issue) => (
                      <div key={issue.id} className="p-3 bg-muted/30 rounded-lg border border-card-border">
                        <h4 className="font-medium text-sm text-foreground mb-1">{issue.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{issue.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{issue.location}</span>
                          <span>{issue.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};