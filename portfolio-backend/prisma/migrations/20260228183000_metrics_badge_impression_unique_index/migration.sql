WITH ranked_badge_impressions AS (
  SELECT
    id,
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

CREATE UNIQUE INDEX "PortfolioMetric_badge_impression_unique_session_badge_idx"
ON "PortfolioMetric" (
  "eventName",
  "sessionId",
  (COALESCE("meta"->>'badgeId', ''))
)
WHERE "eventName" = 'hero_trust_badge_impression' AND "sessionId" IS NOT NULL;
