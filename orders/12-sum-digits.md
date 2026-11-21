# Goal
Add `sumDigits(n)` that returns the sum of the decimal digits of an integer. Live test of the session handoff.

## Files it may change
- `src/sum-digits.js` (new)
- `test/sum-digits.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `sumDigits(123)` returns `6` and `sumDigits(0)` returns `0`.
- `sumDigits(-123)` returns `6`: the digits of the absolute value.
- A value that is not an integer throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
