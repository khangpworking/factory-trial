# Goal
Add `shortestWord(text)` for the request "Thử cổng sổ rủi ro" (live test of the risk register gate, #46).

## Files it may change
- `src/shortest-word.js` (new)
- `test/shortest-word.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `shortestWord('aaa b cc')` gives `'b'`; on a tie the first shortest word wins (`shortestWord('ab cd')` gives `'ab'`); `shortestWord('   ')` gives `''`; words are split on any whitespace.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
