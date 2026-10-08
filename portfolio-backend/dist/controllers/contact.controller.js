"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postContact = exports.normalizeContactPayload = void 0;
const database_1 = require("../config/database");
const env_1 = require("../config/env");
const rateLimit_1 = require("../middleware/rateLimit");
const email_service_1 = require("../services/email.service");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const normalizeContactPayload = (body) => {
    if (!isPlainObject(body)) {
        return null;
    }
    const payload = body;
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    const rawSegment = typeof payload.segment === "string" ? payload.segment.trim() : "";
    const segment = rawSegment || "Consulting";
    const website = typeof payload.website === "string" ? payload.website.trim() : undefined;
    const elapsedMs = typeof payload.elapsedMs === "number" && Number.isFinite(payload.elapsedMs)
        ? Math.round(payload.elapsedMs)
        : typeof payload.elapsedMs === "string" && !isNaN(Number(payload.elapsedMs))
            ? Math.round(Number(payload.elapsedMs))
            : undefined;
    if (!name || !email || !message) {
        return null;
    }
    if (!EMAIL_REGEX.test(email)) {
        return null;
    }
    if (name.length > 120 || email.length > 254 || message.length > 5000 || segment.length > 80) {
        return null;
    }
    return { name, email, message, segment, website, elapsedMs };
};
exports.normalizeContactPayload = normalizeContactPayload;
const postContact = async (req, res) => {
    const payload = (0, exports.normalizeContactPayload)(req.body);
    if (!payload) {
        return res.status(400).json({ error: "Invalid contact payload" });
    }
    try {
        const { name, email, message, segment, website, elapsedMs } = payload;
        // Honeypot / fast submit bot protection (silent 200 drop)
        const isBot = Boolean(website) || (typeof elapsedMs === "number" && elapsedMs < 2000);
        if (isBot) {
            return res.status(200).json({ success: true });
        }
        const ip = req.ip || "unknown";
        const rateLimit = (0, rateLimit_1.applyRateLimit)(`contact:${ip}`, env_1.rateLimitMax);
        if (!rateLimit.allowed) {
            return res.status(429).json({ error: "Too many requests, try again later." });
        }
        const startedAt = Date.now();
        const contact = await database_1.prisma.contact.create({
            data: {
                name,
                email,
                message,
                segment,
            },
        });
        const responseDurationMs = Date.now() - startedAt;
        void database_1.pool
            .query(`INSERT INTO "PortfolioMetric" ("eventName", "page", "sessionId", "value", "durationMs", "success", "meta")
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)`, [
            "contact_api_request",
            "/api/contact",
            null,
            null,
            responseDurationMs,
            true,
            JSON.stringify({ segment }),
        ])
            .catch((metricError) => {
            console.error("Failed to persist contact API metric", metricError);
        });
        let emailQueued = true;
        try {
            await (0, email_service_1.sendResendEmail)({
                name,
                email,
                message,
                segment,
            });
        }
        catch (emailError) {
            console.error("Email notification failed", emailError);
            emailQueued = false;
        }
        if (!emailQueued) {
            return res.status(202).json({ success: true, id: contact.id, emailQueued: false });
        }
        return res.json({ success: true, id: contact.id });
    }
    catch (error) {
        console.error("/api/contact error", error);
        return res.status(500).json({ error: "Database error" });
    }
};
exports.postContact = postContact;
