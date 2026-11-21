# Goal
Add `snakeCase(text)` that turns "Hello Big World" into "hello_big_world". Part of the request "Đổi kiểu chữ" (live test of request summaries).

## Files it may change
- `src/snake-case.js` (new)
- `test/snake-case.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `snakeCase('Hello Big World')` returns `'hello_big_world'` and `snakeCase('')` returns `''`.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
