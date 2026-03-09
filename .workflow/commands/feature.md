# Command: `workflow feature`

## Purpose
Add a new feature through the full spec-to-code pipeline.

## Input
- A new feature spec file in `features/`

## Pipeline
```
features/<name>.md
       ↓ validate & merge
.derived/ (updated)
       ↓ generate code
src/ + tests/ (updated)
```

## Behavior
1. Read the new feature spec from `features/`
2. Validate it against `spec.md` for compatibility
3. Update derived specs to include the new feature
4. Regenerate affected source and test files
5. Run tests to verify the feature works

## Errors
- Fail if feature spec is missing required sections
- Fail if feature conflicts with existing architecture
- Warn if new tests fail (suggest `workflow debug`)
