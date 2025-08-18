import baseApi from "./baseApi";
import type {
  Survey,
  Submission,
  SubmitSurveyRequest,
  ApiResponse,
} from "@/types/api";

export const getSurveyById = async (id: number): Promise<Survey> => {
  const response = await baseApi.get<ApiResponse<Survey>>(`/surveys/${id}`);
  return response.data.data;
};

export const submitSurvey = async (
  data: SubmitSurveyRequest
): Promise<{ submissionId: number }> => {
  const response = await baseApi.post<ApiResponse<{ submissionId: number }>>(
    `/surveys/${data.surveyId}/submissions`,
    data
  );
  return response.data.data;
};

export const getSubmissionById = async (
  submissionId: number
): Promise<Submission> => {
  const response = await baseApi.get<ApiResponse<Submission>>(
    `/surveys/submissions/${submissionId}`
  );
  return response.data.data;
};
