# Workflow Profiles

## Overview
Profiles customize workflow behavior for different contexts. Each profile defines overrides for command settings — retries, strictness, verbosity, and which steps to skip.

Usage: `workflow <command> --profile <name>`

When no `--profile` flag is provided, the `default` profile is used.

## Built-in Profiles

### `default`
Full pipeline with all steps enabled. Suitable for local development.

| Setting       | Value   |
|---------------|---------|
| maxRetry      | 3       |
| autoFix       | true    |
| runTests      | true    |
| strictLint    | false   |
| verbosity     | normal  |
| failFast      | false   |

### `quick`
Fast iteration — skip verification steps, minimal retries. Use when you want to regenerate code without waiting for test runs.

| Setting       | Value   |
|---------------|---------|
| maxRetry      | 1       |
| autoFix       | true    |
| runTests      | false   |
| strictLint    | false   |
| verbosity     | quiet   |
| failFast      | false   |

### `ci`
Strict mode for CI/CD pipelines — no auto-fix, fail fast, verbose output for logs.

| Setting       | Value   |
|---------------|---------|
| maxRetry      | 0       |
| autoFix       | false   |
| runTests      | true    |
| strictLint    | true    |
| verbosity     | verbose |
| failFast      | true    |

## Profile Settings Reference

| Setting       | Type    | Description                                           |
|---------------|---------|-------------------------------------------------------|
| `maxRetry`    | number  | Max debug retry attempts (0 = no retries)             |
| `autoFix`     | boolean | Allow `debug` to auto-apply fixes                     |
| `runTests`    | boolean | Run tests after `code` generation                     |
| `strictLint`  | boolean | Fail on any lint warning (not just errors)            |
| `verbosity`   | enum    | Output level: `quiet`, `normal`, `verbose`            |
| `failFast`    | boolean | Stop on first failure instead of collecting all errors |

## Custom Profiles
Users can define custom profiles by creating a `.workflow/profiles/` directory with one file per profile:

```
.workflow/
├── profiles.md                   # This spec (built-in profiles)
└── profiles/
    └── <name>.md                 # Custom profile definition
```

A custom profile file follows the same format — a table of settings with values. Any setting not specified inherits from `default`.

### Example: `staging` profile
```
.workflow/profiles/staging.md
```
```markdown
# Profile: staging

| Setting       | Value   |
|---------------|---------|
| maxRetry      | 1       |
| autoFix       | true    |
| runTests      | true    |
| strictLint    | true    |
| verbosity     | verbose |
| failFast      | false   |
```
