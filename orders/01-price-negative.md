# Order 01: negative prices and thousands separators in `formatPrice`

File to change: `src/price.js` (and `test/price.test.js`). Touch nothing else.

## Problem

`formatPrice(-150)` returns `$-2.-50` (floor division and a negative remainder) and large amounts have no grouping (`formatPrice(123456789)` is `$1234567.89`).

## Wanted

- Negative amounts put the sign before the symbol: `formatPrice(-150)` is `-$1.50`.
- The whole part is grouped in thousands with commas: `formatPrice(123456789)` is `$1,234,567.89`.
- Existing behaviour (symbols, errors) stays the same.

## Acceptance checks

- [ ] `formatPrice(-150) === "-$1.50"`
- [ ] `formatPrice(-5) === "-$0.05"`
- [ ] `formatPrice(123456789) === "$1,234,567.89"`
- [ ] `formatPrice(100, "EUR") === "€1.00"` still holds
- [ ] New tests for each case above in `test/price.test.js`
- [ ] `npm test` passes on Node 22
- [ ] `git diff --stat main` lists only `src/price.js` and `test/price.test.js`
