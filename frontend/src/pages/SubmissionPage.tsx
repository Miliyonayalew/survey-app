import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import { useSubmission } from "@/hook/useSurvey";

export const SubmissionPage = () => {
  const { id } = useParams<{ id: string }>();
  const submissionId = id ? parseInt(id, 10) : 0;
  
  const { data: submission, isLoading, error } = useSubmission(submissionId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading submission...</span>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md w-full">
          <AlertDescription>
            {error?.message || "Submission not found"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <Card className="mb-4 sm:mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-green-800">
                  Survey Submitted Successfully!
                </h1>
                <p className="text-sm sm:text-base text-green-700 mt-1">
                  Thank you for completing the survey. Your responses have been recorded.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Survey Details */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Survey Details</CardTitle>
          </CardHeader>
          <CardContent >
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">{submission.survey.title}</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{submission.survey.description}</p>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Submitted on: {new Date(submission.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        {/* Responses */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Your Responses</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {submission.answers.map((answer, index) => (
                <div key={answer.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="mb-2">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      {index + 1}. {answer.question.text}
                    </h3>
  
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm sm:text-base text-gray-700 break-words">
                      {answer.value || <span className="text-gray-400 italic">No answer provided</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link to={`/survey/${submission.surveyId}`} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              Take Survey Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
