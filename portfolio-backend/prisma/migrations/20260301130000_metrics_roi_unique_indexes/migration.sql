UPDATE "PortfolioMetric"
SET "meta" = jsonb_set(
  COALESCE("meta", '{}'::jsonb),
  '{estimateKey}',
  to_jsonb(
    CONCAT(
      ROUND(("meta"->>'hoursSaved')::numeric)::int,
      ':',
      ROUND(("meta"->>'hourlyRate')::numeric)::int
    )
  ),
  true
)
WHERE "eventName" = 'roi_estimate_cta_click'
  AND COALESCE(BTRIM("meta"->>'estimateKey'), '') = ''
  AND jsonb_typeof("meta"->'hoursSaved') = 'number'
  AND jsonb_typeof("meta"->'hourlyRate') = 'number';

WITH ranked_roi_preset_events AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY
        "eventName",
        "sessionId",
        COALESCE("meta"->>'presetId', '')
      ORDER BY "createdAt" ASC, id ASC
    ) AS row_rank
  FROM "PortfolioMetric"
  WHERE "eventName" = 'roi_preset_selected'
    AND "sessionId" IS NOT NULL
)
DELETE FROM "PortfolioMetric"
WHERE id IN (
  SELECT id
  FROM ranked_roi_preset_events
  WHERE row_rank > 1
);

WITH ranked_roi_estimate_click_events AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY
        "eventName",
        "sessionId",
        COALESCE("meta"->>'estimateKey', '')
      ORDER BY "createdAt" ASC, id ASC
    ) AS row_rank
  FROM "PortfolioMetric"
  WHERE "eventName" = 'roi_estimate_cta_click'
    AND "sessionId" IS NOT NULL
)
DELETE FROM "PortfolioMetric"
WHERE id IN (
  SELECT id
  FROM ranked_roi_estimate_click_events
  WHERE row_rank > 1
);

CREATE UNIQUE INDEX "PortfolioMetric_roi_preset_unique_session_preset_idx"
ON "PortfolioMetric" (
  "eventName",
  "sessionId",
  (COALESCE("meta"->>'presetId', ''))
)
WHERE "eventName" = 'roi_preset_selected' AND "sessionId" IS NOT NULL;

CREATE UNIQUE INDEX "PortfolioMetric_roi_estimate_click_unique_session_estimate_idx"
ON "PortfolioMetric" (
  "eventName",
  "sessionId",
  (COALESCE("meta"->>'estimateKey', ''))
)
WHERE "eventName" = 'roi_estimate_cta_click' AND "sessionId" IS NOT NULL;
