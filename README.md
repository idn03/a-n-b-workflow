# DevCheck CLI

A simple CLI tool that helps developers validate project files and configurations — JSON/YAML syntax, `.env` format, `package.json` fields, and more.

This repo is developed using a **spec-driven workflow**. Specs come first, code is generated from them.

## Tech Stack
- TypeScript
- Node.js
- Jest (testing)
- npm (package manager)

## Project Structure
```
├── spec.md                       # DevCheck CLI specification
├── .workflow/
│   ├── spec.md                   # Workflow engine specification
│   └── commands/                 # Command specs (init, code, feature, debug)
├── src/                          # Generated (after workflow code)
├── tests/                        # Generated (after workflow code)
└── package.json                  # Generated (after workflow code)
```

## Workflow

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

## Commands

| Command            | Description                                              |
|--------------------|----------------------------------------------------------|
| `workflow init`    | Bootstrap derived specs from the project spec            |
| `workflow code`    | Generate source code, tests, and config from derived specs |
| `workflow feature` | Add features via pipeline: spec → derive → code → test  |
| `workflow debug`   | Analyze errors, apply fixes, and re-run tests            |

See `.workflow/commands/` for detailed command specifications.
