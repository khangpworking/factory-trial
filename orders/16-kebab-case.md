# Goal
Add `kebabCase(text)` that turns "Hello Big World" into "hello-big-world". Live test of the scope report.

## Files it may change
- `src/kebab-case.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `kebabCase('Hello Big World')` returns `'hello-big-world'` and `kebabCase('')` returns `''`.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module.
