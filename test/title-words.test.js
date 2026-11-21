import { test } from "node:test";
import assert from "node:assert/strict";
import { titleWords } from "../src/title-words.js";

test("returns the words of a string as an array", () => {
  assert.deepEqual(titleWords("a b"), ["a", "b"]);
});

test("returns an empty array for an empty string", () => {
  assert.deepEqual(titleWords(""), []);
});

test("handles a single word", () => {
  assert.deepEqual(titleWords("Hello"), ["Hello"]);
});

test("splits on runs of whitespace", () => {
  assert.deepEqual(titleWords("  Hello \t Big\nWorld  "), ["Hello", "Big", "World"]);
});

test("keeps each word as written", () => {
  assert.deepEqual(titleWords("don't Stop"), ["don't", "Stop"]);
});

test("rejects values that are not strings", () => {
  assert.throws(() => titleWords(7), TypeError);
  assert.throws(() => titleWords(null), TypeError);
  assert.throws(() => titleWords(undefined), TypeError);
  assert.throws(() => titleWords(["a", "b"]), TypeError);
});
