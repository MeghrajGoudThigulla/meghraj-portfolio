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
