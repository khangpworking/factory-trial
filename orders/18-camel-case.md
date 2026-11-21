# Goal
Add `camelCase(text)` that turns "Hello Big World" into "helloBigWorld". Part of the request "Đổi kiểu chữ" (live test of request summaries).

## Files it may change
- `src/camel-case.js` (new)
- `test/camel-case.test.js` (new)

## Acceptance checks
- `npm test` exits 0.
- `camelCase('Hello Big World')` returns `'helloBigWorld'` and `camelCase('')` returns `''`.
- A value that is not a string throws a `TypeError`.

## What not to do
- Do not add dependencies.
- Do not change any other module or its tests.
