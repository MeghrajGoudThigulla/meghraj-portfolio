"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMetrics = void 0;
const database_1 = require("../config/database");
const env_1 = require("../config/env");
const rateLimit_1 = require("../middleware/rateLimit");
const metrics_service_1 = require("../services/metrics.service");
const postMetrics = async (req, res) => {
    const payload = (0, metrics_service_1.normalizeMetricPayload)(req.body);
    if (!payload) {
        return res.status(400).json({ error: "Invalid metric payload" });
    }
    try {
        const ip = req.ip || "unknown";
        const rateLimit = (0, rateLimit_1.applyRateLimit)(`metrics:${ip}`, env_1.metricsRateLimitMax);
        if (!rateLimit.allowed) {
            return res.status(429).json({ error: "Too many metric events, try again later." });
        }
        const badgeId = (0, metrics_service_1.getMetricBadgeId)(payload.meta);
        const caseId = (0, metrics_service_1.getMetricCaseId)(payload.meta);
        const roiPresetId = (0, metrics_service_1.getMetricRoiPresetId)(payload.meta);
        const roiEstimateKey = (0, metrics_service_1.getMetricRoiEstimateKey)(payload.meta);
        const isBadgeImpressionEvent = payload.eventName === "hero_trust_badge_impression";
        const isCaseExpandEvent = payload.eventName === "case_expand";
        const isRoiPresetEvent = payload.eventName === "roi_preset_selected";
        const isRoiEstimateClickEvent = payload.eventName === "roi_estimate_cta_click";
        const normalizedMeta = { ...(payload.meta ?? {}) };
        const roiPresetFallbackKey = (0, metrics_service_1.getMetricRoiEstimateKey)(payload.meta) ?? (0, metrics_service_1.getMetricValueKey)(payload.value);
        const roiEstimateFallbackKey = (0, metrics_service_1.getMetricValueKey)(payload.value);
        const resolvedRoiPresetKey = (0, metrics_service_1.clampDedupeKey)(roiPresetId ?? roiPresetFallbackKey ?? (0, metrics_service_1.getMetricFallbackHashKey)(payload));
        const resolvedRoiEstimateKey = (0, metrics_service_1.clampDedupeKey)(roiEstimateKey ?? roiEstimateFallbackKey ?? (0, metrics_service_1.getMetricFallbackHashKey)(payload));
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
            ? (0, metrics_service_1.clampDedupeKey)(badgeId ?? (0, metrics_service_1.getMetricFallbackHashKey)(payload))
            : isCaseExpandEvent
                ? (0, metrics_service_1.clampDedupeKey)(caseId ?? (0, metrics_service_1.getMetricFallbackHashKey)(payload))
                : isRoiPresetEvent
                    ? resolvedRoiPresetKey
                    : isRoiEstimateClickEvent
                        ? resolvedRoiEstimateKey
                        : null;
        const dedupeWindowHours = isBadgeImpressionEvent
            ? metrics_service_1.badgeImpressionDedupeWindowHours
            : isCaseExpandEvent
                ? metrics_service_1.caseExpandDedupeWindowHours
                : isRoiPresetEvent
                    ? metrics_service_1.roiPresetDedupeWindowHours
                    : isRoiEstimateClickEvent
                        ? metrics_service_1.roiEstimateClickDedupeWindowHours
                        : 0;
        const supportsEventDedupe = Boolean(dedupeMetaField && dedupeMetaValue);
        const metricSessionId = supportsEventDedupe
            ? payload.sessionId ?? (0, metrics_service_1.getMetricSessionFallback)(req)
            : payload.sessionId;
        if (supportsEventDedupe && dedupeMetaField && dedupeMetaValue) {
            const windowStart = (0, metrics_service_1.getDedupeWindowStart)(dedupeWindowHours);
            let metricInsert = { rowCount: 0 };
            try {
                metricInsert = await database_1.pool.query(`WITH dedupe_insert AS (
             INSERT INTO "PortfolioMetricDedupe" ("eventName", "sessionId", "dedupeKey", "windowStart")
             VALUES ($1, $2, $3, $4)
             ON CONFLICT ("eventName", "sessionId", "dedupeKey", "windowStart") DO NOTHING
             RETURNING 1
           )
           INSERT INTO "PortfolioMetric" ("eventName", "page", "sessionId", "value", "durationMs", "success", "meta")
           SELECT $1, $5, $2, $6, $7, $8, $9::jsonb
           FROM dedupe_insert
           RETURNING id`, [
                    payload.eventName,
                    metricSessionId,
                    dedupeMetaValue,
                    windowStart.toISOString(),
                    payload.page,
                    payload.value,
                    payload.durationMs,
                    payload.success,
                    JSON.stringify(normalizedMeta),
                ]);
            }
            catch (insertError) {
                if ((0, metrics_service_1.isUniqueViolationError)(insertError)) {
                    return res.status(202).json({ accepted: true, deduped: true });
                }
                throw insertError;
            }
            if ((metricInsert.rowCount ?? 0) === 0) {
                return res.status(202).json({ accepted: true, deduped: true });
            }
        }
        else {
            await database_1.pool.query(`INSERT INTO "PortfolioMetric" ("eventName", "page", "sessionId", "value", "durationMs", "success", "meta")
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)`, [
                payload.eventName,
                payload.page,
                metricSessionId,
                payload.value,
                payload.durationMs,
                payload.success,
                JSON.stringify(normalizedMeta),
            ]);
        }
        return res.status(202).json({ accepted: true });
    }
    catch (error) {
        console.error("/api/metrics error", error);
        return res.status(500).json({ error: "Metrics storage error" });
    }
};
exports.postMetrics = postMetrics;
