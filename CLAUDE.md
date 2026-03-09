# CLAUDE.md

## Project Overview
This is a spec-driven development project with two parts:
1. **Workflow CLI** — transforms markdown specs into working code through a structured pipeline
2. **DevCheck CLI** — the target project, a CLI tool for validating project files and configs

The repo is currently **spec-only**. No source code exists yet — all code is generated via the workflow pipeline.

## Repository Layout
```
spec.md                  # DevCheck CLI project specification
.workflow/
├── spec.md              # Workflow engine specification
├── profiles.md          # Profile definitions (default, quick, ci)
├── commands/            # Command specs: init, code, feature, debug
└── profiles/            # Custom profile definitions
```

Generated artifacts (gitignored): `src/`, `tests/`, `.derived/`, `package.json`, `tsconfig.json`

## Tech Stack
- TypeScript, Node.js, Jest, npm

## Workflow Pipeline
```
spec.md → init → .derived/ → code → src/ + tests/ + package.json
```
- `workflow init` — spec.md → .derived/ (architecture, implementation, tests)
- `workflow code` — .derived/ → src/ + tests/ + package.json
- `workflow feature` — features/*.md → .derived/ → src/ + tests/
- `workflow debug` — error analysis → fix → retest (with retries)

All commands support `--profile <name>` (default, quick, ci).

## Key Conventions
- **Specs are the source of truth.** Always read and update specs before generating or modifying code.
- **Spec files are markdown.** Follow the existing structure: Overview, Tech Stack, Commands, etc.
- **Generated code goes in gitignored dirs.** Never commit `src/`, `tests/`, `.derived/`, or `package.json`.
- **Profiles control behavior.** Use `default` for local dev, `quick` for fast iteration, `ci` for strict pipelines.
- **Validators follow a common interface.** See the Validator Interface section in `spec.md`.

## Working With This Repo
- To understand the target project, read `spec.md`
- To understand the workflow engine, read `.workflow/spec.md`
- To understand a specific command, read `.workflow/commands/<name>.md`
- To understand profiles, read `.workflow/profiles.md`
- When adding features, create a spec in `features/` first — never write code directly
- When modifying workflow behavior, update the relevant spec in `.workflow/` first
