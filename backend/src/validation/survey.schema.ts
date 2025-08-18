import { z } from "zod";

export const submitSurveySchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.number().int().positive(),
        value: z.string(),
      })
    )
    .min(1, "At least one answer is required"),
});

export type SubmitSurveyRequest = z.infer<typeof submitSurveySchema>;
