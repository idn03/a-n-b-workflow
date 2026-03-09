# DevCheck CLI — Core Specification

## Overview
DevCheck is a simple CLI tool that helps developers validate common project files and configurations. It catches misconfigurations early before they cause issues in builds, deploys, or CI pipelines.

## Tech Stack
- TypeScript
- Node.js
- Jest (testing)
- npm (package manager)

## Commands

### `devcheck run [path]`
Run all validators against the given project directory (defaults to `.`).

### `devcheck check <validator> [path]`
Run a specific validator. Available validators:
- `json` — Validate JSON file syntax (`*.json`)
- `yaml` — Validate YAML file syntax (`*.yml`, `*.yaml`)
- `env` — Validate `.env` file format (KEY=VALUE pairs, no syntax errors)
- `package` — Validate `package.json` required fields (`name`, `version`)
- `tsconfig` — Validate `tsconfig.json` structure and common mistakes

### `devcheck list`
List all available validators.

## Output
- Each validator prints pass/fail per file with clear error messages.
- Exit code `0` if all checks pass, `1` if any check fails.
- Supports `--json` flag for machine-readable output.
- Supports `--quiet` flag to only show failures.

## Project Structure (after code generation)
```
src/
├── cli.ts              # CLI entry point (argument parsing)
├── runner.ts           # Orchestrates validator execution
├── validators/
│   ├── index.ts        # Validator registry
│   ├── json.ts         # JSON syntax validator
│   ├── yaml.ts         # YAML syntax validator
│   ├── env.ts          # .env format validator
│   ├── package.ts      # package.json field validator
│   └── tsconfig.ts     # tsconfig.json validator
└── types.ts            # Shared types

tests/
├── validators/
│   ├── json.test.ts
│   ├── yaml.test.ts
│   ├── env.test.ts
│   ├── package.test.ts
│   └── tsconfig.test.ts
└── runner.test.ts
```

## Validator Interface
Each validator implements a common interface:
- **name**: Identifier string
- **description**: Human-readable description
- **filePatterns**: Glob patterns for files this validator checks
- **validate(filePath: string)**: Returns a result with `pass: boolean`, `filePath`, and optional `errors: string[]`
