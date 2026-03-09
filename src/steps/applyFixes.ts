import { readFileSync, writeFileSync } from "fs";
import type { WorkflowState } from "../types.js";
import { logStep } from "../utils/logger.js";

export function applyFixes(state: WorkflowState): WorkflowState {
  const fixes: string[] = [];

  for (const failure of state.failures) {
    if (!failure.sourceFile) continue;

    const applied = tryFixSource(failure.sourceFile, failure.error);
    if (applied) fixes.push(applied);

    const testFix = tryFixTest(failure.testFile, failure.error);
    if (testFix) fixes.push(testFix);
  }

  const msg = fixes.length > 0
    ? `Applied ${fixes.length} fix(es): ${fixes.join("; ")}`
    : "No automatic fixes could be applied.";

  logStep("apply_simple_fixes", msg, [], fixes, state.retryCount);

  return { ...state, fixesApplied: [...state.fixesApplied, ...fixes] };
}

function tryFixSource(filePath: string, error: string): string | null {
  try {
    const content = readFileSync(filePath, "utf-8");

    // Fix: wrong arithmetic operator (e.g., - instead of +)
    const sumPattern = /return\s+(\w+)\s*-\s*(\w+)/;
    if (error.includes("expected") && content.match(sumPattern)) {
      const fixed = content.replace(sumPattern, "return $1 + $2");
      if (fixed !== content) {
        writeFileSync(filePath, fixed, "utf-8");
        return `Fixed arithmetic operator in ${filePath}`;
      }
    }

    // Fix: off-by-one in comparisons (e.g., < should be <=)
    if (error.includes("expected")) {
      const fixed = content.replace(/(\w+)\s*<\s*(\w+)/g, (match, a, b) => {
        if (a === "i" || b === "length" || b === "len") return `${a} <= ${b}`;
        return match;
      });
      if (fixed !== content) {
        writeFileSync(filePath, fixed, "utf-8");
        return `Fixed boundary condition in ${filePath}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function tryFixTest(testFile: string, _error: string): string | null {
  try {
    const content = readFileSync(testFile, "utf-8");

    // Fix: update wrong import path
    const badImport = content.match(/from\s+["']\.\.\/src\/(\w+)["']/);
    if (badImport) {
      const fixed = content.replace(
        /from\s+["']\.\.\/src\/(\w+)["']/g,
        'from "../src/$1.js"'
      );
      if (fixed !== content) {
        writeFileSync(testFile, fixed, "utf-8");
        return `Fixed import path in ${testFile}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}
