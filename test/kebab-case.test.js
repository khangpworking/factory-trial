import { test } from "node:test";
import assert from "node:assert/strict";
import { kebabCase } from "../src/kebab-case.js";

test("lowercases words and joins them with dashes", () => {
  assert.equal(kebabCase("Hello Big World"), "hello-big-world");
});

test("returns an empty string unchanged", () => {
  assert.equal(kebabCase(""), "");
});

test("handles a single word", () => {
  assert.equal(kebabCase("Hello"), "hello");
});

test("keeps one dash between each pair of words", () => {
  assert.equal(kebabCase("a b c d"), "a-b-c-d");
});

test("rejects values that are not strings", () => {
  assert.throws(() => kebabCase(7), TypeError);
  assert.throws(() => kebabCase(null), TypeError);
  assert.throws(() => kebabCase(undefined), TypeError);
  assert.throws(() => kebabCase(["a", "b"]), TypeError);
});
