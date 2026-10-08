# Portfolio v2 Improvement Plan & Master Specification

**Goal:** Position Meghraj as an engineer who owns hard backend, AI/ML, and mobile delivery end to end, with demonstrable system ownership and architecture depth rather than a superficial framework checklist.  
**Primary Targets:** AI/ML Engineering roles, Senior Backend Engineering roles, and Enterprise Technical Consulting contracts.  
**Personal Brand Identity:** *"Backend-First. AI-Augmented. Ships Solo."*

---

## 1. Executive Status & Baseline

- **Starting Audit Score:** 4.5 / 10 (Post-dev audit on commit `4a943b2`)
- **Testing Contract:** Decoupled; 66 FE tests and 27 BE tests passing 100% with 0 flakes.
- **Key Blockers from Audit:**
  1. Production bundle leak on Firebase (`https://meghraj-portfolio.web.app` serving outdated August 2026 build with banned internal terms).
  2. PII leak in LaTeX resume source (`resume.tex:36` with telephone & WhatsApp).
  3. Critical dependency vulnerability in backend (`proxy-addr` GHSA-jqcg-44mw-7w3h).
  4. Express CORS 500 error on disallowed origins (`portfolio-backend/src/index.ts:376`).
  5. Firebase `/resume` route rewriting to root `index.html`.
  6. Monolithic Express backend (663 lines) needing architectural split.
  7. Missing Operator RAG v1, corpus, console UI, theme pass, and easter eggs.

---

## 2. Master Phases & Implementation Status

### Phase 1: Hygiene Sprint
- [x] **HAR Purge:** Purged 4,785-line HAR; added `*.har` to `.gitignore` (`cc0e3ed`).
- [x] **Environment Hygiene:** Untracked `.env.local`; added `.env.example` (`87476c5`).
- [x] **Layout & Overflow:** Added horizontal overflow containment (`6dbfc9b`); responsive min-width scroll for `ApiDiagramCard.tsx` (`d1a461d`).
- [x] **Keep-Alive Cron:** Added GitHub Actions workflow pinging backend every 10 min (`a75dbe4`).
- [ ] **Dependency Hygiene:** Update `proxy-addr` in `portfolio-backend` via `npm audit fix` to resolve GHSA-jqcg-44mw-7w3h.

### Phase 2: Resume & Data Sync
- [x] **Source of Truth:** Overleaf resume aligned with `portfolio-frontend/data/resume.ts`.
- [ ] **PII Removal:** Remove unmasked telephone and WhatsApp link from `resume.tex:36`.
- [ ] **Number & Metric Consistency:**
  - Standardize `8` KT sessions (resolve `8+` in `heroProof.ts:57`).
  - Standardize project name: `TFG SecureBank` across all files (resolve `TFG SecureBanking` in `data/resume.ts:128` & `resume.tex:142`).
  - Soften claims: change `tamper-proof` to `tamper-evident` in `data/resume.ts:136` and `resume.tex:151`.
- [ ] **Route Delivery Fix:** Add `cleanUrls: true` and explicit rewrite in `portfolio-frontend/firebase.json` so `/resume` serves `resume.html`.

### Phase 3: Content & UX Phase
- [x] **Action Bullets Disclosure:** Rendered via `ProjectDetailsToggle.tsx` (`31e0185`).
- [x] **Project Hierarchy:** Reordered projects to:
  1. TFGenAPI (Verification & Platform Infrastructure)
  2. IYOV AI (AI & Workforce Management)
  3. TFG SecureBank (FinTech & Rules Engine)
  4. Medical Advisor (Healthcare & Model Gateway)
  5. DealsMart (E-Commerce Platform)
  6. IYOV AI Mobile (Mobile Publishing & Companion Apps)
- [x] **ROI Calculator Removed:** Cleaned up code and tests (`5884481`).
- [x] **Merged Capabilities:** Unified into `ServicesSection.tsx` (`1b4a481`).
- [x] **SEO Files:** Added `sitemap.ts`, `robots.ts`, `seo.ts`, and `og.png` (`23cad94`).
- [x] **Animation Lifecycle:** Stopped idle loop in `CursorSparks.tsx` (`affc5a6`, `c672efa`).
- [x] **Contact Spam Protection:** Honeypot field and 202 accepted handling (`2393a7c`).
- [ ] **Contact Cold-Start UX:** Add 20s `AbortController` timeout and "Waking server..." prompt after 4s in `useContactForm.ts`.

### Phase 4: Test Decoupling
- [x] **Contract Guard:** Added `scripts/test-contract-check.ts` (`4a943b2`).
- [x] **Decoupled Suites:** Tests assert roles, landmarks, heading hierarchy, and data keys rather than hardcoded long copy strings.

### Phase 5: Operator RAG v1
- [x] **Backend Architectural Split:** Partition `portfolio-backend/src/index.ts` into:
  - `src/routes/` (`contact.ts`, `metrics.ts`, `operator.ts`, `health.ts`)
  - `src/controllers/`
  - `src/services/` (`operator/`, `email/`, `database/`)
  - `src/middleware/` (`cors.ts`, `rateLimit.ts`, `errorHandler.ts`)
- [x] **Public Dossier Corpus:** Curate public-safe `corpus.json` and generate vector embeddings `index.json`:
  - Categories: `dossier_profile`, `dossier_projects`, `dossier_services`.
  - Zero proprietary leaks (no internal table names, endpoints, or unreleased features).
- [x] **Grounded Operator Endpoint (`POST /api/operator`):**
  - In-memory cosine similarity over public index.
  - LLM completion via Google Gemini (`gemini-2.0-flash` or `gemini-1.5-flash`).
  - Structured output schema: `{ answer: string, sourceIds: string[], confidence: number }`.
  - Abstention policy: if confidence < threshold or query is out-of-scope, return graceful canned refusal.
  - Strict guardrails: prompt injection defense, system prompt redaction, salary/PII shielding.
  - Per-IP rate limiting and daily quota cap.
  - Kill-switch: `OPERATOR_ENABLED=false` environment flag.
- [x] **Text-Only Operator Console UI:**
  - Terminal/HUD drawer in frontend.
  - Accessible keyboard shortcuts (e.g., `Ctrl+K` or `~` / grave accent).
  - Typewriter animation for grounded responses.
  - WCAG AA contrast and full screen reader compatibility.
- [x] **Operator Evaluation Suite:** `npm run operator:eval` with red-team test harness (14/14 passed, 100%).

### Phase 6: Operator's Construct Theme
- [x] **Color Tokens:**
  - Obsidian Void background: `#080B10`
  - Stark Arc Cyan: `#00F0FF`
  - Matrix Phosphor Green: `#00FF66`
  - Deep Slate card backgrounds with glassmorphism.
- [x] **Typography Hierarchy:**
  - Display / Accents: `Space Grotesk`
  - Headings & Nav: `Space Grotesk`
  - Body: `DM Sans`
  - Technical / Terminal: `JetBrains Mono`
- [x] **HUD-Style Dossier Frames:** Apply subtle corner bracket borders (`.hud-bracket`) and dossier metadata badges to project cards without breaking data contracts.

### Phase 7: Easter Eggs
- [x] **Flat SVG Telemetry Panels:**
  - Generic endurance coupe (inspired by Ford GT40 profile) at `/garage`.
  - 100cc two-stroke roadster (inspired by classic two-stroke bike) at `/pit`.
- [x] **Implementation Standards:**
  - Pure lightweight 2D SVG/CSS, lazy loaded.
  - No copyrighted trademarks or brand logos.
  - Keyboard accessible modal/trigger with reduced-motion support.

### Phase 8: Recruiter-Facing Copy Pass
- [x] **Copy Consistency Map:** Align titles, dates, numbers, and tech stacks across `data/resume.ts`, `data/projects.ts`, `content/heroProof.ts`, and `resume.tex`.
- [x] **Automated Copy-Lint Script:** Add `npm run lint:copy` script checking for forbidden strings, proprietary names, exclamation points, and length caps.

### Phase 9: Profile Alignment
- [x] **Profile Documentation:** Create `docs/profile-copy.md` containing aligned biographies, headline copies, and project descriptions for LinkedIn and GitHub.

### Phase 10: Launch & Operations
- [x] **Launch Runbook:** Document pre-flight verification, rollback procedures, and deployment gates in `docs/runbook.md`.
- [x] **Smoke Test Script:** Create `scripts/smoke-test.ts` (`npm run smoke`) verifying HTTP endpoints, headers, CORS, and critical asset responses.
- [ ] **Production Deploy:** Deploy sanitized frontend export to Firebase Hosting and backend updates to Render (awaiting user go-ahead).

---

## 3. Core Principles & Non-Negotiables

1. **Absolute Truth & Factual Integrity:** Never invent metrics, clients, revenue numbers, or sole-credit claims. Every assertion must be grounded in verified project history.
2. **Confidentiality & Privacy:** Strict zero-leakage policy. No proprietary internal repository names, internal routes, unreleased client names, phone numbers, or private emails.
3. **Design System & Tokens:** Use CSS tokens and Tailwind theme variables exclusively. No ad-hoc hardcoded hex values in component templates.
4. **Accessibility & Motion Floors:** WCAG 2.1 AA contrast required. Support `prefers-reduced-motion` across all animations and telemetry.
5. **Static Export Discipline:** Frontend must remain statically exportable to Firebase Hosting (`next export` / `out/`). All dynamic runtime computation belongs in the Express API.
6. **Destructive Action Safeguards:** History rewriting (`git filter-repo`, force pushes) and production deployments require explicit user sign-off.

---

## 4. Open Decisions & Approved Directives

| Decision | Selected Resolution | Rationale |
| :--- | :--- | :--- |
| **Professional Title** | **"Senior AI Developer & Full Stack Engineer"** | Exact match with Overleaf resume and TFG positioning; highlights both AI/ML depth and end-to-end full stack architecture. |
| **Availability Line** | **"Available for technical consulting & engineering roles (Remote · Hybrid)"** | Clear, professional, covers both high-value consulting contracts and full-time opportunities. |
| **Render Hosting** | **Free tier + 10-minute automated keep-alive cron** | Cost-effective; keep-alive cron maintains warm state during active recruitment periods; frontend contact form includes cold-start UX fallback. |
| **Tamper & Availability Wording** | **"tamper-evident"** and **"high availability"** | Technically accurate and credible to hiring managers and technical architects; avoids overclaiming. |
| **Tenure Date Wording** | **"July 2024 — Present"** | Standard industry practice for current employment; matches LinkedIn profile and avoids confusion. |

---

## 5. Candidate Context & Memory Profile

### Identity & Background
- **Name:** Thigulla Meghraj Goud (Meghraj)
- **Role:** Senior AI Developer & Full Stack Engineer at Threshing Floor Group (TFG) Pvt Ltd, Hyderabad.
- **Education:** B.Tech in Information Technology, Vignana Bharathi Institute of Technology (VBIT), Hyderabad (2020–2024).
- **Core Stack:** Python (FastAPI), Flutter/Dart, Next.js/React, TypeScript, Express, PostgreSQL, Redis, Docker, ONNX Runtime, Sentence Transformers, AWS EC2.
- **Production Milestones:** 286 endpoints delivered, 61+ database models, 30+ schema migrations, 80+ mobile screens, 96+ web interfaces, 4+ Flutter apps published, KT delivered to 8 engineers.
