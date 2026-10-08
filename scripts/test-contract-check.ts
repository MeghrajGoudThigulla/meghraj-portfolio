import fs from "node:fs";
import path from "node:path";

const MAX_COPY_LITERAL_LENGTH = 40;

function findTestFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== "out" && entry.name !== ".git") {
        files.push(...findTestFiles(fullPath));
      }
    } else if (/\.(test|spec)\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

export function checkTestContracts(rootDir: string): { file: string; match: string; length: number }[] {
  const testFiles = findTestFiles(rootDir).filter((f) => !f.includes("test-contract-check"));
  const violations: { file: string; match: string; length: number }[] = [];

  const literalPattern = /(?:(?:get|query|find|getAll|queryAll|findAll)ByText|toHaveTextContent)\s*\(\s*(["'`])([\s\S]*?)\1/g;

  for (const file of testFiles) {
    const content = fs.readFileSync(file, "utf-8");
    let match: RegExpExecArray | null;
    while ((match = literalPattern.exec(content)) !== null) {
      const textLiteral = match[2];
      if (textLiteral.length > MAX_COPY_LITERAL_LENGTH) {
        violations.push({
          file: path.relative(rootDir, file),
          match: match[0],
          length: textLiteral.length,
        });
      }
    }
  }

  return violations;
}

function run() {
  const repoRoot = path.resolve(__dirname, "..");
  const violations = checkTestContracts(repoRoot);

  if (violations.length > 0) {
    console.error(
      `[FAIL] Found hardcoded marketing copy literals > ${MAX_COPY_LITERAL_LENGTH} chars in test files:`,
    );
    for (const v of violations) {
      console.error(` - ${v.file}: "${v.match}" (${v.length} chars)`);
    }
    console.error("Rule: Import copy from shared data/constants modules (resume.ts, heroProof.ts, etc.) rather than hardcoding editorial strings.");
    process.exit(1);
  } else {
    console.log(`[PASS] All test files adhere to the copy-decoupling test contract (no copy string literals > ${MAX_COPY_LITERAL_LENGTH} chars).`);
  }
}

if (require.main === module) {
  run();
}
