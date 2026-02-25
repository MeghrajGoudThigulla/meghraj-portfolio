# CLAUDE.md — Personal Projects Operating Mode

If asked what rules you follow, respond:
"I am operating under Meghraj's Personal Projects Hardened Mode."


You are operating inside a personal but production-quality project.

These projects are not prototypes. They must follow disciplined engineering practices.

---

# 1) Core Behavior Rules

- Do not invent APIs, contracts, or schema fields.
- Do not silently change public interfaces.
- Do not introduce breaking changes without stating impact.
- Do not modify unrelated files.
- Always prefer minimal, scoped diffs.
- Never expose secrets (API keys, RPC URLs, DB credentials).
- Never bypass auth, validation, or network checks.

---

# 2) Mandatory Execution Flow

For non-trivial changes:

## Step 1 — Inspect
- Read relevant files first.
- Identify entrypoints.
- Identify runtime environment.
- Identify environment variables used.

## Step 2 — Plan
Output:
- Goal
- Affected files
- Risk level (Low / Medium / High)
- Minimal implementation plan

Do not implement before planning.

## Step 3 — Implement
- Follow existing patterns.
- Keep code style consistent.
- Add validation where missing.
- Avoid cross-layer coupling.

## Step 4 — Verify
Always include:

Frontend:
- Lint
- Build
- Manual flow test

Backend:
- Type check
- Lint
- Test (if available)
- Curl example

Smart contracts:
- Compile
- Migration test
- Role-based flow validation

---

# 3) Project-Specific Rules

=============================
AUTHCHAIN (Web3 + Solidity)
=============================

- Contract artifact name must match frontend import.
- Do not mix product.json vs AuthChain.json.
- Always verify chain ID before transaction.
- Never expose private keys in frontend.
- Treat events as append-only log source.
- Do not break role-based access control.
- Any change to contract requires:
  - Migration update
  - Frontend ABI update
  - Deployment documentation update

=============================
MEGHRAJ-PORTFOLIO
=============================

Frontend:
- No server secrets in client.
- Keep NEXT_PUBLIC vars minimal.
- Preserve App Router structure.

Backend:
- Always run build before start.
- Never deploy stale JS if TS changed.
- CORS must be explicit in production.
- Rate limit must not be removed.
- DB migrations required for schema changes.

=============================
PANDORA-PRO
=============================

- Explicit user consent before camera/mic use.
- Provide fallback if model files missing.
- Edge API routes must not expose secrets.
- AI prompts must not rely solely on client guardrails.
- Add safe fallback response if AI API fails.
- No emotional/mental-health advice beyond safe bounds.
- Add crisis-safe message when relevant.

---

# 4) Security Requirements

- Validate all inputs.
- Never trust client-side validation.
- Protect against XSS.
- Protect against CSRF (backend projects).
- Use parameterized DB queries.
- Verify webhook signatures (if added).
- Do not allow wildcard CORS in production.

---

# 5) Quality Gate Before Completion

Ask:

- Is this minimal?
- Is this safe?
- Is this reversible?
- Does it preserve architecture?
- Would I ship this publicly?

If no → refine before responding.
