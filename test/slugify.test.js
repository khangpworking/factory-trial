import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "../src/slugify.js";

test("lowercases and joins words with dashes", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("drops leading, trailing and repeated separators", () => {
  assert.equal(slugify("  --Big   Sale!!  "), "big-sale");
});

test("rejects non-strings", () => {
  assert.throws(() => slugify(42), TypeError);
});

test("folds accented Latin letters to their base letter", () => {
  assert.equal(slugify("Crème Brûlée"), "creme-brulee");
});

test("folds stacked Vietnamese accents", () => {
  assert.equal(slugify("Tiếng Việt"), "tieng-viet");
});

test("cuts the slug to maxLength", () => {
  assert.equal(slugify("hello big world", 9), "hello-big");
});

test("never leaves a trailing dash after cutting", () => {
  assert.equal(slugify("hello big world", 6), "hello");
});

test("keeps the whole slug when maxLength is longer", () => {
  assert.equal(slugify("hello big world", 99), "hello-big-world");
});

test("rejects a maxLength of zero", () => {
  assert.throws(() => slugify("x", 0), RangeError);
});

test("rejects a negative or fractional maxLength", () => {
  assert.throws(() => slugify("x", -1), RangeError);
  assert.throws(() => slugify("x", 2.5), RangeError);
});
