import { test } from "node:test";
import assert from "node:assert/strict";
import { clamp } from "../src/clamp.js";

test("returns a value already inside the range", () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test("raises a value below the range up to min", () => {
  assert.equal(clamp(-1, 0, 10), 0);
});

test("lowers a value above the range down to max", () => {
  assert.equal(clamp(11, 0, 10), 10);
});

test("keeps the range bounds themselves", () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test("rejects a min greater than max", () => {
  assert.throws(() => clamp(1, 5, 2), RangeError);
});

test("rejects non-number arguments", () => {
  assert.throws(() => clamp("1", 0, 10), RangeError);
  assert.throws(() => clamp(1, "0", 10), RangeError);
  assert.throws(() => clamp(1, 0, null), RangeError);
});
