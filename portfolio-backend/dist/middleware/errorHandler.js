"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof Error && err.message.startsWith("CORS blocked")) {
        res.status(403).json({ error: "CORS blocked: origin not allowed" });
        return;
    }
    console.error("Unhandled application error:", err);
    res.status(500).json({ error: "Internal server error" });
};
exports.errorHandler = errorHandler;
