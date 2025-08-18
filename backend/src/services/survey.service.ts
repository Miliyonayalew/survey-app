import { findSurveyById } from "../repositories/survey.repo.js";

export async function getSurveyById(id: number) {
  const survey = await findSurveyById(id);
  if (!survey) {
    const error = new Error("Survey not found") as Error & { status?: number };
    error.status = 404;
    throw error;
  }
  return survey;
}
