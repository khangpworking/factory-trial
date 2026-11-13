# Order 04: word counter

Files to create: `src/words.js` and `test/words.test.js`. Touch nothing else.

## Wanted

- `countWords(text)` returns the number of words in a string. Words are runs of letters or digits
  (Unicode letters count, so `"Crème brûlée"` is 2 words). Apostrophes inside a word keep it one word (`"don't"` is 1).
- Empty or whitespace-only text is 0.
- A non-string argument throws `TypeError`.

## Acceptance checks

- [ ] `countWords("") === 0` and `countWords("   ") === 0`
- [ ] `countWords("Hello, world!") === 2`
- [ ] `countWords("Crème brûlée") === 2`
- [ ] `countWords("don't stop") === 2`
- [ ] `countWords(42)` throws `TypeError`
- [ ] Tests for each case in `test/words.test.js`
- [ ] `npm test` passes on Node 22
