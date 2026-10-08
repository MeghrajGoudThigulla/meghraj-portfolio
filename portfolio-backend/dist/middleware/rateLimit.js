"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRateLimit = exports.cleanupExpiredRateLimits = exports.rateLimitStore = void 0;
const env_1 = require("../config/env");
exports.rateLimitStore = new Map();
const cleanupExpiredRateLimits = (now) => {
    for (const [key, value] of exports.rateLimitStore.entries()) {
        if (now > value.resetAt) {
            exports.rateLimitStore.delete(key);
        }
    }
};
exports.cleanupExpiredRateLimits = cleanupExpiredRateLimits;
const applyRateLimit = (key, limit) => {
    const now = Date.now();
    (0, exports.cleanupExpiredRateLimits)(now);
    const existing = exports.rateLimitStore.get(key);
    if (!existing || now > existing.resetAt) {
        exports.rateLimitStore.set(key, { count: 1, resetAt: now + env_1.rateLimitWindowMs });
        return { allowed: true };
    }
    existing.count += 1;
    if (existing.count > limit) {
        return { allowed: false };
    }
    return { allowed: true };
};
exports.applyRateLimit = applyRateLimit;
