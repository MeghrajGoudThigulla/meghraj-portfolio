"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("./app");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return app_1.app; } });
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const metrics_service_1 = require("./services/metrics.service");
if (process.env.NODE_ENV !== "test") {
    void (0, metrics_service_1.cleanupDedupeRows)("startup");
    const cleanupTimer = setInterval(() => void (0, metrics_service_1.cleanupDedupeRows)("interval"), env_1.dedupeCleanupIntervalHours * 60 * 60 * 1000);
    cleanupTimer.unref();
    // Internal Keep-Alive Ticker: executes SELECT 1 every 12 hours while backend is active
    const KEEP_ALIVE_INTERVAL = 12 * 60 * 60 * 1000;
    const keepAliveTimer = setInterval(async () => {
        try {
            await database_1.pool.query("SELECT 1");
            console.log("[keep-alive] Periodic database ping successful.");
        }
        catch (error) {
            console.error("[keep-alive] Periodic database ping failed:", error);
        }
    }, KEEP_ALIVE_INTERVAL);
    keepAliveTimer.unref();
    app_1.app.listen(env_1.PORT, () => {
        console.log(`API running on port ${env_1.PORT}`);
    });
}
