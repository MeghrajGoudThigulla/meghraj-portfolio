import type { Request, Response } from "express";
import { operatorEnabled } from "../config/env";
import { applyRateLimit } from "../middleware/rateLimit";
import { queryOperator } from "../services/operator/operator.service";

export const postOperator = async (req: Request, res: Response) => {
  if (!operatorEnabled) {
    return res.status(503).json({
      error: "Operator assistant is currently offline.",
    });
  }

  const ip = req.ip || "unknown";
  const rateLimit = applyRateLimit(`operator:${ip}`, 20);
  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: "Rate limit reached. Please wait a moment before sending another message.",
    });
  }

  const body = req.body as { query?: unknown };
  if (!body || typeof body.query !== "string" || !body.query.trim()) {
    return res.status(400).json({
      error: "Invalid query payload. 'query' string is required.",
    });
  }

  try {
    const result = await queryOperator(body.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error("[operator] Error processing query", error);
    return res.status(500).json({
      error: "An internal error occurred while processing your request.",
    });
  }
};
