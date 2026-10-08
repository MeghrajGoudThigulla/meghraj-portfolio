import { app } from "./app";
import { pool } from "./config/database";
import { PORT, dedupeCleanupIntervalHours } from "./config/env";
import { cleanupDedupeRows } from "./services/metrics.service";

if (process.env.NODE_ENV !== "test") {
  void cleanupDedupeRows("startup");
  const cleanupTimer = setInterval(
    () => void cleanupDedupeRows("interval"),
    dedupeCleanupIntervalHours * 60 * 60 * 1000,
  );
  cleanupTimer.unref();

  // Internal Keep-Alive Ticker: executes SELECT 1 every 12 hours while backend is active
  const KEEP_ALIVE_INTERVAL = 12 * 60 * 60 * 1000;
  const keepAliveTimer = setInterval(async () => {
    try {
      await pool.query("SELECT 1");
      console.log("[keep-alive] Periodic database ping successful.");
    } catch (error) {
      console.error("[keep-alive] Periodic database ping failed:", error);
    }
  }, KEEP_ALIVE_INTERVAL);
  keepAliveTimer.unref();

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

export { app };
