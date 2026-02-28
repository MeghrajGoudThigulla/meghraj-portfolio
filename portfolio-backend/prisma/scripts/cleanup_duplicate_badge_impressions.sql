WITH ranked_badge_impressions AS (
  SELECT
    id,
    "eventName",
    "sessionId",
    COALESCE("meta"->>'badgeId', '') AS badge_id,
    "createdAt",
    ROW_NUMBER() OVER (
      PARTITION BY
        "eventName",
        "sessionId",
        COALESCE("meta"->>'badgeId', '')
      ORDER BY "createdAt" ASC, id ASC
    ) AS row_rank
  FROM "PortfolioMetric"
  WHERE "eventName" = 'hero_trust_badge_impression'
    AND "sessionId" IS NOT NULL
)
DELETE FROM "PortfolioMetric"
WHERE id IN (
  SELECT id
  FROM ranked_badge_impressions
  WHERE row_rank > 1
);
