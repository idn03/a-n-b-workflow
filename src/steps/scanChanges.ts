import { readdirSync, statSync } from "fs";
import { join } from "path";
import type { WorkflowState } from "../types.js";
import { logStep } from "../utils/logger.js";

export function scanChanges(targetDir: string, state: WorkflowState): WorkflowState {
  const srcDir = join(targetDir, "src");
  const files = collectTsFiles(srcDir);

  logStep("scan_code_changes", `Found ${files.length} file(s): ${files.join(", ")}`, [], [], state.retryCount);

  return { ...state, changedFiles: files };
}

function collectTsFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectTsFiles(full));
    } else if (entry.endsWith(".ts") && !entry.endsWith(".test.ts")) {
      results.push(full);
    }
  }
  return results;
}
