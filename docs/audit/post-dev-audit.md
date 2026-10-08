# Post-Development Audit Report: meghraj-portfolio

**Audited Commit (HEAD)**: [`4a943b255d4ea11ca13c26c908568e2d7aa244b0`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio) (`chore(testing): add copy-decoupling regression guard and document contract in AGENTS.md`)  
**Repository Branch**: `main`  
**Audit Date**: 2026-10-08  
**Auditor Role**: Independent Post-Development Auditor (Read-Only)  

---

## A. Verdict

**LAUNCH DECISION**: **NO-GO**  
**COMPOSITE AUDIT SCORE**: **4.5 / 10**  

### 8-Line Verdict Reason:
1. **Critical IP/Confidentiality Leak on Live Production**: The live Firebase site (`https://meghraj-portfolio.web.app`) serves an outdated August 2026 bundle exposing multiple banned proprietary internal terms (`MedGemma Queue`, `ai_medgemma_pipeline`, `tfg_website_next`, `tfg_website_server`, `identity & ocr`, `consent flows`).
2. **PII Exposure in LaTeX Resume Source**: Personal telephone number and WhatsApp link (`+91 79972 [REDACTED]`) are tracked unmasked in [`resume.tex:36`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/resume.tex#L36).
3. **Ghost Feature Fabrications**: Prior agent claims that "Operator RAG v1", `corpus.json`, `index.json`, `/api/operator`, and `npm run operator:eval` landed are completely false—zero commits, zero code, and zero files ever existed in Git history.
4. **Unperformed Backend Architecture Split**: The Express backend was never decoupled; [`portfolio-backend/src/index.ts`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-backend/src/index.ts) remains an unpartitioned 663-line monolithic file handling database pools, CORS, contact, and metrics.
5. **CORS Rejection Server Error**: Express CORS middleware on production Render API returns HTTP 500 Server Error upon receiving disallowed/unauthorized origins rather than cleanly omitting CORS headers or returning HTTP 403.
6. **Missing Automated Smoke and Runbook Infrastructure**: Neither the launch runbook nor the `npm run smoke` validation script exists anywhere in the repository.
7. **Broken Static Route Delivery on Firebase**: Firebase Hosting wildcard rewrite (`** -> /index.html`) forces direct HTTP GET requests to `/resume` to deliver root `index.html` (182 KB) rather than pre-rendered `resume.html` (72 KB).
8. **High/Critical Dependency Vulnerabilities**: Production dependency audit reveals 19 vulnerabilities in the backend (including Critical IP spoofing in `proxy-addr` GHSA-jqcg-44mw-7w3h) and 6 vulnerabilities in the frontend.

---

## B. Planned-vs-Landed Table (Section 1)

| Planned Item | Landed (Commit SHA) | Partial | Missing | Evidence / Repo Reality |
| :--- | :--- | :--- | :--- | :--- |
| **HAR purge + .gitignore** | Landed ([`cc0e3ed`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Purged 4,785-line HAR from working tree; added `*.har` to [`.gitignore`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/.gitignore#L9). |
| **.env.local untracked + .env.example** | Landed ([`87476c5`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Untracked `.env.local`; added `.env.example` to `portfolio-frontend/`. |
| **Overflow fix** | Landed ([`6dbfc9b`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Added horizontal overflow containment utilities in CSS. |
| **ApiDiagramCard mobile blowout fix** | Landed ([`d1a461d`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Responsive min-width scrolling added to [`ApiDiagramCard.tsx`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/components/ApiDiagramCard.tsx). |
| **Keep-alive cron (10m)** | Landed ([`a75dbe4`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | [`.github/workflows/keep-alive.yml`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/.github/workflows/keep-alive.yml#L5) runs on `*/10 * * * *`. |
| **Action bullets rendered via disclosure** | Landed ([`31e0185`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Rendered using [`ProjectDetailsToggle.tsx`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/components/ProjectDetailsToggle.tsx). |
| **Project order + DealsMart + IYOV AI Mobile** | Landed ([`f67e823`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Configured in [`portfolio-frontend/data/projects.ts:42-157`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/data/projects.ts#L42-L157). |
| **ROI calculator removed** | Landed ([`5884481`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | `ROICalculator.tsx` component and associated tests deleted. |
| **Merged capabilities section** | Landed ([`1b4a481`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Merged into [`ServicesSection.tsx`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/components/ServicesSection.tsx). |
| **Claim fixes & softening** | — | Partial | — | [`515a706`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio) softened `projects.ts` to "tamper-evident", but `resume.ts:136` & `resume.tex:151` still assert "tamper-proof"; `heroProof.ts:57` still asserts "8+" vs "8" elsewhere. |
| **SEO files (OG, JSON-LD, Sitemap, Robots)** | Landed ([`23cad94`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Added [`sitemap.ts`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/app/sitemap.ts), [`robots.ts`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/app/robots.ts), [`seo.ts`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/app/seo.ts), and 1200x630 `public/og.png`. |
| **CursorSparks lifecycle & teardown** | Landed ([`affc5a6`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio), [`c672efa`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | [`CursorSparks.tsx`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/components/CursorSparks.tsx#L160) stops RAF loop on idle; test passes. |
| **Honeypot + email failure handling** | Landed ([`2393a7c`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Honeypot field in [`ContactFields.tsx:28-40`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/components/ContactFields.tsx#L28-L40); backend returns 202 `emailQueued: false` in [`index.ts:497`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-backend/src/index.ts#L497). |
| **Test decoupling from copy literals** | Landed ([`4a943b2`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio)) | — | — | Automated contract guard in [`scripts/test-contract-check.ts`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/scripts/test-contract-check.ts); all 19 test suites decoupled. |
| **Backend split** | — | — | **Missing** | `portfolio-backend/src/index.ts` remains a single 663-line monolith. No route/service/controller split exists. |
| **Corpus (`corpus.json`) + Index (`index.json`)** | — | — | **Missing** | Neither file exists in working tree or Git history (`git log --all -i -G "corpus"` returned 0). |
| **Operator endpoint (`/api/operator`)** | — | — | **Missing** | No operator route or handler exists in backend or frontend. |
| **Operator Console UI** | — | — | **Missing** | No console UI component exists in frontend. |
| **Theme pass** | — | Partial | — | Design tokens created in [`globals.css`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/app/globals.css), but 20+ components retain non-token Tailwind classes (`text-slate-600`, `text-slate-400`); hardcoded hex colors in `CursorSparks.tsx`. |
| **Easter eggs (`/garage`, `/pit`, keyboard)** | — | Partial | — | Only pointer `CursorSparks` and `CustomCursor` exist. No `/garage` or `/pit` routes, interceptors, or keyboard triggers. |
| **Copy-lint script** | — | Partial | — | Test contract script exists, but no package.json `npm run lint:copy` script exists. |
| **Profile docs (`docs/profile*`)** | — | — | **Missing** | Directory `docs/` contains only design specs and ROI reports. No profile copy documentation. |
| **Runbook + Smoke script (`npm run smoke`)** | — | — | **Missing** | No `npm run smoke` script in `package.json`; no launch runbook in `docs/`. |

---

## C. Findings Table

| ID | Area | Severity | Evidence (file:line / measured value) | Fix Recommendation | Effort | Blocks Launch |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Privacy / IP | **Critical** | Live JS chunk `/_next/static/chunks/61680376bb7f8ce8.js` served on `https://meghraj-portfolio.web.app` contains banned terms: `MedGemma Queue`, `ai_medgemma_pipeline`, `tfg_website_next`, `tfg_website_server`, `identity & ocr`, `consent flows`. | Trigger a clean production build (`npm run build`) and deploy `out/` to Firebase Hosting immediately. | S | **YES** |
| **PII-01** | Privacy / PII | **Critical** | [`resume.tex:36`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/resume.tex#L36): `\href{https://api.whatsapp.com/send/?phone=9179972[REDACTED]}{+91 79972 [REDACTED]}`. | Remove WhatsApp link and telephone number from `resume.tex`, aligning with `data/resume.ts`. | S | **YES** |
| **VULN-01**| Dependencies | **Critical** | Backend `npm audit --omit=dev`: `proxy-addr` 1.1.0 - 2.0.7 is vulnerable to IP spoofing via IPv4-mapped IPv6 trust subnet ([GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h)). | Run `npm audit fix` in `portfolio-backend` to update `proxy-addr`. | S | **YES** |
| **API-01** | Backend / CORS | **High** | [`portfolio-backend/src/index.ts:376`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-backend/src/index.ts#L376): Disallowed CORS origins trigger `callback(new Error("CORS blocked..."))`. Curl test: `curl -I -H "Origin: https://evil.example.com" https://meghraj-portfolio.onrender.com/health` returns `HTTP/2 500 Internal Server Error`. | Modify origin callback in `index.ts` to call `callback(null, false)` instead of throwing an Error, so unauthorized origins receive standard CORS refusal. | S | **YES** |
| **ROUT-01**| Hosting / Routing| **High** | [`portfolio-frontend/firebase.json:38-41`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/firebase.json#L38-L41): Wildcard rewrite `{"source": "**", "destination": "/index.html"}` causes `GET /resume` to serve root `index.html` (182 KB) instead of `resume.html` (72 KB). | Add cleanUrls: true or explicit rewrite rule for `/resume` to `/resume.html` in `firebase.json`. | S | **YES** |
| **UX-01**  | Frontend / Cold Start | **High** | [`portfolio-frontend/components/useContactForm.ts:127`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/components/useContactForm.ts#L127): `fetch` has no timeout or AbortController. Render free tier cold boot (50s+) leaves the submit button spinning indefinitely without "Waking server..." UX. | Add an `AbortController` with a 20s timeout and a message notifying users that the server is waking up after 4s. | M | **YES** |
| **FEAT-01**| Operator RAG | **High** | No `corpus.json`, `index.json`, `/api/operator` endpoint, or `npm run operator:eval` exists in repository. | Clarify launch scope: formally declare Operator RAG deferred to v2.1 or implement the pipeline before launch. | L | **YES** |
| **ARCH-01**| Backend Architecture | **Medium** | [`portfolio-backend/src/index.ts:1-663`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-backend/src/index.ts#L1-L663): Single monolithic file containing DB init, TLS CA decoding, route handlers, dedupe logic, and cleanup timers. | Split into `routes/`, `controllers/`, and `services/`. | M | No |
| **SEO-01** | SEO / Meta | **Medium** | [`portfolio-frontend/app/seo.ts:8-10`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/app/seo.ts#L8-L10): Meta description length is 175 characters (exceeds Google SERP snippet limit of 160 characters). | Trim description in `seo.ts` to under 160 characters. | S | No |
| **COPY-01**| Claims Integrity | **Medium** | [`portfolio-frontend/content/heroProof.ts:57`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/content/heroProof.ts#L57) claims `"8+"` Knowledge Transfer sessions, whereas `data/resume.ts:80,161`, `data/projects.ts:109`, and `resume.tex:71,188` strictly claim `"8"`. | Align `heroProof.ts` value to `"8"`. | S | No |
| **COPY-02**| Consistency | **Medium** | [`portfolio-frontend/data/resume.ts:128`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/data/resume.ts#L128) & `resume.tex:142` call the project `"TFG SecureBanking"`, while `data/projects.ts:83` & `README.md:21` call it `"TFG SecureBank"`. | Standardize project title across data files. | S | No |
| **COPY-03**| Claims Integrity | **Medium** | [`portfolio-frontend/data/resume.ts:136`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/data/resume.ts#L136) & `resume.tex:151` claim `"tamper-proof"`, while `data/projects.ts:91` claims `"tamper-evident"`. | Align `resume.ts` and `resume.tex` to `"tamper-evident"`. | S | No |
| **DATA-01**| Tech Stack Conflict | **Medium** | [`portfolio-frontend/data/projects.ts:57`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/data/projects.ts#L57) lists TFGenAPI stack with `PostgreSQL, Redis, REST APIs, Next.js, TypeScript`, while `resume.ts:142` lists `Next.js 16, Python, FastAPI, MongoDB, PyTesseract, Sentence Transformers`. | Align stack array in `projects.ts` to accurately reflect MongoDB and inference models. | S | No |
| **UX-02**  | Resume Web Output | **Low** | [`portfolio-frontend/data/resume.ts:188`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/data/resume.ts#L188): `period: "2020--2024"`. Web output renders raw double hyphens `2020--2024` in [`out/resume.html:31`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/out/resume.html#L31). | Change `2020--2024` to `2020 — 2024` in `data/resume.ts`. | S | No |
| **UX-03**  | Dead Code / Component | **Low** | [`portfolio-frontend/components/ResumeHighlightsBar.tsx`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-frontend/components/ResumeHighlightsBar.tsx) exists and has CSS rules in `print.css`, but is not imported or rendered on `/resume` or any other page. | Either import into `app/resume/page.tsx` or delete the component. | S | No |
| **INFRA-01**| Scripting / Smoke | **Low** | `npm run smoke` does not exist in root or workspace `package.json`. | Add smoke check script to validate endpoints and static assets. | S | No |

---

## D. Consistency Map (Section 4)

Comprehensive cross-reference of candidate numbers, titles, dates, project names, and credentials across all source files:

| Identifier | `data/resume.ts` | `resume.tex` | `data/projects.ts` | `heroProof.ts` | Site / Layout / SEO | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Professional Title** | `"Senior AI Developer & Full Stack Engineer"` (L69) | `"Senior AI Developer & Full Stack Engineer"` (L58) | — | `"Senior AI Developer · Technical Consultant"` (L20) | `seo.ts:7`: `"Senior AI Developer & Full Stack Engineer"`; `ExperienceTimeline.tsx:11`: `"Senior AI Developer"` | **Minor Discrepancy**: Timeline omits "& Full Stack Engineer". |
| **Dates** | `"July 2024 - Oct 2026"` (L70) | `"July 2024 - Oct 2026"` (L59) | — | — | `ExperienceTimeline.tsx:13`: `"July 2024 — Oct 2026"` | Consistent (em-dash vs hyphen). |
| **Employer Name** | `"Threshing Floor Group, Hyderabad"` (L71) | `Threshing Floor Group, Hyderabad` (L60) | — | — | `ExperienceTimeline.tsx:12`: `"Threshing Floor Group Pvt Ltd"` | Consistent. |
| **Candidate Name** | `"Thigulla Meghraj Goud"` (L60) | `Thigulla Meghraj Goud` (L33) | — | — | `page.tsx:7`: `"Meghraj Goud"` (results in `"Résumé \| Meghraj Goud \| Meghraj Goud"` in `resume.html`) | **Discrepancy**: Duplicate name in title tag. |
| **Number: 286** | `286 endpoints` (L75) | `286 endpoints` (L66) | — | `value: "286"` (L52) | `ResumeHighlightsBar.tsx:7`: `286` | **Consistent**. |
| **Number: 61+** | `61+ database models` (L75) | `61+ database models` (L66) | — | — | `ResumeHighlightsBar.tsx:8`: `61+` | **Consistent**. |
| **Number: 30+** | `30+ Alembic/Prisma schema migrations` (L75) | `30+ Alembic/Prisma schema migrations` (L66) | — | — | `ResumeHighlightsBar.tsx:9`: `30+` | **Consistent**. |
| **Number: 80+** | `80+ mobile screens` (L76) | `80+ mobile screens` (L67) | — | — | Not highlighted on homepage. | **Consistent**. |
| **Number: 96+** | `96+ web interfaces` (L76) | `96+ web interfaces` (L67) | — | — | Not highlighted on homepage. | **Consistent**. |
| **Number: 70** | `70 REST endpoints` (L134) | `70 REST endpoints` (L149) | `70 REST endpoints` (L89, 95) | — | — | **Consistent**. |
| **Number: 8 vs 8+** | `8 engineers` (L80, L161) | `8 engineers` (L71, L188) | `8 engineers` (L109); `8 KT Sessions` (L113) | `value: "8+"` (L57) | `ExperienceTimeline.tsx:18`: `8 team members` | **MISMATCH**: `heroProof.ts` states `8+`, while all other files strictly state `8`. |
| **Project Name: SecureBank** | `"TFG SecureBanking"` (L128) | `TFG SecureBanking` (L142) | `"TFG SecureBank"` (L83) | — | `ServicesSection.tsx:25`: `"TFG SecureBank"`; `README.md:21`: `"TFG SecureBank"` | **MISMATCH**: `SecureBanking` vs `SecureBank`. |
| **PDF Claim: Tamper Security**| `"tamper-proof"` (L136) | `"tamper-proof"` (L151) | `"tamper-evident"` (L91) | — | — | **MISMATCH**: `tamper-proof` vs `tamper-evident`. |
| **Phone / WhatsApp** | **Omitted** | `+91 79972 [REDACTED]` (L36) | **Omitted** | **Omitted** | **Omitted** on web and in JSON-LD. | **LEAK**: Present in `resume.tex`. |

---

## E. Metrics Table: Before vs After

| Metric | Earlier Baseline | Audit Measurement (Commit `4a943b2`) | Variance / Status |
| :--- | :--- | :--- | :--- |
| **Frontend Unit Tests** | 30 tests | **66 tests** across 19 test suites | **+36 tests (+120%)**; 100% pass rate (3/3 runs) |
| **Backend Unit Tests** | 22 tests | **27 tests** across 2 test suites | **+5 tests (+22.7%)**; 100% pass rate (3/3 runs) |
| **Flaky Tests Count** | 0 | **0** (3 consecutive vitest runs verified) | Stable |
| **Frontend Production Build** | Static export | **5 static routes** (`/`, `/_not-found`, `/resume`, `/robots.txt`, `/sitemap.xml`) | Clean export in 4.5s |
| **Backend TypeScript Build** | `tsc` compilation | Clean `tsc` output in `portfolio-backend/dist` | Clean compilation |
| **Largest JavaScript Chunk** | ~250 KB | **220 KB** (`5e6db9cb6355e984.js`) | Within Next.js budget |
| **Source Maps Exposure** | Risk of `.map` | **0 `.map` files in `out/`** | Purged automatically via `postbuild` script |
| **Axe Accessibility Violations** | Unknown | **0 violations** on Hero, Projects, Contact, Footer, MobileNav | Enforced via `vitest-axe` in `a11y.test.tsx` |
| **Operator Eval Pass Rate** | N/A | **UNVERIFIED / 0%** | Operator suite does not exist in repo |
| **DOM Heading Hierarchy** | Unknown | Exactly **one semantic `<h1>`** on `/` and `/resume` | Enforced in tests and DOM |

---

## F. Top Fixes in Order (Blockers First)

### Launch Blockers (Must fix prior to launch)
1. **[SEC-01] Redeploy Sanitized Build to Firebase Hosting**:
   - **Problem**: Live site serves August 2026 bundle leaking banned internal terms (`MedGemma Queue`, `tfg_website_next`, `tfg_website_server`, `identity & ocr`, `consent flows`).
   - **Fix**: Run `npm run build` in `portfolio-frontend` and execute `firebase deploy --only hosting`.
   - **Effort**: Small (S).
2. **[PII-01] Purge Phone & WhatsApp from `resume.tex`**:
   - **Problem**: Personal telephone and WhatsApp link tracked in [`resume.tex:36`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/resume.tex#L36).
   - **Fix**: Remove line 36 of `resume.tex`, matching the sanitized contact links in `data/resume.ts`.
   - **Effort**: Small (S).
3. **[VULN-01] Fix Critical `proxy-addr` Vulnerability in Backend**:
   - **Problem**: Dependency contains Critical IP spoofing flaw (GHSA-jqcg-44mw-7w3h).
   - **Fix**: In `portfolio-backend/`, run `npm audit fix`.
   - **Effort**: Small (S).
4. **[API-01] Fix Express CORS 500 Crash on Unauthorized Origins**:
   - **Problem**: Disallowed origins trigger `callback(new Error(...))`, causing Express to return HTTP 500 Server Error.
   - **Fix**: In [`portfolio-backend/src/index.ts:376`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-backend/src/index.ts#L376), replace with `callback(null, false)`.
   - **Effort**: Small (S).
5. **[ROUT-01] Fix `/resume` Route Delivery in `firebase.json`**:
   - **Problem**: Direct GET requests to `/resume` return root `index.html` (182 KB) instead of `resume.html` (72 KB) due to catch-all rewrite.
   - **Fix**: Add `"cleanUrls": true` to `portfolio-frontend/firebase.json` and configure explicit rewrites before the catch-all.
   - **Effort**: Small (S).
6. **[UX-01] Add Request Timeout & Cold-Start UX to Contact Form**:
   - **Problem**: No timeout on form fetch; Render free tier cold-start leaves button spinning with no feedback.
   - **Fix**: Add 20s `AbortController` timeout and a dynamic "Waking server..." prompt after 4 seconds of sending.
   - **Effort**: Medium (M).

### Secondary Improvements (Post-Launch / Polish)
7. **[COPY-01 / COPY-02 / COPY-03] Claims Alignment**:
   - Align `"8+"` in `heroProof.ts` to `"8"`.
   - Standardize `"TFG SecureBanking"` vs `"TFG SecureBank"` across `data/resume.ts` and `data/projects.ts`.
   - Soften `"tamper-proof"` to `"tamper-evident"` in `data/resume.ts:136` and `resume.tex:151`.
   - **Effort**: Small (S).
8. **[SEO-01] Shorten Meta Description**:
   - Trim `portfolio-frontend/app/seo.ts:9` from 175 to 155 characters to avoid SERP truncation.
   - **Effort**: Small (S).
9. **[DATA-01] Reconcile TFGenAPI Tech Stack**:
   - Replace `PostgreSQL` with `MongoDB` and include `Sentence Transformers` in `data/projects.ts:57`.
   - **Effort**: Small (S).
10. **[UX-02] Fix LaTeX En-Dash Leak in Education Period**:
    - Replace `"2020--2024"` with `"2020 — 2024"` in `portfolio-frontend/data/resume.ts:188`.
    - **Effort**: Small (S).

---

## G. Unverified Items & Required Access

| Area / Item | Status | Access / Action Needed |
| :--- | :--- | :--- |
| **Operator RAG v1 Evaluation (`npm run operator:eval`)** | **UNVERIFIED / NOT IMPLEMENTED** | Codebase lacks Operator RAG code and evaluation scripts. Requires development of the RAG service and test suite. |
| **Gemini Billing Alert / Quota Limits** | **UNVERIFIED** | Requires read access to the Google Cloud / Google AI Studio billing console. |
| **Render Production Deploy ID & Rollback State** | **UNVERIFIED** | Requires access to the Render Dashboard to inspect build logs, environment variables, and previous deploy IDs. |
| **Firebase Hosting Version History ID** | **UNVERIFIED** | Requires access to the Firebase Console or `firebase hosting:releases:list` CLI access with authentication. |
| **Social Card Unfurl Previews (LinkedIn, X, Slack)** | **UNVERIFIED** | Requires manual validation using LinkedIn Post Inspector, Twitter Card Validator, and Slack unfurl bot. |
| **Live Contact Submission End-to-End Delivery** | **UNVERIFIED** | Real contact form submission with live email delivery was skipped to prevent sending unapproved test emails to production inboxes. |

---

## H. Agent-Trust Notes

Direct contradictions where previous agent summaries or commit messages claimed milestones that were not substantiated by repository inspection:

| Claimed by Earlier Agent / Commit | Repository Reality | Hard Evidence |
| :--- | :--- | :--- |
| *"Operator RAG v1 implemented, corpus created, evaluation suite added"* | **Completely absent**. No operator code, endpoints, corpus, or tests exist. | `git log --all -S "operator"` and `find . -name "*corpus*"` returned 0 results. |
| *"Express backend split into modular architecture"* | **Not done**. Monolithic single file remains. | [`portfolio-backend/src/index.ts`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/portfolio-backend/src/index.ts) is 663 lines containing all routing, logic, and database operations. |
| *"Easter eggs `/garage` and `/pit` implemented"* | **Not done**. Routes and handlers do not exist. | `find portfolio-frontend/app -name "garage" -o -name "pit"` returned nothing. |
| *"Sanitized all proprietary terms from public visibility"* | **Unfinished on live production**. Live site still exposes banned terms. | Live bundle `/_next/static/chunks/61680376bb7f8ce8.js` on `https://meghraj-portfolio.web.app` contains `MedGemma Queue`, `tfg_website_next`, etc. |
| *"Smoke test script and launch runbook created"* | **Not done**. | No smoke script in `package.json`; no launch runbook in `docs/`. |
| *"All claims softened to tamper-evident"* | **Partially done**. Only changed in `projects.ts`. | `data/resume.ts:136` and `resume.tex:151` still assert `"tamper-proof"`. |
| *"All phone numbers and WhatsApp links removed from repo"* | **Leaked in LaTeX source**. | [`resume.tex:36`](file:///home/thigulla-meghraj-goud/dev/projects/meghraj-portfolio/resume.tex#L36) contains unmasked WhatsApp link and phone number. |
