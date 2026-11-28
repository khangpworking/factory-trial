import { test } from "node:test";
import assert from "node:assert/strict";
import { longestWord } from "../src/longest-word.js";

test("returns the longest word", () => {
  assert.equal(longestWord("a bbb cc"), "bbb");
});

test("keeps the first word when longest words tie", () => {
  assert.equal(longestWord("ab cd"), "ab");
});

test("returns an empty string for whitespace-only text", () => {
  assert.equal(longestWord("   "), "");
});

test("returns an empty string for an empty string", () => {
  assert.equal(longestWord(""), "");
});

test("splits words on any whitespace", () => {
  assert.equal(longestWord("aa\tbbb\nc\rdddd"), "dddd");
});

test("ignores whitespace at the start and end", () => {
  assert.equal(longestWord("  hello   world  "), "hello");
});

test("returns a single word unchanged", () => {
  assert.equal(longestWord("hello"), "hello");
});

test("rejects values that are not strings", () => {
  assert.throws(() => longestWord(7), TypeError);
  assert.throws(() => longestWord(null), TypeError);
  assert.throws(() => longestWord(undefined), TypeError);
  assert.throws(() => longestWord(["a", "b"]), TypeError);
});