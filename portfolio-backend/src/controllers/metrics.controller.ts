import type { Request, Response } from "express";
import { pool } from "../config/database";
import { metricsRateLimitMax } from "../config/env";
import { applyRateLimit } from "../middleware/rateLimit";
import {
  normalizeMetricPayload,
  getMetricBadgeId,
  getMetricCaseId,
  getMetricRoiPresetId,
  getMetricRoiEstimateKey,
  getMetricValueKey,
  getMetricFallbackHashKey,
  clampDedupeKey,
  getDedupeWindowStart,
  getMetricSessionFallback,
  isUniqueViolationError,
  badgeImpressionDedupeWindowHours,
  caseExpandDedupeWindowHours,
  roiPresetDedupeWindowHours,
  roiEstimateClickDedupeWindowHours,
} from "../services/metrics.service";

export const postMetrics = async (req: Request, res: Response) => {
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
    const normalizedMeta: Record<string, unknown> = { ...(payload.meta ?? {}) };
    const roiPresetFallbackKey =
      getMetricRoiEstimateKey(payload.meta) ?? getMetricValueKey(payload.value);
    const roiEstimateFallbackKey = getMetricValueKey(payload.value);
    const resolvedRoiPresetKey = clampDedupeKey(
      roiPresetId ?? roiPresetFallbackKey ?? getMetricFallbackHashKey(payload),
    );
    const resolvedRoiEstimateKey = clampDedupeKey(
      roiEstimateKey ?? roiEstimateFallbackKey ?? getMetricFallbackHashKey(payload),
    );

    if (isRoiPresetEvent) {
      normalizedMeta.presetId = resolvedRoiPresetKey;
    }
    if (isRoiEstimateClickEvent) {
      normalizedMeta.estimateKey = resolvedRoiEstimateKey;
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
      ? clampDedupeKey(badgeId ?? getMetricFallbackHashKey(payload))
      : isCaseExpandEvent
        ? clampDedupeKey(caseId ?? getMetricFallbackHashKey(payload))
        : isRoiPresetEvent
          ? resolvedRoiPresetKey
          : isRoiEstimateClickEvent
            ? resolvedRoiEstimateKey
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
      const windowStart = getDedupeWindowStart(dedupeWindowHours);
      let metricInsert: { rowCount: number | null } = { rowCount: 0 };
      try {
        metricInsert = await pool.query(
          `WITH dedupe_insert AS (
             INSERT INTO "PortfolioMetricDedupe" ("eventName", "sessionId", "dedupeKey", "windowStart")
             VALUES ($1, $2, $3, $4)
             ON CONFLICT ("eventName", "sessionId", "dedupeKey", "windowStart") DO NOTHING
             RETURNING 1
           )
           INSERT INTO "PortfolioMetric" ("eventName", "page", "sessionId", "value", "durationMs", "success", "meta")
           SELECT $1, $5, $2, $6, $7, $8, $9::jsonb
           FROM dedupe_insert
           RETURNING id`,
          [
            payload.eventName,
            metricSessionId,
            dedupeMetaValue,
            windowStart.toISOString(),
            payload.page,
            payload.value,
            payload.durationMs,
            payload.success,
            JSON.stringify(normalizedMeta),
          ],
        );
      } catch (insertError) {
        if (isUniqueViolationError(insertError)) {
          return res.status(202).json({ accepted: true, deduped: true });
        }
        throw insertError;
      }

      if ((metricInsert.rowCount ?? 0) === 0) {
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
};
