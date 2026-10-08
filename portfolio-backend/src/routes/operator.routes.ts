import { Router } from "express";
import { postOperator } from "../controllers/operator.controller";

const router = Router();

router.post("/", postOperator);

export default router;
