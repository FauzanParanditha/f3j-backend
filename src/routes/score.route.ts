import { Router } from "express";
import {
  createScore,
  exportScoresAsCSV,
  getScores,
} from "../controllers/score.controller";
import { validate } from "../middlewares/validate";
import { scoreSchema } from "../validators/score.schema";

const router = Router();

router.post("/", validate(scoreSchema), createScore);
router.get("/", getScores);
router.get("/export", exportScoresAsCSV);

export default router;
