import { test } from "node:test";
import assert from "node:assert/strict";
import { countWords } from "../src/words.js";

test("counts an empty string as zero words", () => {
  assert.equal(countWords(""), 0);
});

test("counts whitespace-only text as zero words", () => {
  assert.equal(countWords("   \t\n "), 0);
});

test("counts words separated by punctuation", () => {
  assert.equal(countWords("Hello, world!"), 2);
});

test("counts words with Unicode letters", () => {
  assert.equal(countWords("Crème brûlée"), 2);
});

test("keeps an apostrophe inside a word as one word", () => {
  assert.equal(countWords("don't stop"), 2);
});

test("keeps a curly apostrophe inside a word as one word", () => {
  assert.equal(countWords("don’t stop"), 2);
});

test("counts digits as words", () => {
  assert.equal(countWords("order 42 shipped"), 3);
});

test("counts words in text longer than 1000 characters", () => {
  const text = "word ".repeat(300).trim();
  assert.ok(text.length > 1000);
  assert.equal(countWords(text), 300);
});

test("does not count non-digit numerics as words", () => {
  assert.equal(countWords("½"), 0);
  assert.equal(countWords("½ cup"), 1);
});

test("rejects non-strings", () => {
  assert.throws(() => countWords(42), TypeError);
});
