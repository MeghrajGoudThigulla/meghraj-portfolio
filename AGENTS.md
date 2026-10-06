# Portfolio: meghraj-portfolio

## Goal
Position the brand around engineering depth, architecture, and real system ownership. Technically credible; never invent experience, projects, metrics, clients, or achievements.

## Design System
- Dark theme is the default; preserve the existing light/dark theme switch and CSS custom-property tokens in `portfolio-frontend/app/globals.css`.
- Use the existing blue/teal accents, controlled gradients, and card/surface treatments. Follow nearby component patterns instead of applying glass effects indiscriminately.
- Fonts are loaded in `portfolio-frontend/app/layout.tsx`: `Space Grotesk` for headings, `DM Sans` for body text, and `JetBrains Mono` for technical text.
- Reuse the existing Tailwind theme utilities and shared UI components before adding new styling primitives.

## Project Map
- `portfolio-frontend/` is a Next.js App Router site configured for static export. Firebase Hosting serves the generated `out/` directory.
- Frontend pages live in `portfolio-frontend/app/`; reusable UI lives in `portfolio-frontend/components/`; metric submission helpers live in `portfolio-frontend/lib/metrics.ts`.
- `portfolio-backend/` is the Express API. Routes and server setup are in `portfolio-backend/src/index.ts`; database schema and migrations are in `portfolio-backend/prisma/`.
- The frontend calls the API through `NEXT_PUBLIC_RENDER_API_URL`. Keep request and response contracts aligned across both apps.

## Change Rules
- Keep the frontend statically exportable; backend and database behavior belongs in the Express API.
- Preserve contact and metrics validation, rate limits, deduplication, and database constraints when changing those flows. Update the relevant tests and schema/migrations with behavior changes.
- Treat contact submissions and deployment configuration as sensitive. Do not add real credentials, contact data, or production values to source control or logs.
- Keep portfolio claims factual and supported by the existing project history. Do not add clients, outcomes, metrics, or technical ownership that cannot be verified.
- For database changes, add a new Prisma migration; do not rewrite migrations that may already have been applied.

## Verification Commands
From the repository root:

```sh
# Frontend
(cd portfolio-frontend && npm run test && npm run lint && npm run build)

# Backend
(cd portfolio-backend && npm run test && npm run build)
```

## Rules
- Preserve existing architecture and deployment setup. No framework migrations.
- Scalable structure, isolated components, secure integrations.
- Script repetitive tasks instead of doing them manually.
