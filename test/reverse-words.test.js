import { test } from "node:test";
import assert from "node:assert/strict";
import { reverseWords } from "../src/reverse-words.js";

test("reverses the order of the words", () => {
  assert.equal(reverseWords("one two three"), "three two one");
});

test("returns an empty string unchanged", () => {
  assert.equal(reverseWords(""), "");
});

test("handles a single word", () => {
  assert.equal(reverseWords("hello"), "hello");
});

test("keeps words separated by single spaces", () => {
  assert.equal(reverseWords("a b c d"), "d c b a");
});

test("rejects values that are not strings", () => {
  assert.throws(() => reverseWords(7), TypeError);
  assert.throws(() => reverseWords(null), TypeError);
  assert.throws(() => reverseWords(undefined), TypeError);
  assert.throws(() => reverseWords(["a", "b"]), TypeError);
});
