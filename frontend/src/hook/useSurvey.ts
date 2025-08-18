import {
  getSurveyById,
  submitSurvey,
  getSubmissionById,
} from "@/lib/api/survey";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitSurveyRequest } from "@/types/api";

// Query Keys
export const surveyKeys = {
  all: ["surveys"] as const,
  lists: () => [...surveyKeys.all, "list"] as const,
  list: (filters: string) => [...surveyKeys.lists(), { filters }] as const,
  details: () => [...surveyKeys.all, "detail"] as const,
  detail: (id: number) => [...surveyKeys.details(), id] as const,
};

export const submissionKeys = {
  all: ["submissions"] as const,
  lists: () => [...submissionKeys.all, "list"] as const,
  list: (filters: string) => [...submissionKeys.lists(), { filters }] as const,
  details: () => [...submissionKeys.all, "detail"] as const,
  detail: (id: number) => [...submissionKeys.details(), id] as const,
  bySurvey: (surveyId: number) =>
    [...submissionKeys.all, "survey", surveyId] as const,
};

// Survey Hooks
export const useSurvey = (id: number) => {
  return useQuery({
    queryKey: surveyKeys.detail(id),
    queryFn: () => getSurveyById(id),
    enabled: !!id,
  });
};

// Submission Hooks
export const useSubmission = (id: number) => {
  return useQuery({
    queryKey: submissionKeys.detail(id),
    queryFn: () => getSubmissionById(id),
    enabled: !!id,
  });
};

export const useSubmitSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitSurveyRequest) => submitSurvey(data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch survey data
      queryClient.invalidateQueries({
        queryKey: surveyKeys.detail(variables.surveyId),
      });

      // Invalidate submissions for this survey
      queryClient.invalidateQueries({
        queryKey: submissionKeys.bySurvey(variables.surveyId),
      });

      // Add the new submission to cache
      queryClient.setQueryData(submissionKeys.detail(data.id), data);
    },
  });
};
