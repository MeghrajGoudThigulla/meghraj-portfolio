import path from "node:path";
import { describe, expect, it } from "vitest";
import { checkTestContracts } from "../../scripts/test-contract-check";

describe("Testing contract guard: decoupled from long copy literals", () => {
  it("ensures no test file uses hardcoded string literals > 40 chars in getByText or toHaveTextContent", () => {
    const rootDir = path.resolve(__dirname, "..");
    const violations = checkTestContracts(rootDir);

    expect(
      violations,
      `Found hardcoded marketing copy literals > 40 chars in test files. Import from shared data/constants instead: \n${JSON.stringify(violations, null, 2)}`
    ).toEqual([]);
  });
});
