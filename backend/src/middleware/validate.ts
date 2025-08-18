import { error } from "console";
import type { Request, Response, NextFunction } from "express";

export function validateId(paramName: string = "id") {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params[paramName]);

    if (!Number.isFinite(id)) {
      return res.status(400).json({
        error: { message: `Invalid id parameter` },
      });
    }
    (req as any).validatedId = id;
    next();
  };
}

export function validateSurveyId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return validateId("id")(req, res, next);
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    status: "error",
    message: "Not Found",
  });
}
