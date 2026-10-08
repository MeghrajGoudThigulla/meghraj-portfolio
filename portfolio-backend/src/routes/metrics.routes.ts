import { Router } from "express";
import { postMetrics } from "../controllers/metrics.controller";

const router = Router();

router.post("/", postMetrics);

export default router;
