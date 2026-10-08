"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOperator = void 0;
const env_1 = require("../config/env");
const rateLimit_1 = require("../middleware/rateLimit");
const operator_service_1 = require("../services/operator/operator.service");
const postOperator = async (req, res) => {
    if (!env_1.operatorEnabled) {
        return res.status(503).json({
            error: "Operator assistant is currently offline.",
        });
    }
    const ip = req.ip || "unknown";
    const rateLimit = (0, rateLimit_1.applyRateLimit)(`operator:${ip}`, 20);
    if (!rateLimit.allowed) {
        return res.status(429).json({
            error: "Rate limit reached. Please wait a moment before sending another message.",
        });
    }
    const body = req.body;
    if (!body || typeof body.query !== "string" || !body.query.trim()) {
        return res.status(400).json({
            error: "Invalid query payload. 'query' string is required.",
        });
    }
    try {
        const result = await (0, operator_service_1.queryOperator)(body.query);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("[operator] Error processing query", error);
        return res.status(500).json({
            error: "An internal error occurred while processing your request.",
        });
    }
};
exports.postOperator = postOperator;
