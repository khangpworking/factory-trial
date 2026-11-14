# Goal
Add `padLeft(text, width, fill)` so callers can right-align short strings in fixed-width output.

## Files it may change
- `src/pad-left.js` (new)
- `test/pad-left.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `padLeft('7', 3, '0')` returns `'007'`.
- `padLeft('hello', 3, '0')` returns `'hello'`.
- `padLeft('7', 3)` returns `'  7'`: the fill defaults to one space.
- A `fill` that is not exactly one character throws a `RangeError`.
- A `text` that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
