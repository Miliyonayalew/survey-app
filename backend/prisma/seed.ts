import { PrismaClient } from "../generated/prisma/index.js";
import { QUESTION_TYPES } from "../src/types/questionTypes.js";

const prisma = new PrismaClient();

async function main() {
  const survey = await prisma.survey.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Intake Survey",
      description: "Basic demographic and health information",
      questions: {
        create: [
          {
            text: "What is your name?",
            type: QUESTION_TYPES.TEXT,
            required: true,
            orderIndex: 1,
          },
          {
            text: "What is your age?",
            type: QUESTION_TYPES.NUMBER,
            orderIndex: 2,
            required: true,
          },
          {
            text: "What is your email?",
            type: QUESTION_TYPES.EMAIL,
            orderIndex: 3,
            required: true,
          },
          {
            text: "What is your gender?",
            type: QUESTION_TYPES.SELECT,
            orderIndex: 4,
            required: true,
            options: "Male,Female,Other",
          },
          {
            text: "Do you have any of the following conditions?",
            type: QUESTION_TYPES.MULTISELECT,
            orderIndex: 5,
            required: true,
            options: "Diabetes,Hypertension,Heart Disease,Cancer,Other",
          },
          {
            text: "What is your preferred contact method?",
            type: QUESTION_TYPES.SELECT,
            orderIndex: 6,
            required: true,
            options: "Email,Phone,Text",
          },
          {
            text: "Date of birth",
            type: QUESTION_TYPES.DATE,
            orderIndex: 7,
            required: true,
          },
          {
            text: "State of residence",
            type: QUESTION_TYPES.SELECT,
            orderIndex: 8,
            required: true,
            options: "California,New York,Texas,Florida,Other",
          },
          {
            text: "What is your preferred contact method?",
            type: QUESTION_TYPES.SELECT,
            orderIndex: 9,
            required: false,
            options: "Email,Phone,Text",
          },
        ],
      },
    },
  });
  console.log("Seeded database with survey", { surveyId: survey.id });
}

main().finally(() => prisma.$disconnect());
