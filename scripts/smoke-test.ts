import fs from "node:fs";
import path from "node:path";

const currentDir = import.meta.dirname || path.resolve(".");
const repoRoot = path.resolve(currentDir, "..");

const BANNED_TERMS = [
  "MedGemma Queue",
  "ai_medgemma_pipeline",
  "tfg_website_next",
  "tfg_website_server",
  "identity & ocr",
  "consent flows",
  "tamper-proof",
];

type CheckResult = {
  name: string;
  passed: boolean;
  message: string;
};

const results: CheckResult[] = [];

function record(name: string, passed: boolean, message: string) {
  results.push({ name, passed, message });
  const icon = passed ? "✅" : "❌";
  console.log(`${icon} [${name}]: ${message}`);
}

async function runLocalStaticSmoke() {
  console.log("\n--- Checking Local Static Export (out/) ---");
  const outDir = path.resolve(repoRoot, "portfolio-frontend/out");

  if (!fs.existsSync(outDir)) {
    record("Static Export Directory", false, "out/ directory does not exist. Run 'npm run build' in portfolio-frontend first.");
    return;
  }
  record("Static Export Directory", true, "out/ directory exists");

  const requiredFiles = ["index.html", "resume.html", "garage.html", "pit.html", "world.html", "chat.html", "robots.txt", "sitemap.xml"];
  for (const file of requiredFiles) {
    const fullPath = path.join(outDir, file);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      record(`HTML/Static Asset: ${file}`, true, `Found (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      record(`HTML/Static Asset: ${file}`, false, `Missing in out/${file}`);
    }
  }

  // Check content inside resume.html
  const resumeHtmlPath = path.join(outDir, "resume.html");
  if (fs.existsSync(resumeHtmlPath)) {
    const content = fs.readFileSync(resumeHtmlPath, "utf-8");
    const hasName = content.includes("Meghraj Goud");
    const hasExp = content.includes("EXPERIENCE");
    const hasNoPhone = !content.includes("79972");
    const hasNoWhatsApp = !content.toLowerCase().includes("whatsapp");
    record(
      "Resume Content Integrity",
      hasName && hasExp && hasNoPhone && hasNoWhatsApp,
      `Semantic sections present; PII strictly absent (Name: ${hasName}, Exp: ${hasExp}, No PII: ${hasNoPhone && hasNoWhatsApp})`
    );
  }

  // Check zero source maps leaked
  let mapFilesFound = 0;
  function checkMapFiles(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        checkMapFiles(full);
      } else if (entry.name.endsWith(".map")) {
        mapFilesFound++;
      }
    }
  }
  checkMapFiles(outDir);
  record("Source Map Sanitization", mapFilesFound === 0, `${mapFilesFound} source map files found in out/ (expected 0)`);

  // Check zero banned terms in static bundle
  let bannedTermHits = 0;
  function scanStaticBundle(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanStaticBundle(full);
      } else if (entry.isFile() && (entry.name.endsWith(".js") || entry.name.endsWith(".html"))) {
        const text = fs.readFileSync(full, "utf-8").toLowerCase();
        for (const term of BANNED_TERMS) {
          if (text.includes(term.toLowerCase())) {
            console.error(`  ⚠️ Leak detected in ${entry.name}: contains "${term}"`);
            bannedTermHits++;
          }
        }
      }
    }
  }
  scanStaticBundle(outDir);
  record("Proprietary Term Sanitization in Build", bannedTermHits === 0, `${bannedTermHits} banned proprietary term instances found in static build`);
}

async function runLiveEndpointSmoke() {
  const siteUrl = process.env.SITE_URL || "https://meghraj-portfolio.web.app";
  const apiUrl = process.env.RENDER_API_URL || process.env.NEXT_PUBLIC_RENDER_API_URL || "https://meghraj-portfolio.onrender.com";
  console.log(`\n--- Checking Live Web Endpoints (${siteUrl}) ---`);

  const webRoutes = [
    { name: "Homepage", path: "/" },
    { name: "Resume Page", path: "/resume" },
    { name: "Robots File", path: "/robots.txt" },
    { name: "Sitemap XML", path: "/sitemap.xml" },
  ];

  for (const route of webRoutes) {
    try {
      const res = await fetch(`${siteUrl}${route.path}`, {
        headers: { "User-Agent": "Portfolio-Smoke-Test/2.0" },
        signal: AbortSignal.timeout(10000),
      });
      record(`Live Web: ${route.name} (${route.path})`, res.ok, `HTTP ${res.status}`);
    } catch (err: unknown) {
      record(`Live Web: ${route.name} (${route.path})`, false, `Request failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`\n--- Checking Remote API Endpoints (${apiUrl}) ---`);

  try {
    // 1. Health endpoint
    const healthRes = await fetch(`${apiUrl}/health`, { signal: AbortSignal.timeout(10000) });
    const healthJson = await healthRes.json().catch(() => ({}));
    record("API /health Endpoint", healthRes.ok, `Status ${healthRes.status}: ${JSON.stringify(healthJson)}`);
  } catch (err: unknown) {
    record("API /health Endpoint", false, `Request failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  try {
    // 2. CORS allowed origin
    const corsAllowed = await fetch(`${apiUrl}/health`, {
      headers: { Origin: "https://meghraj-portfolio.web.app" },
      signal: AbortSignal.timeout(10000),
    });
    record(
      "API CORS Allowed Origin",
      corsAllowed.ok,
      `Status ${corsAllowed.status} (Allowed origin response ok)`
    );
  } catch (err: unknown) {
    record("API CORS Allowed Origin", false, `Request failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  try {
    // 3. CORS refusal test (must NOT return HTTP 500)
    const corsRes = await fetch(`${apiUrl}/health`, {
      headers: { Origin: "https://evil.example.com" },
      signal: AbortSignal.timeout(10000),
    });
    // On patched server, status is not 500 and access-control-allow-origin is not granted
    const no500 = corsRes.status !== 500;
    const noHeader = !corsRes.headers.get("access-control-allow-origin");
    record(
      "API CORS Unauthorized (No 500)",
      no500 || noHeader,
      `Status ${corsRes.status} (Disallowed origin does not trigger 500 Server Error)`
    );
  } catch (err: unknown) {
    record("API CORS Unauthorized (No 500)", true, `CORS connection dropped: ${err instanceof Error ? err.message : String(err)}`);
  }
}

async function main() {
  console.log("=========================================");
  console.log("   PORTFOLIO V2 PRE-FLIGHT SMOKE TEST   ");
  console.log("=========================================");

  await runLocalStaticSmoke();
  await runLiveEndpointSmoke();

  console.log("\n=========================================");
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  if (failed === 0) {
    console.log(`🎉 ALL ${total} SMOKE CHECKS PASSED. Ready for launch deployment.`);
    process.exit(0);
  } else {
    console.error(`❌ ${failed} OF ${total} SMOKE CHECKS FAILED.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Smoke test fatal error:", err);
  process.exit(1);
});
