import cors from "cors";
import { allowedOrigins } from "../config/env";

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
});
