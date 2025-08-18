import { CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressHeaderProps {
  currentPage: number;
  totalPages: number;
  progress: number;
  totalQuestions: number;
}

export const ProgressHeader = ({ 
  currentPage, 
  totalPages, 
  progress, 
  totalQuestions 
}: ProgressHeaderProps) => {
  return (
    <CardHeader >
      <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <span className="text-lg sm:text-xl">Survey Questions</span>
        <span className="text-xs sm:text-sm text-gray-500">
          Page {currentPage + 1} of {totalPages}
        </span>
      </CardTitle>
      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full" />
        <div className="text-xs sm:text-sm text-gray-500">
          {totalQuestions} total questions
        </div>
      </div>
    </CardHeader>
  );
};
