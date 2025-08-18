import { Router } from "express";
import { getSurveyController } from "../controllers/survey.controller.js";
import { validateSurveyId } from "../middleware/validate.js";

const surveyRoutes = Router();

surveyRoutes.get("/:id", validateSurveyId, getSurveyController);

export default surveyRoutes;
