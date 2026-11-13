import { test } from "node:test";
import assert from "node:assert/strict";
import { truncate } from "../src/truncate.js";

test("keeps text shorter than maxLength", () => {
  assert.equal(truncate("hello world", 20), "hello world");
});

test("cuts text and ends it with a single ellipsis character", () => {
  const result = truncate("hello world", 8);
  assert.equal(result, "hello w…");
  assert.equal([...result].length, 8);
  assert.ok(result.endsWith("…"));
});

test("keeps text exactly as long as maxLength", () => {
  assert.equal(truncate("hello", 5), "hello");
});

test("keeps an empty string empty", () => {
  assert.equal(truncate("", 3), "");
});

test("cuts longer text down to an ellipsis alone when maxLength is 1", () => {
  assert.equal(truncate("hello", 1), "…");
});

test("rejects non-strings", () => {
  assert.throws(() => truncate(42, 5), TypeError);
  assert.throws(() => truncate(null, 5), TypeError);
});

test("rejects a maxLength of zero", () => {
  assert.throws(() => truncate("hello", 0), RangeError);
});

test("rejects a negative, fractional or non-numeric maxLength", () => {
  assert.throws(() => truncate("hello", -1), RangeError);
  assert.throws(() => truncate("hello", 2.5), RangeError);
  assert.throws(() => truncate("hello", "5"), RangeError);
});
