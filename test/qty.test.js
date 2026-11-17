import { test } from "node:test";
import assert from "node:assert/strict";
import { parseQty } from "../src/qty.js";

test("reads pieces", () => {
  assert.deepEqual(parseQty("Eggs 3 pcs"), { count: 3 });
});

test("reads count and size", () => {
  assert.deepEqual(parseQty("Juice 2 x 500ml"), { count: 2, size: 500, unit: "ml" });
});

test("reads a box with a count", () => {
  assert.deepEqual(parseQty("Box of 12 cookies"), { count: 12 });
});

test("reads a single size", () => {
  assert.deepEqual(parseQty("Milk 180ml"), { size: 180, unit: "ml" });
});

test("label without a quantity is null", () => {
  assert.equal(parseQty("Apple"), null);
  assert.equal(parseQty("Fresh basil"), null);
});

test("rejects non-strings", () => {
  assert.throws(() => parseQty(42), TypeError);
});
