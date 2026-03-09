import type { WorkflowState } from "../types.js";
import { parseTestFailures } from "../utils/parser.js";
import { logStep } from "../utils/logger.js";

export function parseFailures(targetDir: string, state: WorkflowState): WorkflowState {
  const failures = parseTestFailures(state.testOutput, targetDir);

  const msg = failures.length > 0
    ? `Found ${failures.length} failure(s): ${failures.map((f) => f.testName).join(", ")}`
    : "No failures detected.";

  logStep("parse_failures", msg, [], [], state.retryCount);

  return { ...state, failures };
}
