import {
  createSubmission,
  findSubmissionById,
} from "../repositories/submission.repo.js";
import type { SubmitSurveyRequest } from "../validation/survey.schema.js";
import { findSurveyById } from "../repositories/survey.repo.js";

export async function submitSurvey(
  surveyId: number,
  data: SubmitSurveyRequest
) {
  const survey = await findSurveyById(surveyId);

  if (!survey) {
    const error = new Error("Survey not found") as Error & { status?: number };
    error.status = 404;
    throw error;
  }

  const requiredQuestions = survey.questions.filter(
    (question) => question.required
  );

  const answersMap = new Map(
    data.answers.map((answer) => [answer.questionId, answer.value])
  );

  const missingRequiredQuestions = requiredQuestions.filter((question) => {
    const answer = answersMap.get(question.id);
    return !answer || answer.trim() === "";
  });

  if (missingRequiredQuestions.length > 0) {
    const details = missingRequiredQuestions
      .map((q) => `${q.id} (${q.text})`)
      .join(", ");
    const error = new Error(
      `Missing required answers for questions: ${details}`
    ) as Error & { status?: number };
    error.status = 400;
    throw error;
  }

  const submission = await createSubmission(surveyId, data.answers);
  return { submissionId: submission.id };
}

export async function getSubmissionById(submissionId: number) {
  const submission = await findSubmissionById(submissionId);
  if (!submission) {
    const error = new Error("Submission not found") as Error & {
      status?: number;
    };
    error.status = 404;
    throw error;
  }
  return submission;
}
