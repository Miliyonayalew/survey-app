import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useSurvey } from "@/hook/useSurvey";
import { SurveyForm } from "@/components/SurveyForm";

export const SurveyPage = () => {
  const { id } = useParams<{ id: string }>();
  const surveyId = id ? parseInt(id, 10) : 0;
  
  const { data: survey, isLoading, error } = useSurvey(surveyId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading survey...</span>
        </div>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md w-full">
          <AlertDescription>
            {error?.message || "Survey not found"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="mb-4 sm:mb-6">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">{survey.title}</CardTitle>
          </CardHeader>
          <CardContent >
            <p className="text-sm sm:text-base text-gray-600 mb-4">{survey.description}</p>
            <SurveyForm survey={survey} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
