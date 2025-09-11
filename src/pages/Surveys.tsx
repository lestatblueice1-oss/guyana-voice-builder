import { useState } from "react";
import { MessageSquare, CheckCircle, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockSurveys = [
  {
    id: "1",
    title: "How can we improve The Citizen's Voice app?",
    description: "Help us make the app better for reporting community issues",
    questions: [
      "What features would you like to see added?",
      "How easy is it to report issues currently?",
      "What improvements would make you use the app more often?"
    ],
    responses: 234,
    status: "active",
    category: "App Improvement"
  },
  {
    id: "2",
    title: "Community Safety Assessment",
    description: "Evaluate safety concerns in your neighborhood",
    questions: [
      "How safe do you feel in your community at night?",
      "What are the main safety concerns in your area?",
      "What improvements would make you feel safer?"
    ],
    responses: 156,
    status: "active", 
    category: "Safety"
  },
  {
    id: "3",
    title: "Public Transportation Feedback",
    description: "Share your experience with local transportation services",
    questions: [
      "How often do you use public transportation?",
      "What are the main issues with current services?",
      "What improvements would you prioritize?"
    ],
    responses: 89,
    status: "completed",
    category: "Transportation"
  }
];

export const Surveys = () => {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);

  if (selectedSurvey) {
    const survey = mockSurveys.find(s => s.id === selectedSurvey);
    if (!survey) return null;

    const handleNext = () => {
      if (currentQuestion < survey.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Submit survey
        setSelectedSurvey(null);
        setCurrentQuestion(0);
        setResponses([]);
      }
    };

    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="p-6">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedSurvey(null);
                  setCurrentQuestion(0);
                  setResponses([]);
                }}
                className="mb-4"
              >
                ← Back to Surveys
              </Button>
              <h1 className="font-heading font-bold text-xl mb-2">{survey.title}</h1>
              <p className="text-muted-foreground text-sm mb-4">{survey.description}</p>
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {survey.questions.length}
                </Badge>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">
                  {survey.questions[currentQuestion]}
                </h2>
                <textarea
                  className="w-full p-3 border border-input rounded-lg resize-none"
                  rows={4}
                  placeholder="Share your thoughts..."
                  value={responses[currentQuestion] || ''}
                  onChange={(e) => {
                    const newResponses = [...responses];
                    newResponses[currentQuestion] = e.target.value;
                    setResponses(newResponses);
                  }}
                />
                <Button
                  onClick={handleNext}
                  className="w-full mt-4"
                  disabled={!responses[currentQuestion]?.trim()}
                >
                  {currentQuestion === survey.questions.length - 1 ? 'Submit Survey' : 'Next Question'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-action rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Surveys</h1>
            <p className="text-muted-foreground">Share your voice on community matters</p>
          </div>

          <div className="space-y-4">
            {mockSurveys.map((survey) => (
              <Card 
                key={survey.id} 
                className="hover:shadow-medium transition-all duration-200 cursor-pointer"
                onClick={() => survey.status === 'active' ? setSelectedSurvey(survey.id) : null}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-1">{survey.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-2">{survey.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge 
                        variant={survey.status === 'active' ? 'civic' : 'outline'}
                        className="text-xs"
                      >
                        {survey.status === 'active' ? (
                          <>
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </>
                        )}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {survey.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">{survey.responses}</span>
                      <span className="text-muted-foreground">responses</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      {survey.questions.length} questions
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-gradient-subtle border-primary/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Your Voice Matters</h3>
              <p className="text-sm text-muted-foreground">
                Join {mockSurveys.reduce((sum, s) => sum + s.responses, 0)} citizens shaping Guyana's future
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};