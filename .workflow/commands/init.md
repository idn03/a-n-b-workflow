# Command: `workflow init`

## Purpose
Bootstrap derived specs from the project specification. Analyzes `spec.md` and generates detailed architecture, implementation, and test specifications.

## Input
- `spec.md` — The project's core specification

## Output
Creates the `.derived/` directory with:
- `architecture.md` — Module boundaries, dependency graph, file structure
- `implementation.md` — Per-file implementation plan with function signatures
- `tests.md` — Test cases, expected behaviors, edge cases

## Behavior
1. Read and parse `spec.md`
2. Extract project structure, tech stack, and requirements
3. Generate architecture spec (modules, dependencies, interfaces)
4. Generate implementation spec (file-by-file details)
5. Generate test spec (test cases per module)
6. Write all files to `.derived/`

## Errors
- Fail if `spec.md` does not exist
- Fail if spec is missing required sections (Overview, Tech Stack, Commands)
