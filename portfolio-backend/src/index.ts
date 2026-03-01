import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createHash } from "node:crypto";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool, type PoolConfig } from "pg";

dotenv.config();

const app = express();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Configure it in the environment.");
}

const databaseUrl = process.env.DATABASE_URL;
const caCertFromEnv = process.env.PG_CA_CERT?.replace(/\\n/g, "\n").trim();
const caCertFromBase64 = process.env.PG_CA_CERT_B64
  ? Buffer.from(process.env.PG_CA_CERT_B64, "base64").toString("utf8").trim()
  : undefined;
const base64LooksValid = Boolean(
  caCertFromBase64 && caCertFromBase64.includes("BEGIN CERTIFICATE"),
);
const caCert = process.env.PG_CA_CERT_B64 ? caCertFromBase64 : caCertFromEnv;
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

let sslMode: string | undefined;
let sslQuery: string | undefined;
try {
  const url = new URL(databaseUrl);
  sslMode = url.searchParams.get("sslmode")?.toLowerCase() ?? undefined;
  sslQuery = url.searchParams.get("ssl")?.toLowerCase() ?? undefined;
} catch (error) {
  console.warn("DATABASE_URL could not be parsed for SSL options.", error);
}

const sslModeDisablesSsl = sslMode === "disable";
const sslModeRequiresSsl =
  sslMode === "require" || sslMode === "verify-ca" || sslMode === "verify-full";
const sslModeVerifiesCert = sslMode === "verify-ca" || sslMode === "verify-full";
const sslQueryEnablesSsl = sslQuery === "true" || sslQuery === "1";
const allowInsecure =
  process.env.PG_SSL_ALLOW_SELF_SIGNED === "true" ||
  process.env.PG_SSL_INSECURE === "true";
const forceVerify = process.env.PG_SSL_VERIFY === "true";
const shouldUseSsl =
  !sslModeDisablesSsl &&
  (sslModeRequiresSsl || sslQueryEnablesSsl || Boolean(caCert) || process.env.PG_SSL === "true");
const shouldVerify = Boolean(caCert) || sslModeVerifiesCert || forceVerify;

const sslConfig = shouldUseSsl
  ? {
      ...(caCert ? { ca: caCert } : {}),
      rejectUnauthorized: shouldVerify,
    }
  : undefined;

if (shouldUseSsl && !caCert && !shouldVerify && allowInsecure) {
  console.warn(
    "PG_SSL_ALLOW_SELF_SIGNED is enabled; TLS verification is disabled for this connection.",
  );
}

const poolConfig: PoolConfig & { family?: number } = {
  connectionString: databaseUrl,
  ssl: sslConfig,
  family: 4,
};

const pool = new Pool(poolConfig);

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX) || 20;
const metricsRateLimitMax = Math.max(rateLimitMax * 6, 60);
const badgeImpressionDedupeWindowHours = 24;
const caseExpandDedupeWindowHours = 24;
const roiPresetDedupeWindowHours = 24;
const roiEstimateClickDedupeWindowHours = 24;
const rateLimitStore = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

if (isProduction && allowedOrigins.length === 0) {
  throw new Error("CORS_ORIGINS or FRONTEND_ORIGIN must be set in production.");
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  segment: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cleanupExpiredRateLimits = (now: number) => {
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const applyRateLimit = (key: string, limit: number) => {
  const now = Date.now();
  cleanupExpiredRateLimits(now);
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return { allowed: true as const };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { allowed: false as const };
  }

  return { allowed: true as const };
};

const normalizeContactPayload = (body: unknown): ContactPayload | null => {
  if (!isPlainObject(body)) {
    return null;
  }

  const payload = body;
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const rawSegment = typeof payload.segment === "string" ? payload.segment.trim() : "";
  const segment = rawSegment || "Consulting";

  if (!name || !email || !message) {
    return null;
  }
  if (!EMAIL_REGEX.test(email)) {
    return null;
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000 || segment.length > 80) {
    return null;
  }

  return { name, email, message, segment };
};

type MetricPayload = {
  eventName: string;
  page: string;
  sessionId: string | null;
  value: number | null;
  durationMs: number | null;
  success: boolean | null;
  meta: Record<string, unknown> | null;
};

const normalizeMetricPayload = (body: unknown): MetricPayload | null => {
  if (!isPlainObject(body)) {
    return null;
  }

  const eventName = typeof body.eventName === "string" ? body.eventName.trim() : "";
  const page = typeof body.page === "string" ? body.page.trim() : "/";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  const success = typeof body.success === "boolean" ? body.success : null;
  const value = typeof body.value === "number" && Number.isFinite(body.value) ? body.value : null;
  const durationMs =
    typeof body.durationMs === "number" && Number.isFinite(body.durationMs)
      ? Math.round(body.durationMs)
      : null;
  const meta = isPlainObject(body.meta) ? body.meta : null;

  if (!eventName || eventName.length > 80 || page.length > 200) {
    return null;
  }
  if (sessionId.length > 120) {
    return null;
  }
  if (durationMs !== null && (durationMs < 0 || durationMs > 3_600_000)) {
    return null;
  }
  if (meta) {
    const metaSize = Buffer.byteLength(JSON.stringify(meta), "utf8");
    if (metaSize > 4096) {
      return null;
    }
  }

  return {
    eventName,
    page,
    sessionId: sessionId || null,
    value,
    durationMs,
    success,
    meta,
  };
};

const getMetricBadgeId = (meta: Record<string, unknown> | null): string | null => {
  if (!meta) return null;
  const rawBadgeId = meta.badgeId;
  if (typeof rawBadgeId !== "string") return null;
  const badgeId = rawBadgeId.trim();
  if (!badgeId || badgeId.length > 120) return null;
  return badgeId;
};

const getMetricCaseId = (meta: Record<string, unknown> | null): string | null => {
  if (!meta) return null;
  const rawCaseId = meta.caseId;
  if (typeof rawCaseId !== "string") return null;
  const caseId = rawCaseId.trim();
  if (!caseId || caseId.length > 120) return null;
  return caseId;
};

const getMetricRoiPresetId = (meta: Record<string, unknown> | null): string | null => {
  if (!meta) return null;
  const rawPresetId = meta.presetId;
  if (typeof rawPresetId !== "string") return null;
  const presetId = rawPresetId.trim();
  if (!presetId || presetId.length > 120) return null;
  return presetId;
};

const getMetricRoiEstimateKey = (meta: Record<string, unknown> | null): string | null => {
  if (!meta) return null;

  const rawEstimateKey = meta.estimateKey;
  if (typeof rawEstimateKey === "string") {
    const estimateKey = rawEstimateKey.trim();
    if (estimateKey && estimateKey.length <= 120) {
      return estimateKey;
    }
  }

  const hoursSaved = meta.hoursSaved;
  const hourlyRate = meta.hourlyRate;
  if (
    typeof hoursSaved === "number" &&
    Number.isFinite(hoursSaved) &&
    typeof hourlyRate === "number" &&
    Number.isFinite(hourlyRate)
  ) {
    return `${Math.round(hoursSaved)}:${Math.round(hourlyRate)}`;
  }

  return null;
};

const getMetricSessionFallback = (req: express.Request) => {
  const ip = req.ip || "unknown";
  const userAgent = (req.get("user-agent") || "unknown").slice(0, 256);
  const fingerprint = createHash("sha256")
    .update(`${ip}|${userAgent}`)
    .digest("hex")
    .slice(0, 24);
  return `anon-${fingerprint}`;
};

const isUniqueViolationError = (error: unknown): error is { code: string } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: string }).code === "23505";

if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked: origin not allowed"));
    },
  }),
);
app.use(express.json({ limit: "16kb" }));

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM;
const alertTo = process.env.ALERT_TO;

const sendResendEmail = async (payload: {
  name: string;
  email: string;
  message: string;
  segment: string;
}) => {
  if (!resendApiKey || !resendFrom || !alertTo) {
    console.warn("Resend email not sent: missing RESEND_API_KEY, RESEND_FROM, or ALERT_TO.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [alertTo],
      reply_to: payload.email,
      subject: `New contact: ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nSegment: ${payload.segment}\n\n${payload.message}`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend API error ${response.status}: ${errorBody}`);
  }
};

app.get("/", (_req, res) => {
  res.send("Consulting Portfolio API Active");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const payload = normalizeContactPayload(req.body);
  if (!payload) {
    return res.status(400).json({ error: "Invalid contact payload" });
  }

  try {
    const { name, email, message, segment } = payload;
    const ip = req.ip || "unknown";
    const rateLimit = applyRateLimit(`contact:${ip}`, rateLimitMax);
    if (!rateLimit.allowed) {
      return res.status(429).json({ error: "Too many requests, try again later." });
    }

    const startedAt = Date.now();
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
        segment,
      },
    });

    const responseDurationMs = Date.now() - startedAt;

    void pool
      .query(
        `INSERT INTO "PortfolioMetric" ("eventName", "page", "sessionId", "value", "durationMs", "success", "meta")
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)`,
        [
          "contact_api_request",
          "/api/contact",
          null,
          null,
          responseDurationMs,
          true,
          JSON.stringify({ segment }),
        ],
      )
      .catch((metricError) => {
        console.error("Failed to persist contact API metric", metricError);
      });

    void sendResendEmail({
      name,
      email,
      message,
      segment,
    }).catch((emailError) => {
      console.error("Email notification failed", emailError);
    });

    return res.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("/api/contact error", error);
    return res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/metrics", async (req, res) => {
  const payload = normalizeMetricPayload(req.body);
  if (!payload) {
    return res.status(400).json({ error: "Invalid metric payload" });
  }

  try {
    const ip = req.ip || "unknown";
    const rateLimit = applyRateLimit(`metrics:${ip}`, metricsRateLimitMax);
    if (!rateLimit.allowed) {
      return res.status(429).json({ error: "Too many metric events, try again later." });
    }

    const badgeId = getMetricBadgeId(payload.meta);
    const caseId = getMetricCaseId(payload.meta);
    const roiPresetId = getMetricRoiPresetId(payload.meta);
    const roiEstimateKey = getMetricRoiEstimateKey(payload.meta);
    const isBadgeImpressionEvent = payload.eventName === "hero_trust_badge_impression";
    const isCaseExpandEvent = payload.eventName === "case_expand";
    const isRoiPresetEvent = payload.eventName === "roi_preset_selected";
    const isRoiEstimateClickEvent = payload.eventName === "roi_estimate_cta_click";
    if (isRoiPresetEvent && !roiPresetId) {
      return res.status(400).json({ error: "Invalid metric payload" });
    }
    if (isRoiEstimateClickEvent && !roiEstimateKey) {
      return res.status(400).json({ error: "Invalid metric payload" });
    }

    const normalizedMeta: Record<string, unknown> = { ...(payload.meta ?? {}) };
    if (isRoiPresetEvent && roiPresetId) {
      normalizedMeta.presetId = roiPresetId;
    }
    if (isRoiEstimateClickEvent && roiEstimateKey) {
      normalizedMeta.estimateKey = roiEstimateKey;
    }

    const dedupeMetaField = isBadgeImpressionEvent
      ? "badgeId"
      : isCaseExpandEvent
        ? "caseId"
        : isRoiPresetEvent
          ? "presetId"
          : isRoiEstimateClickEvent
            ? "estimateKey"
            : null;
    const dedupeMetaValue = isBadgeImpressionEvent
      ? badgeId
      : isCaseExpandEvent
        ? caseId
        : isRoiPresetEvent
          ? roiPresetId
          : isRoiEstimateClickEvent
            ? roiEstimateKey
            : null;
    const dedupeWindowHours = isBadgeImpressionEvent
      ? badgeImpressionDedupeWindowHours
      : isCaseExpandEvent
        ? caseExpandDedupeWindowHours
        : isRoiPresetEvent
          ? roiPresetDedupeWindowHours
          : isRoiEstimateClickEvent
            ? roiEstimateClickDedupeWindowHours
            : 0;
    const supportsEventDedupe = Boolean(dedupeMetaField && dedupeMetaValue);
    const metricSessionId = supportsEventDedupe
      ? payload.sessionId ?? getMetricSessionFallback(req)
      : payload.sessionId;

    if (supportsEventDedupe && dedupeMetaField && dedupeMetaValue) {
      let dedupeInsert: { rowCount: number | null } = { rowCount: 0 };
      try {
        dedupeInsert = await pool.query(
          `INSERT INTO "PortfolioMetric" ("eventName", "page", "sessionId", "value", "durationMs", "success", "meta")
           SELECT $1, $2, $3, $4, $5, $6, $7::jsonb
           WHERE NOT EXISTS (
             SELECT 1
             FROM "PortfolioMetric"
             WHERE "eventName" = $1
               AND "sessionId" = $8
               AND COALESCE("meta"->>'${dedupeMetaField}', '') = $9
               AND "createdAt" > NOW() - ($10 * INTERVAL '1 hour')
           )`,
          [
            payload.eventName,
            payload.page,
            metricSessionId,
            payload.value,
            payload.durationMs,
            payload.success,
            JSON.stringify(normalizedMeta),
            metricSessionId,
            dedupeMetaValue,
            dedupeWindowHours,
          ],
        );
      } catch (insertError) {
        if (isUniqueViolationError(insertError)) {
          return res.status(202).json({ accepted: true, deduped: true });
        }
        throw insertError;
      }

      if ((dedupeInsert.rowCount ?? 0) === 0) {
        return res.status(202).json({ accepted: true, deduped: true });
      }
    } else {
      await pool.query(
        `INSERT INTO "PortfolioMetric" ("eventName", "page", "sessionId", "value", "durationMs", "success", "meta")
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)`,
        [
          payload.eventName,
          payload.page,
          metricSessionId,
          payload.value,
          payload.durationMs,
          payload.success,
          JSON.stringify(normalizedMeta),
        ],
      );
    }

    return res.status(202).json({ accepted: true });
  } catch (error) {
    console.error("/api/metrics error", error);
    return res.status(500).json({ error: "Metrics storage error" });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

export { app };
