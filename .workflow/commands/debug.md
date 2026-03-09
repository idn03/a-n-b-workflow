# Command: `workflow debug`

## Purpose
Analyze test failures, apply fixes, and re-run tests until they pass.

## Input
- Test output from a failed `npm test` run

## Behavior
1. Run tests and capture output
2. Parse failures to identify failing tests and error messages
3. Analyze errors to determine root cause (source bug vs test bug)
4. Apply targeted fixes to the affected files
5. Re-run tests
6. Repeat up to `maxRetry` times (default: 3)
7. Report final results

## Profile Overrides
- **default** — Full behavior with retries (maxRetry: 3)
- **quick** — Single attempt, no retries (maxRetry: 1)
- **ci** — No auto-fix; report failures and exit with code 1

## Output
- Fixed source or test files
- A summary report of what was fixed

## Errors
- Fail if no tests exist (run `workflow code` first)
- Warn if max retries exceeded with remaining failures
