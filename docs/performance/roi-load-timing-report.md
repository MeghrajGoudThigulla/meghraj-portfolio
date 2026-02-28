# ROI Load Timing Report

## Scope
- Metric event: `roi_calculator_loaded`
- Metric meaning: client-side time (ms) from navigation start until ROI component mount
- Split cutoff: `2026-02-28 00:00:00 +05:30`

## Query Source
- SQL: `portfolio-backend/prisma/scripts/roi_load_timing_report.sql`

## How to Refresh
```bash
cd portfolio-backend
psql "$DATABASE_URL" -f prisma/scripts/roi_load_timing_report.sql
```

## Snapshot
| Phase | Samples | Avg (ms) | P50 (ms) | P95 (ms) | Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| Before split | 0 | N/A | N/A | N/A | No `roi_calculator_loaded` events found before split cutoff |
| After split | 0 | N/A | N/A | N/A | No `roi_calculator_loaded` events ingested yet |

## Daily Trend (Last 14 Days)
- No rows returned as of 2026-02-28.
