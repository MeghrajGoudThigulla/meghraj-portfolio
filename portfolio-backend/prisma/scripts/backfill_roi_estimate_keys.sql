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
