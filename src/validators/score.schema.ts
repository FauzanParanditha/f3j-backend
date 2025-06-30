import { z } from "zod";

export const scoreSchema = z.object({
  mode: z.enum(["latihan", "kompetisi"]),
  flightTime: z.string().regex(/^\d{1,2}:\d{2}$/, "Format harus MM:SS"),
  flightSeconds: z.number().min(0).max(1000),
  landingScore: z.number().min(0).max(100),
  totalScore: z.number().min(0).max(1000),
  relaunchCount: z.number().min(0),
});

export type ScoreInput = z.infer<typeof scoreSchema>;
