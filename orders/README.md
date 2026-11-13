# Order briefs

Use one new `orders/<short-name>.md` per order. Keep it under version control.
Run `factory-order <project folder or id> orders/<short-name>.md --dry-run` first.
Remove `--dry-run` to submit it to the running hub.

```markdown
# Goal
Describe one result.

## Files it may change
- List the allowed files or folders.

## Acceptance checks
- Give commands and expected exit codes or output.
- Each check must let a command decide whether the result passes.

## What not to do
- List the boundaries, such as no new dependencies or no deployment.

Issue: #N
```

The `Issue: #N` line is optional. It closes that GitHub issue after landing.
The builder commits its branch. The factory reviews, checks, merges, and pushes it.
Hooks need owner approval before an unattended order can run.
