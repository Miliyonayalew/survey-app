import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const NavigationButtons = ({ 
  currentPage, 
  totalPages, 
  onPrevious, 
  onNext, 
  onCancel, 
  isSubmitting 
}: NavigationButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 pt-4">
      {currentPage > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
      )}
      
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        
        {currentPage === totalPages - 1 ? (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit Survey"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
