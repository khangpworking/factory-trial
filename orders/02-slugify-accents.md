# Order 02: accented letters and a length limit in `slugify`

File to change: `src/slugify.js` (and `test/slugify.test.js`). Touch nothing else.

## Problem

`slugify("Crème Brûlée")` returns `cr-me-br-l-e`: accented letters are dropped instead of kept as plain letters.

## Wanted

- Accented Latin letters become their base letter (use `String.prototype.normalize("NFKD")` and drop combining marks; no dependencies).
- Optional second argument `maxLength` (positive integer). The slug is cut to at most `maxLength` characters and never ends with `-`.
- A `maxLength` that is not a positive integer throws `RangeError`.

## Acceptance checks

- [ ] `slugify("Crème Brûlée") === "creme-brulee"`
- [ ] `slugify("Tiếng Việt") === "tieng-viet"`
- [ ] `slugify("hello big world", 9) === "hello-big"`
- [ ] `slugify("hello big world", 6) === "hello"` (no trailing dash)
- [ ] `slugify("x", 0)` throws `RangeError`
- [ ] Existing tests still pass unchanged
- [ ] `npm test` passes on Node 22
- [ ] `git diff --stat main` lists only `src/slugify.js` and `test/slugify.test.js`
