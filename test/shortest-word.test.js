import { test } from "node:test";
import assert from "node:assert/strict";
import { shortestWord } from "../src/shortest-word.js";

test("returns the shortest word", () => {
  assert.equal(shortestWord("aaa b cc"), "b");
});

test("keeps the first word when shortest words tie", () => {
  assert.equal(shortestWord("ab cd"), "ab");
});

test("returns an empty string for whitespace-only text", () => {
  assert.equal(shortestWord("   "), "");
});

test("returns an empty string for an empty string", () => {
  assert.equal(shortestWord(""), "");
});

test("splits words on any whitespace", () => {
  assert.equal(shortestWord("aa\tbbb\nc\rdddd"), "c");
});

test("ignores whitespace at the start and end", () => {
  assert.equal(shortestWord("  hello   world  "), "hello");
});

test("returns a single word unchanged", () => {
  assert.equal(shortestWord("hello"), "hello");
});

test("rejects values that are not strings", () => {
  assert.throws(() => shortestWord(7), TypeError);
  assert.throws(() => shortestWord(null), TypeError);
  assert.throws(() => shortestWord(undefined), TypeError);
  assert.throws(() => shortestWord(["a", "b"]), TypeError);
});