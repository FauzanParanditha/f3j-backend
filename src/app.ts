import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";

import morgan from "morgan";
import prisma from "./prisma/client";
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

// heathcheck route
app.get("/health", async (_req: Request, res: Response) => {
  function formatUptime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  }

  try {
    // Contoh cek koneksi database (PostgreSQL/Mongo)
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "ok",
      db: "connected",
      uptime: formatUptime(process.uptime()),
      timestamp: new Date().toLocaleString(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Database not connected",
      error: error.message,
    });
  }
});

export default app;
