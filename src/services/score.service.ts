import prisma from "../prisma/client";
import { ScoreInput } from "../validators/score.schema";

export const createScoreService = async (data: ScoreInput) => {
  return await prisma.score.create({ data });
};

export const getScoresService = async () => {
  return await prisma.score.findMany({
    orderBy: { createdAt: "desc" },
  });
};
