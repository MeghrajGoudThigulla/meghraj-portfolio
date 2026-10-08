# Meghraj's Professional Portfolio Frontend

A high-performance, responsive Next.js application designed to showcase technical ownership, backend architecture depth, and adaptive engineering capabilities. Engineered for static export and hosted via Firebase Hosting.

---

## 🚀 Key Architectural Features

### 🧲 Pointer Attraction Physics (`components/Magnetic.tsx`)
* Implements spring-damped magnetic pull tracking.
* Wraps high-importance CTAs (Navbar triggers, theme switcher, submit button, and social profiles) to attract attention on hover proximity.

### 📍 Mix-Blend Custom Cursor (`components/CustomCursor.tsx`)
* Implements a shape-shifting cursor follower using `mix-blend-difference` color inversion.
* Adapts dynamically to hover states (expanding on interactable elements) and handles accessibility by checking pointer coarseness (disabling on touch devices).

### 🌌 Canvas Proximity Backdrop (`components/AnimatedGridBackground.tsx`)
* Draws a 2D HTML5 Canvas coordinate grid of responsive nodes.
* Computes real-time pointer coordinates to expand and brighten local nodes dynamically on cursor proximity.

### 🔔 Spring-Animated Toast Queue (`components/Toast.tsx`)
* A site-wide notifications system powered by Framer Motion spring transitions.
* Interfaced reactively to the contact validation, SLA confirmation, and API submission lifecycles.

### 📝 Fluid Typography & Editorial Layouts
* Programmed math-based `clamp()` utility classes for seamless text scaling across screen sizes.
* Set display headers to `font-black` (900 weight) to establish strong visual presence.
* Placed fading section dividers (`.section-divider`) between consecutive landing page segments.

---

## 🛠 Project Catalog

The landing page displays 6 selected engineering systems reflecting real-world backend ownership and domain adaptability:

1. **TFGenAPI** — Verification & custom API gateway featuring PyTesseract OCR, Sentence Transformers embeddings, and FastAPI.
2. **IYOV AI** — Workforce Management Ecosystem merging FastAPI backend processes and the custom companion Flutter mobile app suite (HRMS, LMS, Portal, Employee).
3. **TFG SecureBank** — FinTech loan validation backend leveraging Python, FastAPI, and Supabase.
4. **Medical Advisor** — Healthcare coordination API using dual-write sync pipelines (Postgres to Firestore).
5. **DealsMart** — Enterprise commerce platform with ACID cart mutations and payment reconciliation.
6. **IYOV AI Mobile** — Companion mobile suite across iOS and Android with automated release pipelines.

---

## 💻 Local Development

### 1. Installation
Install reproducible, lockfile-locked packages:
```bash
npm ci
```

### 2. Development Server
Run the local next development runner:
```bash
npm run dev
```

### 3. Verification Pipeline
Ensure quality gates pass before pushing:
```bash
# Run unit and integration tests (Vitest)
npm run test

# Run code style checks (ESLint)
npm run lint

# Compile Next.js production build and static export
npm run build
```

---

## 📦 Deployment

The project is built as a static application (`output: 'export'`) and deployed to Firebase Hosting.

* **Build Artifacts:** Generates static pages in the `out/` directory.
* **Deploy Command:** Deployed via Firebase CLI:
```bash
firebase deploy
```
