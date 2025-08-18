export type Survey = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  questions: Question[];
};

export type Question = {
  id: number;
  surveyId: number;
  text: string;
  type: "TEXT" | "NUMBER" | "EMAIL" | "DATE" | "SELECT" | "MULTISELECT";
  required: boolean;
  options?: string;
  orderIndex: number;
  createdAt: string;
};

export type Submission = {
  id: number;
  surveyId: number;
  createdAt: string;
  answers: Answer[];
  survey: Survey;
};

export type Answer = {
  id: number;
  submissionId: number;
  questionId: number;
  value: string;
  question: Question;
};

export type SubmitSurveyRequest = {
  surveyId: number;
  answers: {
    questionId: number;
    value: string;
  }[];
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};
