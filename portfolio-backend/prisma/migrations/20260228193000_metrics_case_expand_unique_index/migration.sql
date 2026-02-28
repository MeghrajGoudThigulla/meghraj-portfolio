WITH ranked_case_expand_events AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY
        "eventName",
        "sessionId",
        COALESCE("meta"->>'caseId', '')
      ORDER BY "createdAt" ASC, id ASC
    ) AS row_rank
  FROM "PortfolioMetric"
  WHERE "eventName" = 'case_expand'
    AND "sessionId" IS NOT NULL
)
DELETE FROM "PortfolioMetric"
WHERE id IN (
  SELECT id
  FROM ranked_case_expand_events
  WHERE row_rank > 1
);

CREATE UNIQUE INDEX "PortfolioMetric_case_expand_unique_session_case_idx"
ON "PortfolioMetric" (
  "eventName",
  "sessionId",
  (COALESCE("meta"->>'caseId', ''))
)
WHERE "eventName" = 'case_expand' AND "sessionId" IS NOT NULL;
