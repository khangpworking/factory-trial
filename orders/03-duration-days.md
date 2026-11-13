# Order 03: days and spaces in `parseDuration`

Issue: #3

File to change: `src/duration.js` (and `test/duration.test.js`). Touch nothing else.

## Problem

`parseDuration` only knows `h`, `m`, `s` and rejects spaces, so `"1d"` and `"1h 30m"` fail.

## Wanted

- New unit `d` (86400 seconds).
- Parts may be separated by single or multiple spaces: `"1h 30m"` is valid.
- Each unit may appear at most once and units must go from largest to smallest (`d`, `h`, `m`, `s`); anything else throws `SyntaxError`.

## Acceptance checks

- [ ] `parseDuration("1d") === 86400`
- [ ] `parseDuration("1d 2h") === 93600`
- [ ] `parseDuration("1h   30m") === 5400`
- [ ] `parseDuration("30m1h")` throws `SyntaxError`
- [ ] `parseDuration("1h1h")` throws `SyntaxError`
- [ ] Existing tests still pass unchanged
- [ ] `npm test` passes on Node 22
- [ ] `git diff --stat main` lists only `src/duration.js` and `test/duration.test.js`
