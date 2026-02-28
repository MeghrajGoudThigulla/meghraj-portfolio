-- ROI section load timing comparison.
-- Update the split timestamp if you need to compare against a different rollout date.
WITH roi_events AS (
  SELECT
    CASE
      WHEN "createdAt" < TIMESTAMPTZ '2026-02-28 00:00:00+05:30' THEN 'before_split'
      ELSE 'after_split'
    END AS phase,
    "durationMs"
  FROM "PortfolioMetric"
  WHERE "eventName" = 'roi_calculator_loaded'
    AND "durationMs" IS NOT NULL
)
SELECT
  phase,
  COUNT(*)::int AS samples,
  ROUND(AVG("durationMs")::numeric, 2) AS avg_duration_ms,
  ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY "durationMs")::numeric, 2) AS p50_duration_ms,
  ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY "durationMs")::numeric, 2) AS p95_duration_ms
FROM roi_events
GROUP BY phase
ORDER BY phase;

-- Optional daily trend (last 14 days).
SELECT
  DATE_TRUNC('day', "createdAt")::date AS day,
  COUNT(*)::int AS samples,
  ROUND(AVG("durationMs")::numeric, 2) AS avg_duration_ms,
  ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY "durationMs")::numeric, 2) AS p95_duration_ms
FROM "PortfolioMetric"
WHERE "eventName" = 'roi_calculator_loaded'
  AND "durationMs" IS NOT NULL
  AND "createdAt" >= NOW() - INTERVAL '14 days'
GROUP BY day
ORDER BY day DESC;
