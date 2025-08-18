import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useSubmitSurvey } from "@/hook/useSurvey";
import { NavigationButtons } from "@/components/NavigationButtons";
import { ProgressHeader } from "@/components/ProgressHeader";
import { QuestionField } from "@/components/QuestionField";
import type { Survey, Question } from "@/types/api";

interface SurveyFormProps {
  survey: Survey;
}

const QUESTIONS_PER_PAGE = 5;



// Main SurveyForm Component
export const SurveyForm = ({ survey }: SurveyFormProps) => {
  const navigate = useNavigate();
  const submitSurvey = useSubmitSurvey();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(survey.questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = survey.questions.slice(startIndex, endIndex);
  const progress = ((currentPage + 1) / totalPages) * 100;

  const clearError = (questionId: number) => {
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    clearError(questionId);
  };

  const handleCheckboxChange = (questionId: number, value: string, checked: boolean) => {
    const currentAnswers = answers[questionId] || "";
    const answerArray = currentAnswers ? currentAnswers.split(",").filter(Boolean) : [];
    
    if (checked) {
      answerArray.push(value);
    } else {
      const index = answerArray.indexOf(value);
      if (index > -1) {
        answerArray.splice(index, 1);
      }
    }
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerArray.join(",")
    }));
    clearError(questionId);
  };

  const validateQuestions = (questions: Question[]) => {
    const newErrors: Record<number, string> = {};
    
    questions.forEach(question => {
      if (question.required) {
        const answer = answers[question.id];
        if (!answer || answer.trim() === "") {
          newErrors[question.id] = `This question is required`;
        }
      }
    });
    
    return newErrors;
  };

  const validateCurrentPage = () => {
    const newErrors = validateQuestions(currentQuestions);
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateAllPages = () => {
    const newErrors = validateQuestions(survey.questions);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentPage()) {
      if (currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1);
        setErrors({});
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllPages()) {
      const firstErrorQuestion = survey.questions.find(question => {
        if (question.required) {
          const answer = answers[question.id];
          return !answer || answer.trim() === "";
        }
        return false;
      });
      
      if (firstErrorQuestion) {
        const errorPage = Math.floor(survey.questions.indexOf(firstErrorQuestion) / QUESTIONS_PER_PAGE);
        setCurrentPage(errorPage);
      }
      return;
    }

    const answersArray = Object.entries(answers).map(([questionId, value]) => ({
      questionId: parseInt(questionId),
      value: value.trim()
    }));

    try {
      const result = await submitSurvey.mutateAsync({
        surveyId: survey.id,
        answers: answersArray
      });
      
      navigate(`/submission/${result.submissionId}`);
    } catch (error) {
      console.error("Failed to submit survey:", error);
    }
  };

  const handleCancel = () => navigate("/");

  return (
    <Card>
      <ProgressHeader
        currentPage={currentPage}
        totalPages={totalPages}
        progress={progress}
        totalQuestions={survey.questions.length}
      />
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {currentQuestions.map((question, index) => (
            <QuestionField
              key={question.id}
              question={question}
              value={answers[question.id] || ""}
              onChange={(value) => handleInputChange(question.id, value)}
              onCheckboxChange={(value, checked) => handleCheckboxChange(question.id, value, checked)}
              error={errors[question.id]}
              questionNumber={startIndex + index + 1}
            />
          ))}

          <NavigationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onCancel={handleCancel}
            isSubmitting={submitSurvey.isPending}
          />
        </form>
      </CardContent>
    </Card>
  );
};
