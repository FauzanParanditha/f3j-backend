import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

import morgan from "morgan";
import scoreRoutes from "./routes/score.route";
import { errorHandler } from "./utils/errorHandler";
import logger from "./utils/logger";

dotenv.config();

const app = express();

//Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(errorHandler);
app.use(helmet());
app.use(express.json());

// HTTP request log (via morgan, dikirim ke winston)
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Routes
app.use("/api/v1/score", scoreRoutes);

export default app;
