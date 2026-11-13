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
