import express from "express";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/errorHandler";
import healthRoutes from "./routes/health.routes";
import contactRoutes from "./routes/contact.routes";
import metricsRoutes from "./routes/metrics.routes";
import operatorRoutes from "./routes/operator.routes";

const app = express();

if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

app.use(corsMiddleware);
app.use(express.json({ limit: "16kb" }));

app.use("/", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/operator", operatorRoutes);

app.use(errorHandler);

export { app };
