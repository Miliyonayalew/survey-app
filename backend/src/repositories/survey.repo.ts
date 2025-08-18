import { prisma } from "../db/prisma.js";

export async function findSurveyById(id: number) {
  return prisma.survey.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: {
          orderIndex: "asc",
        },
      },
    },
  });
}
