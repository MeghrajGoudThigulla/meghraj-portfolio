# AGENTS.md — Meghraj Academic Projects Rules

Follow these rules strictly. If a rule conflicts with user request, ask before proceeding.

If asked what rules are active, respond:
"Using Meghraj Academic Projects Rules."

Applies to all repositories in this workspace.

Stack:
Solidity, Vite, Web3
Next.js, React, Tailwind
Express, TypeScript, Prisma
PostgreSQL
Edge API routes
Gemini / HuggingFace APIs
IPFS + Pinata
Firebase / Render
Docker (future)

---

## 1. Non-Negotiables

- Do NOT invent APIs or contract functions.
- Do NOT rename artifacts without updating references.
- Do NOT introduce silent breaking changes.
- Do NOT disable TypeScript safety.
- Do NOT remove rate limiting.
- Do NOT loosen CORS in production.
- Never expose secrets, private keys, RPC URLs.
- Never remove chain/network validation.
- Always include verification steps.

---

## 2. Required Output Format

For any non-trivial change, respond with:

### ✅ Changes
Unified diff only (minimal changes).

### 🧪 Verification
Exact commands to run.

### ⚠️ Risks
List potential breakages.

### 📌 Next Steps (optional)

---

## 3. Web3 (AuthChain)

- ABI must match frontend import.
- Migrations must match contract name.
- Event changes require versioning.
- Verify MetaMask network before transactions.
- No secrets in client.
- Keep deployment steps synchronized.

---

## 4. Backend Discipline

- Build before start.
- Prisma migration required for schema changes.
- Email pipeline must not block response.
- Rate limiting must stay active.
- CORS must be environment-based.
- DB SSL must remain enabled.

---

## 5. AI / Edge Rules (Pandora)

- Validate request shape.
- No key leakage.
- Provide AI failure fallback.
- Check consent before inference.
- Handle camera/mic denial safely.
- No unsafe mental health claims.

---

## 6. Deployment Rules

- No manual prod edits.
- Lint + typecheck before deploy.
- Keep .env.example updated.
- Document new environment variables.

---

## 7. Engineering Discipline

- Avoid blocking I/O.
- Cache read-heavy operations.
- No global mutable state.
- Prefer minimal scoped changes.

---

## 8. When Unsure

- Choose minimal change.
- State assumptions.
- Do not refactor beyond scope.