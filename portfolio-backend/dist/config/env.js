"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiApiKey = exports.groqApiKey = exports.operatorEnabled = exports.alertTo = exports.resendFrom = exports.resendApiKey = exports.dedupeCleanupIntervalHours = exports.dedupeCleanupTtlDays = exports.dedupeKeyMaxLength = exports.roiEstimateClickDedupeWindowHours = exports.roiPresetDedupeWindowHours = exports.caseExpandDedupeWindowHours = exports.badgeImpressionDedupeWindowHours = exports.metricsRateLimitMax = exports.rateLimitMax = exports.rateLimitWindowMs = exports.allowedOrigins = exports.caCert = exports.base64LooksValid = exports.databaseUrl = exports.PORT = exports.isProduction = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.isProduction = process.env.NODE_ENV === "production";
exports.PORT = Number(process.env.PORT) || 4000;
exports.databaseUrl = process.env.DATABASE_URL ||
    (process.env.NODE_ENV === "test" || process.env.OPERATOR_EVAL === "true"
        ? "postgresql://mock:mock@localhost:5432/mock"
        : "");
if (!exports.databaseUrl) {
    throw new Error("DATABASE_URL is not set. Configure it in the environment.");
}
const caCertFromEnv = process.env.PG_CA_CERT?.replace(/\\n/g, "\n").trim();
const caCertFromBase64 = process.env.PG_CA_CERT_B64
    ? Buffer.from(process.env.PG_CA_CERT_B64, "base64").toString("utf8").trim()
    : undefined;
exports.base64LooksValid = Boolean(caCertFromBase64 && caCertFromBase64.includes("BEGIN CERTIFICATE"));
exports.caCert = process.env.PG_CA_CERT_B64 ? caCertFromBase64 : caCertFromEnv;
if (process.env.PG_CA_CERT_B64 && !exports.base64LooksValid) {
    console.warn("PG_CA_CERT_B64 is set but does not look like a PEM certificate.");
}
if (process.env.PG_CA_CERT_B64) {
    console.log("TLS CA cert source: PG_CA_CERT_B64", {
        caCertLength: exports.caCert?.length ?? 0,
        base64LooksValid: exports.base64LooksValid,
    });
}
else if (process.env.PG_CA_CERT) {
    console.log("TLS CA cert source: PG_CA_CERT", { caCertLength: exports.caCert?.length ?? 0 });
}
else {
    console.log("TLS CA cert source: none");
}
exports.allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
if (exports.isProduction && exports.allowedOrigins.length === 0) {
    throw new Error("CORS_ORIGINS or FRONTEND_ORIGIN must be set in production.");
}
exports.rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
exports.rateLimitMax = Number(process.env.RATE_LIMIT_MAX) || 20;
exports.metricsRateLimitMax = Math.max(exports.rateLimitMax * 6, 60);
exports.badgeImpressionDedupeWindowHours = 24;
exports.caseExpandDedupeWindowHours = 24;
exports.roiPresetDedupeWindowHours = 24;
exports.roiEstimateClickDedupeWindowHours = 24;
exports.dedupeKeyMaxLength = 120;
exports.dedupeCleanupTtlDays = Math.max(Number(process.env.METRICS_DEDUPE_TTL_DAYS) || 45, 7);
exports.dedupeCleanupIntervalHours = Math.max(Number(process.env.METRICS_DEDUPE_CLEANUP_INTERVAL_HOURS) || 24, 1);
exports.resendApiKey = process.env.RESEND_API_KEY;
exports.resendFrom = process.env.RESEND_FROM;
exports.alertTo = process.env.ALERT_TO;
exports.operatorEnabled = process.env.OPERATOR_ENABLED !== "false";
exports.groqApiKey = process.env.GROQ_API_KEY || "";
exports.geminiApiKey = process.env.GEMINI_API_KEY || "";
