import { test } from "node:test";
import assert from "node:assert/strict";
import { wordCount } from "../src/word-count.js";

test("counts words separated by a single space", () => {
  assert.equal(wordCount("Hello big world"), 3);
});

test("counts words separated by runs of whitespace", () => {
  assert.equal(wordCount("Hello big  world"), 3);
});

test("counts an empty string as zero words", () => {
  assert.equal(wordCount(""), 0);
});

test("counts whitespace-only text as zero words", () => {
  assert.equal(wordCount("   "), 0);
});

test("ignores whitespace at the start and end", () => {
  assert.equal(wordCount("  Hello world\n"), 2);
});

test("splits on any whitespace, including tabs and newlines", () => {
  assert.equal(wordCount("a\tb\nc\rd"), 4);
});

test("counts a single word", () => {
  assert.equal(wordCount("Hello"), 1);
});

test("rejects values that are not strings", () => {
  assert.throws(() => wordCount(7), TypeError);
  assert.throws(() => wordCount(null), TypeError);
  assert.throws(() => wordCount(undefined), TypeError);
  assert.throws(() => wordCount(["a", "b"]), TypeError);
});
