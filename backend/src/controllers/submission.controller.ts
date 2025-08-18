import type { Request, Response } from "express";
import {
  getSubmissionById,
  submitSurvey,
} from "../services/submission.service.js";
import { submitSurveySchema } from "../validation/survey.schema.js";
import { ZodError } from "zod";

export async function submitSurveyController(req: Request, res: Response) {
  const surveyId = req.validatedId as number;

  try {
    const validatedData = submitSurveySchema.parse(req.body);

    const submission = await submitSurvey(surveyId, validatedData);

    return res.status(201).json({
      status: true,
      data: submission,
      message: "Survey submitted successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: false,
        error: { message: "Validation Failed" },
      });
    }

    const status =
      typeof (error as any).status === "number" ? (error as any).status : 500;
    const message =
      error instanceof Error ? error.message : "Internal server error";

    return res.status(status).json({
      status: false,
      error: { message },
    });
  }
}

export async function getSubmissionController(req: Request, res: Response) {
  const submissionId = req.validatedId as number;

  try {
    const submission = await getSubmissionById(submissionId);

    return res.status(200).json({
      status: true,
      data: submission,
      message: "Submission fetched successfully",
    });
  } catch (error) {
    const status =
      typeof (error as any).status === "number" ? (error as any).status : 500;
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(status).json({
      status: false,
      error: { message },
    });
  }
}
