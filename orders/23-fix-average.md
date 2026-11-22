# Goal
Fix this bug: the owner asks for the average of 2, 4 and 6 and gets 2; the average should be 4.

## Files it may change
- `src/average.js`
- `test/average.test.js`

## Acceptance checks
- First write or extend a test that shows the bug: with the code before your fix it fails, after your fix it passes. The factory checks this itself: it runs your branch's test files on the code of `main` and sends the order back if they pass there.
- After the fix, `npm test` exits 0.
- `average([2, 4, 6])` returns `4`, and `average([1, 2])` returns `1.5`
- The test also covers the cases next to the bug: a one-number list, negative numbers, and the existing TypeError and RangeError cases.

## What not to do
- Do not change behaviour the bug report does not name.
- Do not delete, skip or weaken an existing test to make the check pass.
- Do not add dependencies.

Template: bug-fix
