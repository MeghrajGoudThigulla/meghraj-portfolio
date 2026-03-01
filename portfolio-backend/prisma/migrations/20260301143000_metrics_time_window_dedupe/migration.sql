DROP INDEX IF EXISTS "PortfolioMetric_badge_impression_unique_session_badge_idx";
DROP INDEX IF EXISTS "PortfolioMetric_case_expand_unique_session_case_idx";
DROP INDEX IF EXISTS "PortfolioMetric_roi_preset_unique_session_preset_idx";
DROP INDEX IF EXISTS "PortfolioMetric_roi_estimate_click_unique_session_estimate_idx";

CREATE TABLE IF NOT EXISTS "PortfolioMetricDedupe" (
  id BIGSERIAL PRIMARY KEY,
  "eventName" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "dedupeKey" TEXT NOT NULL,
  "windowStart" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "PortfolioMetricDedupe_event_session_key_window_idx"
ON "PortfolioMetricDedupe" (
  "eventName",
  "sessionId",
  "dedupeKey",
  "windowStart"
);

CREATE INDEX IF NOT EXISTS "PortfolioMetricDedupe_createdAt_idx"
ON "PortfolioMetricDedupe" ("createdAt");
