import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { performance } from "node:perf_hooks";
import surveyRoutes from "./survey.route.js";
import submissionRoutes from "./submission.route.js";

export const router = Router();

router.get("/health", async (req, res) => {
  const maxLatency = Number(process.env.MAX_LATENCY_MS ?? 500);
  const start = performance.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    const latency = performance.now() - start;
    const isSlow = latency > maxLatency;

    res.status(isSlow ? 503 : 200).json({
      status: isSlow ? "slow" : "ok",
      latency: latency.toFixed(2),
      maxLatency,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      message: "Database connection failed",
    });
  }
});

router.use("/surveys", surveyRoutes);
router.use("/surveys", submissionRoutes);
