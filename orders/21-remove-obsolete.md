# Goal
Remove the unused helper `obsolete()`: delete `src/obsolete.js` and its test. Live test of builder deletions and the run note.

## Files it may change
- `src/obsolete.js` (delete)
- `test/obsolete.test.js` (delete)

## Acceptance checks
- `npm test` exits 0.
- `src/obsolete.js` and `test/obsolete.test.js` no longer exist on the branch.
- No other file changes.

## What not to do
- Do not change any other module or its tests.
