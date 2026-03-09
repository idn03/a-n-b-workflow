# Command: `workflow code`

## Purpose
Generate source code, tests, and project configuration from derived specs.

## Input
- `.derived/architecture.md`
- `.derived/implementation.md`
- `.derived/tests.md`

## Output
- `src/` — TypeScript source files matching the architecture
- `tests/` — Jest test files matching the test spec
- `package.json` — Project config with dependencies and scripts

## Behavior
1. Read all derived specs
2. Generate source files according to implementation spec
3. Generate test files according to test spec
4. Generate `package.json` with required dependencies
5. Run `npm install`
6. Run tests to verify generation

## Profile Overrides
- **default** — Full behavior as described above
- **quick** — Skip step 6 (test verification)
- **ci** — Fail immediately if any generated file has lint errors; no auto-fix

## Errors
- Fail if `.derived/` does not exist (run `workflow init` first)
- Warn if generated tests fail (suggest `workflow debug`)
