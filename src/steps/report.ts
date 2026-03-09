import type { WorkflowState } from "../types.js";
import { logStep } from "../utils/logger.js";

export function generateReport(state: WorkflowState): string {
  const lines: string[] = [
    "=".repeat(60),
    "  WORKFLOW REPORT",
    "=".repeat(60),
    "",
    `Status:       ${state.finalPassed ? "PASSED" : "FAILED"}`,
    `Retries:      ${state.retryCount}`,
    `Files scanned: ${state.changedFiles.length}`,
    `Tests generated: ${state.generatedTests.length}`,
    `Fixes applied: ${state.fixesApplied.length}`,
    "",
  ];

  if (state.fixesApplied.length > 0) {
    lines.push("Applied fixes:");
    state.fixesApplied.forEach((f) => lines.push(`  - ${f}`));
    lines.push("");
  }

  if (!state.finalPassed && state.failures.length > 0) {
    lines.push("Remaining failures:");
    state.failures.forEach((f) =>
      lines.push(`  - ${f.testFile}: ${f.testName} — ${f.error.slice(0, 80)}`)
    );
    lines.push("");
  }

  lines.push("=".repeat(60));

  const report = lines.join("\n");

  logStep("rerun_and_report", report, state.finalPassed ? [] : ["Workflow ended with failures"], state.fixesApplied, state.retryCount);

  return report;
}
