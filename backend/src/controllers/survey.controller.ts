import type { Request, Response } from "express";
import { getSurveyById } from "../services/survey.service.js";

export async function getSurveyController(req: Request, res: Response) {
  const id = req.validatedId as number;

  try {
    const survey = await getSurveyById(id);
    return res.status(200).json({
      status: true,
      data: survey,
      message: "Survey fetched successfully",
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
