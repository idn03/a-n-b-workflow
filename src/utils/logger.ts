import { writeFileSync, appendFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import type { LogEntry } from "../types.js";

const LOG_FILE = "logs/workflow.log";

export function initLog(): void {
  const dir = dirname(LOG_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(LOG_FILE, "");
}

export function log(entry: LogEntry): void {
  const line = JSON.stringify(entry) + "\n";
  appendFileSync(LOG_FILE, line);
  const prefix = `[${entry.timestamp}] [${entry.stepName}]`;
  if (entry.errors.length > 0) {
    console.error(`${prefix} ERRORS: ${entry.errors.join("; ")}`);
  } else {
    const preview = entry.commandOutput.slice(0, 120).replace(/\n/g, " ");
    console.log(`${prefix} ${preview}`);
  }
}

export function logStep(
  stepName: string,
  output: string,
  errors: string[],
  fixes: string[],
  retryCount: number
): void {
  log({
    timestamp: new Date().toISOString(),
    stepName,
    commandOutput: output,
    errors,
    appliedFixes: fixes,
    retryCount,
  });
}
