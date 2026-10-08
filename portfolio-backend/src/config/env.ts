import dotenv from "dotenv";

dotenv.config();

export const isProduction = process.env.NODE_ENV === "production";
export const PORT = Number(process.env.PORT) || 4000;

export const databaseUrl =
  process.env.DATABASE_URL ||
  (process.env.NODE_ENV === "test" || process.env.OPERATOR_EVAL === "true"
    ? "postgresql://mock:mock@localhost:5432/mock"
    : "");

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Configure it in the environment.");
}

const caCertFromEnv = process.env.PG_CA_CERT?.replace(/\\n/g, "\n").trim();
const caCertFromBase64 = process.env.PG_CA_CERT_B64
  ? Buffer.from(process.env.PG_CA_CERT_B64, "base64").toString("utf8").trim()
  : undefined;
export const base64LooksValid = Boolean(
  caCertFromBase64 && caCertFromBase64.includes("BEGIN CERTIFICATE"),
);
export const caCert = process.env.PG_CA_CERT_B64 ? caCertFromBase64 : caCertFromEnv;

if (process.env.PG_CA_CERT_B64 && !base64LooksValid) {
  console.warn("PG_CA_CERT_B64 is set but does not look like a PEM certificate.");
}

if (process.env.PG_CA_CERT_B64) {
  console.log("TLS CA cert source: PG_CA_CERT_B64", {
    caCertLength: caCert?.length ?? 0,
    base64LooksValid,
  });
} else if (process.env.PG_CA_CERT) {
  console.log("TLS CA cert source: PG_CA_CERT", { caCertLength: caCert?.length ?? 0 });
} else {
  console.log("TLS CA cert source: none");
}

export const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (isProduction && allowedOrigins.length === 0) {
  throw new Error("CORS_ORIGINS or FRONTEND_ORIGIN must be set in production.");
}

export const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
export const rateLimitMax = Number(process.env.RATE_LIMIT_MAX) || 20;
export const metricsRateLimitMax = Math.max(rateLimitMax * 6, 60);

export const badgeImpressionDedupeWindowHours = 24;
export const caseExpandDedupeWindowHours = 24;
export const roiPresetDedupeWindowHours = 24;
export const roiEstimateClickDedupeWindowHours = 24;
export const dedupeKeyMaxLength = 120;

export const dedupeCleanupTtlDays = Math.max(Number(process.env.METRICS_DEDUPE_TTL_DAYS) || 45, 7);
export const dedupeCleanupIntervalHours = Math.max(
  Number(process.env.METRICS_DEDUPE_CLEANUP_INTERVAL_HOURS) || 24,
  1,
);

export const resendApiKey = process.env.RESEND_API_KEY;
export const resendFrom = process.env.RESEND_FROM;
export const alertTo = process.env.ALERT_TO;

export const operatorEnabled = process.env.OPERATOR_ENABLED !== "false";
export const groqApiKey = process.env.GROQ_API_KEY || "";
export const geminiApiKey = process.env.GEMINI_API_KEY || "";
