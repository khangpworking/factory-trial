import { test } from "node:test";
import assert from "node:assert/strict";
import { isBlank } from "../src/is-blank.js";

test("returns true for an empty string", () => {
  assert.equal(isBlank(""), true);
});

test("returns true for whitespace only", () => {
  assert.equal(isBlank("   \t\n"), true);
});

test("returns false when text has visible characters", () => {
  assert.equal(isBlank(" a "), false);
});

test("returns false for a single visible character", () => {
  assert.equal(isBlank("a"), false);
});

test("rejects non-string text", () => {
  assert.throws(() => isBlank(7), TypeError);
  assert.throws(() => isBlank(null), TypeError);
  assert.throws(() => isBlank(undefined), TypeError);
});
