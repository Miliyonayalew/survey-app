import express from "express";
import helmet from "helmet";
import pino from "pino";
import { pinoHttp } from "pino-http";
import cors from "cors";

const app = express();

app.use(cors());
app.use(helmet());
app.use(pinoHttp({ logger: pino({ level: "info" }) }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
