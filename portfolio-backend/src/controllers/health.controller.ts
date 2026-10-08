import type { Request, Response } from "express";
import { pool } from "../config/database";

export const getRoot = (_req: Request, res: Response) => {
  res.send("Consulting Portfolio API Active");
};

export const getHealth = async (_req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", database: "healthy" });
  } catch (error) {
    console.error("Health check database query failed", error);
    res.status(500).json({ status: "error", message: "Database connection failed" });
  }
};
