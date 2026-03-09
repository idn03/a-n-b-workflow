# Workflow CLI — Core Specification

## Overview
A spec-driven development tool that transforms specifications into working code through a structured pipeline. The workflow reads markdown specs and generates source code, tests, and configuration.

## Tech Stack
- TypeScript
- Node.js
- Jest (testing)
- npm (package manager)

## Commands
- `workflow init` — Bootstrap derived specs from the project spec
- `workflow code` — Generate source code, tests, and config from derived specs
- `workflow feature` — Add features via pipeline: spec → derive → code → test
- `workflow debug` — Analyze errors, apply fixes, and re-run tests

All commands support `--profile <name>` to customize behavior. See `profiles.md` for details.

## Profiles
Profiles adjust workflow behavior for different contexts:
- **default** — Full pipeline, retries enabled, auto-fix on
- **quick** — Fast iteration, skip test verification, minimal output
- **ci** — Strict mode, no auto-fix, fail fast, verbose logging

Custom profiles can be added in `.workflow/profiles/`.

## Pipeline
```
spec.md
   ↓ init
.derived/ (architecture, implementation, tests)
   ↓ code
src/ + tests/ + package.json
   ↓ feature (iterative)
features/*.md → .derived/ → src/ + tests/
   ↓ debug (iterative)
error analysis → src/ fix → tests pass
```

## Derived Specs
The `init` command reads `spec.md` and generates:
- `.derived/architecture.md` — Module boundaries, dependency graph
- `.derived/implementation.md` — Per-file implementation details
- `.derived/tests.md` — Test cases and coverage requirements

## Code Generation
The `code` command reads derived specs and generates:
- `src/` — TypeScript source files
- `tests/` — Jest test files
- `package.json` — Dependencies and scripts
