# Order 05: add a text truncation helper

## Goal

Add `truncate(text, maxLength)` in a new file `src/truncate.js`, with tests in `test/truncate.test.js`.

## Files this order may change

- `src/truncate.js` (new)
- `test/truncate.test.js` (new)

Nothing else.

## Acceptance checks

`npm test` passes, and these hold:

1. `truncate('hello world', 20)` returns `'hello world'`.
2. `truncate('hello world', 8)` returns `'hello w…'`: the result is exactly 8 characters and ends with the single character `…`.
3. `truncate('hello', 5)` returns `'hello'`.
4. `truncate('', 3)` returns `''`.
5. A `maxLength` that is not an integer of 1 or more throws a `RangeError`.
6. A `text` that is not a string throws a `TypeError`.

## Do not

- Do not add dependencies.
- Do not change any other module or its tests.
