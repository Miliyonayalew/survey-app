import { prisma } from "../db/prisma.js";
import type { SubmitSurveyRequest } from "../validation/survey.schema.js";

export function createSubmission(
  surveyId: number,
  request: SubmitSurveyRequest["answers"]
) {
  return prisma.$transaction(async (tx) => {
    const submission = await tx.submission.create({
      data: { surveyId },
    });

    await tx.answer.createMany({
      data: request.map((answer) => ({
        submissionId: submission.id,
        questionId: answer.questionId,
        value: answer.value,
      })),
    });

    return submission;
  });
}

export function findSubmissionById(submissionId: number) {
  return prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      survey: {
        include: {
          questions: {
            orderBy: {
              orderIndex: "asc",
            },
          },
        },
      },
      answers: {
        include: {
          question: true,
        },
      },
    },
  });
}
