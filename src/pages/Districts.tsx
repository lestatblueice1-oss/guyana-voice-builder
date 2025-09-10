import { Button } from "@/components/ui/button";

const Districts = () => {
  const districts = [
    "District 1 (Barima-Waini)",
    "District 2 (Pomeroon-Supenaam)", 
    "District 3 (Essequibo Islands-West Demerara)",
    "District 4 (Demerara-Mahaica)",
    "District 5 (Mahaica-Berbice)",
    "District 6 (East Berbice-Corentyne)",
    "District 7 (Cuyuni-Mazaruni)",
    "District 8 (Potaro-Siparuni)",
    "District 9 (Upper Takutu-Upper Essequibo)",
    "District 10 (Upper Demerara-Berbice)"
  ];

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
              key={index}
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-6"
              onClick={() => {
                // Handle district selection
                console.log(`Selected: ${district}`);
              }}
            >
              <div>
                <div className="font-semibold text-foreground">
                  District {index + 1}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {district.split('(')[1]?.replace(')', '') || district}
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