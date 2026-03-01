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
