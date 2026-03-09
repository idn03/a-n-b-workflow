export interface WorkflowConfig {
  name: string;
  maxRetry: number;
  targetDir: string;
  steps: StepConfig[];
}

export interface StepConfig {
  name: string;
  description: string;
}

export interface StepResult {
  stepName: string;
  success: boolean;
  output: string;
  errors: string[];
  appliedFixes: string[];
  duration: number;
}

export interface WorkflowState {
  changedFiles: string[];
  testFiles: string[];
  generatedTests: string[];
  testOutput: string;
  testExitCode: number;
  failures: TestFailure[];
  fixesApplied: string[];
  retryCount: number;
  finalPassed: boolean;
}

export interface TestFailure {
  testFile: string;
  testName: string;
  error: string;
  sourceFile: string | null;
}

export interface LogEntry {
  timestamp: string;
  stepName: string;
  commandOutput: string;
  errors: string[];
  appliedFixes: string[];
  retryCount: number;
}
