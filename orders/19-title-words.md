# Goal
Add `titleWords(text)` for the request "Xử lý từ" (live test of request summaries with --parts).

## Files it may change
- `src/title-words.js` (new)
- `test/title-words.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `titleWords` returns the words of a string as an array (`'a b'` gives `['a','b']`); `wordInitials` returns the first letter of each word (`'Hello Big World'` gives `'HBW'`). Each module does only its own function.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
