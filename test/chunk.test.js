import { test } from "node:test";
import assert from "node:assert/strict";
import { chunk } from "../src/chunk.js";

test("splits items into groups of the given size", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test("returns an empty array for empty items", () => {
  assert.deepEqual(chunk([], 3), []);
});

test("keeps a single group when size covers all items", () => {
  assert.deepEqual(chunk([1, 2, 3], 3), [[1, 2, 3]]);
  assert.deepEqual(chunk([1, 2, 3], 10), [[1, 2, 3]]);
});

test("does not modify the original array", () => {
  const items = [1, 2, 3];
  chunk(items, 2);
  assert.deepEqual(items, [1, 2, 3]);
});

test("rejects a size that is not a positive integer", () => {
  assert.throws(() => chunk([1, 2, 3], 0), RangeError);
  assert.throws(() => chunk([1, 2, 3], -1), RangeError);
  assert.throws(() => chunk([1, 2, 3], 1.5), RangeError);
  assert.throws(() => chunk([1, 2, 3], "2"), RangeError);
  assert.throws(() => chunk([1, 2, 3], Infinity), RangeError);
  assert.throws(() => chunk([1, 2, 3], NaN), RangeError);
});

test("rejects items that are not an array", () => {
  assert.throws(() => chunk("abc", 2), TypeError);
  assert.throws(() => chunk(null, 2), TypeError);
  assert.throws(() => chunk(undefined, 2), TypeError);
  assert.throws(() => chunk({ length: 0 }, 2), TypeError);
});
