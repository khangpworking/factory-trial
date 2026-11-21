# Goal
Add `countVowels(text)` that returns how many of the letters a, e, i, o, u a string has. Live test of the worker failover.

## Files it may change
- `src/count-vowels.js` (new)
- `test/count-vowels.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `countVowels('banana')` returns `3` and `countVowels('')` returns `0`.
- Upper case counts too: `countVowels('AEIOU')` returns `5`.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
