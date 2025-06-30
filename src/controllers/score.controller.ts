import { Request, Response } from "express";
import { Parser } from "json2csv";
import {
  createScoreService,
  getScoresService,
} from "../services/score.service";
import logger from "../utils/logger";
import { ScoreInput } from "../validators/score.schema";

export const createScore = async (req: Request, res: Response) => {
  try {
    const data = req.body as ScoreInput;
    logger.info(
      `Creating score - Mode: ${data.mode}, Time: ${data.flightTime}`
    );

    const newScore = await createScoreService(data);
    res.status(201).json(newScore);
  } catch (error) {
    logger.error(`Failed to create score: ${error}`);
    res.status(500).json({ message: "Failed to create score", error });
  }
};

export const getScores = async (_req: Request, res: Response) => {
  try {
    const scores = await getScoresService();
    res.json(scores);
  } catch (error) {
    logger.error(`Failed to fetch scores: ${error}`);
    res.status(500).json({ message: "Failed to fetch scores", error });
  }
};

export const exportScoresAsCSV = async (_req: Request, res: Response) => {
  try {
    const rawScores = await getScoresService();

    const scores = rawScores.map((s) => ({
      ...s,
      createdAt: new Date(s.createdAt)
        .toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(",", ""),
    }));

    const fields = [
      "id",
      "mode",
      "flightTime",
      "flightSeconds",
      "landingScore",
      "totalScore",
      "relaunchCount",
      "createdAt",
    ];
    const parser = new Parser({
      fields,
      eol: "\r\n",
      delimiter: ";",
      quote: '"',
    });
    const csv = parser.parse(scores);

    res.header("Content-Type", "text/csv");
    res.attachment("scores.csv");
    res.send(csv);
    return;
  } catch (error) {
    logger.error(`Failed to export scores: ${error}`);
    res.status(500).json({ message: "Failed to export CSV", error });
  }
};
