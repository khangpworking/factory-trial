# Order 05: clamp a number

Files to create: `src/clamp.js` and `test/clamp.test.js`. Touch nothing else.

## Wanted

- `clamp(value, min, max)` returns `value` limited to the range `min` to `max` (both included).
- A non-number argument, or `min` greater than `max`, throws `RangeError`.

## Acceptance checks

- [ ] `clamp(5, 0, 10) === 5`, `clamp(-1, 0, 10) === 0`, `clamp(11, 0, 10) === 10`
- [ ] `clamp(1, 5, 2)` throws `RangeError`
- [ ] `clamp("1", 0, 10)` throws `RangeError`
- [ ] Tests for each case in `test/clamp.test.js`
- [ ] `npm test` passes on Node 22
