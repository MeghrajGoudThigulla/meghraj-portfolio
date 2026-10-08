"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roiEstimateClickDedupeWindowHours = exports.roiPresetDedupeWindowHours = exports.caseExpandDedupeWindowHours = exports.badgeImpressionDedupeWindowHours = exports.cleanupDedupeRows = exports.isMissingRelationError = exports.isUniqueViolationError = exports.getMetricSessionFallback = exports.getDedupeWindowStart = exports.clampDedupeKey = exports.getMetricFallbackHashKey = exports.getMetricValueKey = exports.getMetricRoiEstimateKey = exports.getMetricRoiPresetId = exports.getMetricCaseId = exports.getMetricBadgeId = exports.normalizeMetricPayload = exports.isPlainObject = void 0;
const node_crypto_1 = require("node:crypto");
const database_1 = require("../config/database");
const env_1 = require("../config/env");
Object.defineProperty(exports, "badgeImpressionDedupeWindowHours", { enumerable: true, get: function () { return env_1.badgeImpressionDedupeWindowHours; } });
Object.defineProperty(exports, "caseExpandDedupeWindowHours", { enumerable: true, get: function () { return env_1.caseExpandDedupeWindowHours; } });
Object.defineProperty(exports, "roiPresetDedupeWindowHours", { enumerable: true, get: function () { return env_1.roiPresetDedupeWindowHours; } });
Object.defineProperty(exports, "roiEstimateClickDedupeWindowHours", { enumerable: true, get: function () { return env_1.roiEstimateClickDedupeWindowHours; } });
const isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
exports.isPlainObject = isPlainObject;
const normalizeMetricPayload = (body) => {
    if (!(0, exports.isPlainObject)(body)) {
        return null;
    }
    const eventName = typeof body.eventName === "string" ? body.eventName.trim() : "";
    const page = typeof body.page === "string" ? body.page.trim() : "/";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
    const success = typeof body.success === "boolean" ? body.success : null;
    const value = typeof body.value === "number" && Number.isFinite(body.value) ? body.value : null;
    const durationMs = typeof body.durationMs === "number" && Number.isFinite(body.durationMs)
        ? Math.round(body.durationMs)
        : null;
    const meta = (0, exports.isPlainObject)(body.meta) ? body.meta : null;
    if (!eventName || eventName.length > 80 || page.length > 200) {
        return null;
    }
    if (sessionId.length > 120) {
        return null;
    }
    if (durationMs !== null && (durationMs < 0 || durationMs > 3600000)) {
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
exports.normalizeMetricPayload = normalizeMetricPayload;
const getMetricBadgeId = (meta) => {
    if (!meta)
        return null;
    const rawBadgeId = meta.badgeId;
    if (typeof rawBadgeId !== "string")
        return null;
    const badgeId = rawBadgeId.trim();
    if (!badgeId || badgeId.length > 120)
        return null;
    return badgeId;
};
exports.getMetricBadgeId = getMetricBadgeId;
const getMetricCaseId = (meta) => {
    if (!meta)
        return null;
    const rawCaseId = meta.caseId;
    if (typeof rawCaseId !== "string")
        return null;
    const caseId = rawCaseId.trim();
    if (!caseId || caseId.length > 120)
        return null;
    return caseId;
};
exports.getMetricCaseId = getMetricCaseId;
const getMetricRoiPresetId = (meta) => {
    if (!meta)
        return null;
    const rawPresetId = meta.presetId;
    if (typeof rawPresetId !== "string")
        return null;
    const presetId = rawPresetId.trim();
    if (!presetId || presetId.length > 120)
        return null;
    return presetId;
};
exports.getMetricRoiPresetId = getMetricRoiPresetId;
const getMetricRoiEstimateKey = (meta) => {
    if (!meta)
        return null;
    const rawEstimateKey = meta.estimateKey;
    if (typeof rawEstimateKey === "string") {
        const estimateKey = rawEstimateKey.trim();
        if (estimateKey && estimateKey.length <= 120) {
            return estimateKey;
        }
    }
    const hoursSaved = meta.hoursSaved;
    const hourlyRate = meta.hourlyRate;
    if (typeof hoursSaved === "number" &&
        Number.isFinite(hoursSaved) &&
        typeof hourlyRate === "number" &&
        Number.isFinite(hourlyRate)) {
        return `${Math.round(hoursSaved)}:${Math.round(hourlyRate)}`;
    }
    return null;
};
exports.getMetricRoiEstimateKey = getMetricRoiEstimateKey;
const getMetricValueKey = (value) => {
    if (typeof value !== "number" || !Number.isFinite(value))
        return null;
    return `value:${Math.round(value)}`;
};
exports.getMetricValueKey = getMetricValueKey;
const getMetricFallbackHashKey = (payload) => {
    const seed = JSON.stringify({
        page: payload.page,
        value: payload.value,
        durationMs: payload.durationMs,
        success: payload.success,
        meta: payload.meta ?? {},
    });
    const hash = (0, node_crypto_1.createHash)("sha256").update(seed).digest("hex").slice(0, 24);
    return `fallback:${hash}`;
};
exports.getMetricFallbackHashKey = getMetricFallbackHashKey;
const clampDedupeKey = (key) => key.slice(0, env_1.dedupeKeyMaxLength);
exports.clampDedupeKey = clampDedupeKey;
const getDedupeWindowStart = (windowHours) => {
    const windowMs = windowHours * 60 * 60 * 1000;
    const nowMs = Date.now();
    const bucketStartMs = Math.floor(nowMs / windowMs) * windowMs;
    return new Date(bucketStartMs);
};
exports.getDedupeWindowStart = getDedupeWindowStart;
const getMetricSessionFallback = (req) => {
    const ip = req.ip || "unknown";
    const userAgent = (req.get("user-agent") || "unknown").slice(0, 256);
    const fingerprint = (0, node_crypto_1.createHash)("sha256")
        .update(`${ip}|${userAgent}`)
        .digest("hex")
        .slice(0, 24);
    return `anon-${fingerprint}`;
};
exports.getMetricSessionFallback = getMetricSessionFallback;
const isUniqueViolationError = (error) => typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505";
exports.isUniqueViolationError = isUniqueViolationError;
const isMissingRelationError = (error) => typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "42P01";
exports.isMissingRelationError = isMissingRelationError;
const cleanupDedupeRows = async (source) => {
    try {
        const result = await database_1.pool.query(`DELETE FROM "PortfolioMetricDedupe"
       WHERE "createdAt" < NOW() - ($1 * INTERVAL '1 day')`, [env_1.dedupeCleanupTtlDays]);
        if ((result.rowCount ?? 0) > 0) {
            console.log(`[metrics-cleanup:${source}] removed ${result.rowCount} dedupe rows older than ${env_1.dedupeCleanupTtlDays} days`);
        }
    }
    catch (error) {
        if ((0, exports.isMissingRelationError)(error)) {
            console.warn(`[metrics-cleanup:${source}] skipped because PortfolioMetricDedupe table is not available yet.`);
            return;
        }
        console.error(`[metrics-cleanup:${source}] failed`, error);
    }
};
exports.cleanupDedupeRows = cleanupDedupeRows;
