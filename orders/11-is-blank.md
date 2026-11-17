# Goal
Add `isBlank(text)` so callers can tell whether a string has no visible characters.

## Files it may change
- `src/is-blank.js` (new)
- `test/is-blank.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `isBlank('')` returns `true`.
- `isBlank('   \t\n')` returns `true`.
- `isBlank(' a ')` returns `false`.
- A `text` that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
