import { createHash } from "node:crypto";
import type { Request } from "express";
import { pool } from "../config/database";
import {
  badgeImpressionDedupeWindowHours,
  caseExpandDedupeWindowHours,
  roiPresetDedupeWindowHours,
  roiEstimateClickDedupeWindowHours,
  dedupeKeyMaxLength,
  dedupeCleanupTtlDays,
} from "../config/env";

export type MetricPayload = {
  eventName: string;
  page: string;
  sessionId: string | null;
  value: number | null;
  durationMs: number | null;
  success: boolean | null;
  meta: Record<string, unknown> | null;
};

export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

export const normalizeMetricPayload = (body: unknown): MetricPayload | null => {
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

export const getMetricBadgeId = (meta: Record<string, unknown> | null): string | null => {
  if (!meta) return null;
  const rawBadgeId = meta.badgeId;
  if (typeof rawBadgeId !== "string") return null;
  const badgeId = rawBadgeId.trim();
  if (!badgeId || badgeId.length > 120) return null;
  return badgeId;
};

export const getMetricCaseId = (meta: Record<string, unknown> | null): string | null => {
  if (!meta) return null;
  const rawCaseId = meta.caseId;
  if (typeof rawCaseId !== "string") return null;
  const caseId = rawCaseId.trim();
  if (!caseId || caseId.length > 120) return null;
  return caseId;
};

export const getMetricRoiPresetId = (meta: Record<string, unknown> | null): string | null => {
  if (!meta) return null;
  const rawPresetId = meta.presetId;
  if (typeof rawPresetId !== "string") return null;
  const presetId = rawPresetId.trim();
  if (!presetId || presetId.length > 120) return null;
  return presetId;
};

export const getMetricRoiEstimateKey = (meta: Record<string, unknown> | null): string | null => {
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

export const getMetricValueKey = (value: number | null): string | null => {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return `value:${Math.round(value)}`;
};

export const getMetricFallbackHashKey = (payload: MetricPayload): string => {
  const seed = JSON.stringify({
    page: payload.page,
    value: payload.value,
    durationMs: payload.durationMs,
    success: payload.success,
    meta: payload.meta ?? {},
  });
  const hash = createHash("sha256").update(seed).digest("hex").slice(0, 24);
  return `fallback:${hash}`;
};

export const clampDedupeKey = (key: string): string => key.slice(0, dedupeKeyMaxLength);

export const getDedupeWindowStart = (windowHours: number): Date => {
  const windowMs = windowHours * 60 * 60 * 1000;
  const nowMs = Date.now();
  const bucketStartMs = Math.floor(nowMs / windowMs) * windowMs;
  return new Date(bucketStartMs);
};

export const getMetricSessionFallback = (req: Request) => {
  const ip = req.ip || "unknown";
  const userAgent = (req.get("user-agent") || "unknown").slice(0, 256);
  const fingerprint = createHash("sha256")
    .update(`${ip}|${userAgent}`)
    .digest("hex")
    .slice(0, 24);
  return `anon-${fingerprint}`;
};

export const isUniqueViolationError = (error: unknown): error is { code: string } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: string }).code === "23505";

export const isMissingRelationError = (error: unknown): error is { code: string } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: string }).code === "42P01";

export const cleanupDedupeRows = async (source: "startup" | "interval") => {
  try {
    const result = await pool.query(
      `DELETE FROM "PortfolioMetricDedupe"
       WHERE "createdAt" < NOW() - ($1 * INTERVAL '1 day')`,
      [dedupeCleanupTtlDays],
    );
    if ((result.rowCount ?? 0) > 0) {
      console.log(`[metrics-cleanup:${source}] removed ${result.rowCount} dedupe rows older than ${dedupeCleanupTtlDays} days`);
    }
  } catch (error) {
    if (isMissingRelationError(error)) {
      console.warn(
        `[metrics-cleanup:${source}] skipped because PortfolioMetricDedupe table is not available yet.`,
      );
      return;
    }
    console.error(`[metrics-cleanup:${source}] failed`, error);
  }
};

export {
  badgeImpressionDedupeWindowHours,
  caseExpandDedupeWindowHours,
  roiPresetDedupeWindowHours,
  roiEstimateClickDedupeWindowHours,
};
