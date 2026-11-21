import { test } from "node:test";
import assert from "node:assert/strict";
import { wordInitials } from "../src/word-initials.js";

test("returns the first letter of each word", () => {
  assert.equal(wordInitials("Hello Big World"), "HBW");
});

test("returns an empty string for an empty string", () => {
  assert.equal(wordInitials(""), "");
});

test("handles a single word", () => {
  assert.equal(wordInitials("Hello"), "H");
});

test("ignores runs of whitespace and surrounding spaces", () => {
  assert.equal(wordInitials("  Hello \t Big\nWorld  "), "HBW");
});

test("keeps the initials as written", () => {
  assert.equal(wordInitials("don't Stop"), "dS");
});

test("rejects values that are not strings", () => {
  assert.throws(() => wordInitials(7), TypeError);
  assert.throws(() => wordInitials(null), TypeError);
  assert.throws(() => wordInitials(undefined), TypeError);
  assert.throws(() => wordInitials(["a", "b"]), TypeError);
});
