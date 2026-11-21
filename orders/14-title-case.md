# Goal
Add `titleCase(text)` that upper-cases the first letter of every word. Live test of the builder memory gate.

## Files it may change
- `src/title-case.js` (new)
- `test/title-case.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `titleCase('hello big world')` returns `'Hello Big World'` and `titleCase('')` returns `''`.
- Words are separated by single spaces; other letters keep their case.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
