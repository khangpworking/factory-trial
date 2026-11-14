# Goal
Add `capitalize(text)` so callers can upper-case the first letter of a word.

## Files it may change
- `src/capitalize.js` (new)
- `test/capitalize.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `capitalize('hello')` returns `'Hello'`.
- `capitalize('')` returns `''`.
- `capitalize('éclair')` returns `'Éclair'`.
- A `text` that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
