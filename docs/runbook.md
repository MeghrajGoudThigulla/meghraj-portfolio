# Portfolio v2 Launch & Operations Runbook

This runbook outlines the strict deployment sequence, operational verification gates, smoke tests, and rollback procedures for Meghraj Goud's portfolio (`portfolio-frontend` static export on Firebase Hosting and `portfolio-backend` Express API on Render).

---

## 1. Architecture Overview

- **Frontend**: Next.js 16 App Router statically exported (`output: 'export'`) to `portfolio-frontend/out/`, served via Firebase Hosting CDN with global SSL and clean URL routing.
- **Backend**: Express 5 on Node.js / Render Web Service (`https://meghraj-portfolio.onrender.com`), connecting to PostgreSQL via Prisma ORM.
- **Telemetry / RAG**: In-memory retrieval engine (`OperatorService`) backed by Gemini API for grounded dossier Q&A, protected by circuit breakers and rate limits.

---

## 2. Pre-Flight Verification Checklist

Before triggering production deployment, execute the following commands from repository root:

```bash
# 1. Verify Frontend Hygiene & Unit Tests
cd portfolio-frontend
npm run lint
npm run lint:copy
npm test
npm run build
cd ..

# 2. Verify Backend Modular Split & Operator Eval
cd portfolio-backend
npm test
npm run operator:eval
npm run build
cd ..

# 3. Execute Smoke Test Suite
npm --prefix portfolio-frontend run smoke
```

### Deployment Gates:
1. **Zero Critical/High Vulnerabilities**: `npm audit --omit=dev` must return 0 high/critical vulnerabilities.
2. **Zero Banned Terms**: `npm run lint:copy` must pass with 0 leaks in application code, data files, or LaTeX resume.
3. **Clean Static Build**: Static export in `portfolio-frontend/out/` must contain:
   - `index.html`, `resume.html`, `garage.html`, `pit.html`
   - Zero `.map` files (source maps stripped)
   - Zero leaked proprietary terms in bundled JS chunks.
4. **Operator Evaluation**: `npm run operator:eval` must achieve 100% accuracy (14/14 tests) across grounding, citation validation, prompt injection defense, and abstain criteria.

---

## 3. Production Deployment Execution

### Step 3.1: Deploy Backend to Render
1. Ensure all changes are committed and pushed to the `main` branch.
2. Render detects the push to `main` and initiates build:
   - Build Command: `npm install && npm run build && npx prisma migrate deploy`
   - Start Command: `npm start` (`node --dns-result-order=ipv4first dist/index.js`)
3. Check Render live logs to confirm server startup:
   - Look for log: `Server listening on port 5000`
   - Verify health: `curl -I https://meghraj-portfolio.onrender.com/health` (should return `HTTP/2 200 OK`).

### Step 3.2: Deploy Frontend to Firebase Hosting
1. Build fresh static export:
   ```bash
   cd portfolio-frontend
   npm run build
   ```
2. Verify output contents:
   ```bash
   ls -la out/resume.html out/garage.html out/pit.html
   ```
3. Deploy to Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```
4. Confirm live site status:
   - Visit `https://meghraj-portfolio.web.app`
   - Verify direct navigation to `https://meghraj-portfolio.web.app/resume` loads `resume.html` directly (not redirecting or falling back to root index).

---

## 4. Post-Deploy Smoke Verification

Execute the automated smoke verification script against production:

```bash
cd portfolio-frontend
npm run smoke
```

### Manual Verification Steps:
1. **Interactive Mechanical Keys & Operator Console**:
   - Press `⌘K` or click the floating HUD button in bottom-right corner.
   - Verify CRT typewriter effect and test keycaps (`01 // ROLE`, `02 // METRICS`, etc.).
   - Verify citations are rendered as source chips (`[profile_identity]`, `[profile_metrics]`).
2. **Contact Form Cold Boot Resilience**:
   - Fill out the contact form and submit.
   - If backend is waking from a cold boot, verify that after 4 seconds the notice appears: *"Waking server, thanks for your patience..."*.
   - Verify successful submission returns confirmation toast.
3. **Easter Egg Telemetry Panels**:
   - Navigate to `/garage` and `/pit`.
   - Verify 2D SVG schematics, dyno curves, and return link to home.

---

## 5. Rollback Procedures

If an incident or regression occurs post-launch:

### Frontend Immediate Rollback (Firebase Hosting)
Firebase Hosting retains immutable version history:
```bash
# List previous hosting releases
firebase hosting:channels:list

# Instant rollback via Firebase Console or CLI redeploy of previous git tag:
git checkout <previous-stable-tag>
cd portfolio-frontend && npm run build
firebase deploy --only hosting
```

### Backend Immediate Rollback (Render)
1. In the Render Dashboard, navigate to the `meghraj-portfolio` Web Service.
2. Under **Deploys**, find the last known healthy deployment.
3. Click the kebab menu `...` and select **Rollback to this deploy**.
4. Render immediately switches traffic back to the prior Docker container / build artifact without recompilation.

---

## 6. Incident & Kill-Switch Operations

### Operator Kill-Switch:
If the Gemini API quota is exhausted or unexpected LLM responses are detected:
- Set environment variable on Render: `OPERATOR_ENABLED=false`
- The backend will immediately return HTTP 503 (`Operator RAG service temporarily offline for maintenance`).
- The frontend gracefully falls back to deterministic local dossier lookup.
