import type { TestFailure } from "../types.js";

export function parseTestFailures(output: string, targetDir: string): TestFailure[] {
  const failures: TestFailure[] = [];
  const lines = output.split("\n");

  let currentFile = "";
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match vitest FAIL line: FAIL tests/foo.test.ts > ...
    const failFileMatch = line.match(/FAIL\s+([\w/.\\-]+\.test\.ts)/);
    if (failFileMatch) {
      currentFile = failFileMatch[1];
    }

    // Match assertion/error lines
    const errorMatch = line.match(/AssertionError|Error:|expected.*to\s+be|TypeError/i);
    if (errorMatch && currentFile) {
      const key = `${currentFile}:${line.trim()}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const sourceFile = `${targetDir}/${currentFile.replace(/tests\//, "src/").replace(/\.test\.ts$/, ".ts")}`;
      failures.push({
        testFile: `${targetDir}/${currentFile}`,
        testName: extractTestName(lines, i),
        error: line.trim(),
        sourceFile,
      });
    }
  }

  return failures;
}

function extractTestName(lines: string[], errorIndex: number): string {
  for (let i = errorIndex; i >= Math.max(0, errorIndex - 10); i--) {
    const match = lines[i].match(/[×✕]\s+(.+)/);
    if (match) return match[1].trim();
  }
  return "unknown test";
}
