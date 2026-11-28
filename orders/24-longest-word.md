# Goal
Add `longestWord(text)` for the request "Thử cổng kiểm trước review" (live test of the project check before review, #45).

## Files it may change
- `src/longest-word.js` (new)
- `test/longest-word.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `longestWord('a bbb cc')` gives `'bbb'`; on a tie the first longest word wins (`longestWord('ab cd')` gives `'ab'`); `longestWord('   ')` gives `''`; words are split on any whitespace.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
