# Goal
Add `chunk(items, size)` so callers can split an array into fixed-size groups.

## Files it may change
- `src/chunk.js` (new)
- `test/chunk.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `chunk([1, 2, 3, 4, 5], 2)` returns `[[1, 2], [3, 4], [5]]`.
- `chunk([], 3)` returns `[]`.
- A `size` that is not a positive integer throws a `RangeError`.
- An `items` that is not an array throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
