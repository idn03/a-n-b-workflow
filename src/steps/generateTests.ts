import { existsSync, readFileSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
import type { WorkflowState } from "../types.js";
import { logStep } from "../utils/logger.js";

export function generateTests(targetDir: string, state: WorkflowState): WorkflowState {
  const generated: string[] = [];

  for (const srcFile of state.changedFiles) {
    const testFile = deriveTestPath(targetDir, srcFile);
    if (!existsSync(testFile)) {
      const skeleton = buildTestSkeleton(srcFile);
      writeFileSync(testFile, skeleton, "utf-8");
      generated.push(testFile);
    }
  }

  const msg = generated.length > 0
    ? `Generated ${generated.length} test(s): ${generated.join(", ")}`
    : "All source files already have tests.";

  logStep("generate_or_update_unit_tests", msg, [], [], state.retryCount);

  return { ...state, generatedTests: generated };
}

function deriveTestPath(targetDir: string, srcFile: string): string {
  const name = basename(srcFile, ".ts");
  const testsDir = join(targetDir, "tests");
  return join(testsDir, `${name}.test.ts`);
}

function buildTestSkeleton(srcFile: string): string {
  const content = readFileSync(srcFile, "utf-8");
  const moduleName = basename(srcFile, ".ts");

  const exportMatches = content.matchAll(/export\s+function\s+(\w+)/g);
  const fnNames = [...exportMatches].map((m) => m[1]);

  const imports = fnNames.length > 0
    ? `import { ${fnNames.join(", ")} } from "../src/${moduleName}.js";`
    : `// TODO: add imports from "../src/${moduleName}.js"`;

  const tests = fnNames.map(
    (fn) => `  it("${fn} should work correctly", () => {\n    // TODO: implement test\n    expect(${fn}).toBeDefined();\n  });`
  );

  return [
    `import { describe, it, expect } from "vitest";`,
    imports,
    "",
    `describe("${moduleName}", () => {`,
    tests.join("\n\n"),
    `});`,
    "",
  ].join("\n");
}
