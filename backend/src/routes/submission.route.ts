import { Router } from "express";
import {
  getSubmissionController,
  submitSurveyController,
} from "../controllers/submission.controller.js";
import { validateSurveyId } from "../middleware/validate.js";

const submissionRoutes = Router();

submissionRoutes.post(
  "/:id/submissions",
  validateSurveyId,
  submitSurveyController
);

submissionRoutes.get(
  "/submissions/:id",
  validateSurveyId,
  getSubmissionController
);

export default submissionRoutes;
