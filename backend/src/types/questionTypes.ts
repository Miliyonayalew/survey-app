export const QUESTION_TYPES = {
  TEXT: "TEXT",
  NUMBER: "NUMBER",
  DATE: "DATE",
  EMAIL: "EMAIL",
  SELECT: "SELECT",
  MULTISELECT: "MULTISELECT",
} as const;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];
