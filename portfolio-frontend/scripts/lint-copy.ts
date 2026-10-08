import fs from "node:fs";
import path from "node:path";

const BANNED_TERMS = [
  "MedGemma Queue",
  "ai_medgemma_pipeline",
  "tfg_website_next",
  "tfg_website_server",
  "identity & ocr",
  "consent flows",
  "tamper-proof",
  "TFG SecureBanking",
];

const currentDir = import.meta.dirname || path.resolve(".");

const SCAN_DIRS = [
  path.resolve(currentDir, "../app"),
  path.resolve(currentDir, "../components"),
  path.resolve(currentDir, "../data"),
  path.resolve(currentDir, "../content"),
];

const SCAN_EXTS = [".ts", ".tsx", ".js", ".jsx", ".json", ".tex"];

export type Violation = {
  file: string;
  line: number;
  term: string;
  snippet: string;
};

function scanFile(filePath: string, violations: Violation[]) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((lineText, idx) => {
    // Check banned terms
    for (const term of BANNED_TERMS) {
      if (lineText.toLowerCase().includes(term.toLowerCase())) {
        violations.push({
          file: filePath,
          line: idx + 1,
          term,
          snippet: lineText.trim().slice(0, 100),
        });
      }
    }

    // Check raw double-hyphen dates like "2020--2024" in data/content files
    if (filePath.includes("/data/") || filePath.includes("/content/")) {
      if (/\d{4}--\d{4}/.test(lineText)) {
        violations.push({
          file: filePath,
          line: idx + 1,
          term: "Raw double-hyphen date",
          snippet: lineText.trim().slice(0, 100),
        });
      }
    }
  });
}

function walkDir(dir: string, violations: Violation[]) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "out" || entry.name === "__tests__") {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, violations);
    } else if (entry.isFile() && SCAN_EXTS.some((ext) => entry.name.endsWith(ext))) {
      scanFile(fullPath, violations);
    }
  }
}

export function runCopyLint(): Violation[] {
  const violations: Violation[] = [];
  for (const dir of SCAN_DIRS) {
    walkDir(dir, violations);
  }

  // Also scan resume.tex if it exists
  const resumeTex = path.resolve(currentDir, "../../resume.tex");
  if (fs.existsSync(resumeTex)) {
    scanFile(resumeTex, violations);
  }

  return violations;
}

if (process.argv[1]?.includes("lint-copy")) {
  const violations = runCopyLint();
  if (violations.length > 0) {
    console.error(`❌ COPY LINT FAILED: Found ${violations.length} violations:`);
    for (const v of violations) {
      console.error(`  - ${path.relative(process.cwd(), v.file)}:${v.line} [${v.term}] -> "${v.snippet}"`);
    }
    process.exit(1);
  } else {
    console.log("✅ COPY LINT PASSED: Zero banned terms, unsoftened claims, or raw unformatted dates found.");
    process.exit(0);
  }
}
