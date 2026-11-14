import { test } from "node:test";
import assert from "node:assert/strict";
import { padLeft } from "../src/pad-left.js";

test("pads short text on the left with the given fill", () => {
  assert.equal(padLeft("7", 3, "0"), "007");
});

test("leaves text at or over the width unchanged", () => {
  assert.equal(padLeft("hello", 3, "0"), "hello");
  assert.equal(padLeft("hello", 5, "0"), "hello");
});

test("defaults the fill to a single space", () => {
  assert.equal(padLeft("7", 3), "  7");
});

test("pads an empty string up to the full width", () => {
  assert.equal(padLeft("", 3, "0"), "000");
});

test("rejects non-string text", () => {
  assert.throws(() => padLeft(7, 3, "0"), TypeError);
  assert.throws(() => padLeft(null, 3, "0"), TypeError);
});

test("rejects a fill that is not exactly one character", () => {
  assert.throws(() => padLeft("7", 3, ""), RangeError);
  assert.throws(() => padLeft("7", 3, "00"), RangeError);
  assert.throws(() => padLeft("7", 3, 0), RangeError);
});
