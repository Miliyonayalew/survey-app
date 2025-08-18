import express from "express";
import helmet from "helmet";
import pino from "pino";
import { pinoHttp } from "pino-http";
import cors from "cors";
import { router as api } from "./routes/index.js";
import { notFound } from "./middleware/validate.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(pinoHttp({ logger: pino({ level: "info" }) }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api", api);

app.use(notFound);

export default app;
