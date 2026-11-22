# Goal
Add `wordCount(text)` for the request "Thử giá quy đổi" (live test of the list-price cost line).

## Files it may change
- `src/word-count.js` (new)
- `test/word-count.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `wordCount('Hello big  world')` gives `3`; `wordCount('   ')` gives `0`; words are split on any whitespace.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
