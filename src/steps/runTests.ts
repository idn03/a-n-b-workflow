import { resolve } from "path";
import type { WorkflowState } from "../types.js";
import { exec } from "../utils/shell.js";
import { logStep } from "../utils/logger.js";

export function runTests(targetDir: string, state: WorkflowState): WorkflowState {
  const cwd = resolve(targetDir);
  const result = exec("npx vitest run --reporter=verbose 2>&1", cwd);

  const output = result.stdout + result.stderr;
  const errors = result.exitCode !== 0 ? ["Tests failed with exit code " + result.exitCode] : [];

  logStep("run_tests", output, errors, [], state.retryCount);

  return {
    ...state,
    testOutput: output,
    testExitCode: result.exitCode,
  };
}
