import { readFileSync } from "fs";
import { parse } from "yaml";
import type { WorkflowConfig, WorkflowState } from "./types.js";
import { initLog, logStep } from "./utils/logger.js";
import { scanChanges } from "./steps/scanChanges.js";
import { generateTests } from "./steps/generateTests.js";
import { runTests } from "./steps/runTests.js";
import { parseFailures } from "./steps/parseFailures.js";
import { applyFixes } from "./steps/applyFixes.js";
import { generateReport } from "./steps/report.js";

function loadConfig(path: string): WorkflowConfig {
  const raw = readFileSync(path, "utf-8");
  return parse(raw) as WorkflowConfig;
}

function createInitialState(): WorkflowState {
  return {
    changedFiles: [],
    testFiles: [],
    generatedTests: [],
    testOutput: "",
    testExitCode: -1,
    failures: [],
    fixesApplied: [],
    retryCount: 0,
    finalPassed: false,
  };
}

function runWorkflow(): void {
  const configPath = process.argv[2] ?? "workflow.yaml";
  const config = loadConfig(configPath);

  console.log(`\nStarting workflow: ${config.name}`);
  console.log(`Target: ${config.targetDir} | Max retries: ${config.maxRetry}\n`);

  initLog();

  let state = createInitialState();

  for (let attempt = 0; attempt <= config.maxRetry; attempt++) {
    state = { ...state, retryCount: attempt };

    logStep("workflow", `--- Attempt ${attempt + 1} of ${config.maxRetry + 1} ---`, [], [], attempt);

    // Step 1: Scan
    state = scanChanges(config.targetDir, state);

    // Step 2: Generate tests
    state = generateTests(config.targetDir, state);

    // Step 3: Run tests
    state = runTests(config.targetDir, state);

    // Step 4: Parse failures
    state = parseFailures(config.targetDir, state);

    if (state.testExitCode === 0 || state.failures.length === 0) {
      state = { ...state, finalPassed: true };
      break;
    }

    if (attempt < config.maxRetry) {
      // Step 5: Apply fixes
      state = applyFixes(state);
    }
  }

  // Step 6: Report
  const report = generateReport(state);
  console.log("\n" + report);

  process.exit(state.finalPassed ? 0 : 1);
}

runWorkflow();
