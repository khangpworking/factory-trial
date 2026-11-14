import { test } from "node:test";
import assert from "node:assert/strict";
import { capitalize } from "../src/capitalize.js";

test("upper-cases the first letter of a word", () => {
  assert.equal(capitalize("hello"), "Hello");
});

test("returns an empty string unchanged", () => {
  assert.equal(capitalize(""), "");
});

test("upper-cases an accented first letter", () => {
  assert.equal(capitalize("éclair"), "Éclair");
});

test("leaves the rest of the text unchanged", () => {
  assert.equal(capitalize("hELLO"), "HELLO");
});

test("handles a single character", () => {
  assert.equal(capitalize("a"), "A");
});

test("rejects non-string text", () => {
  assert.throws(() => capitalize(7), TypeError);
  assert.throws(() => capitalize(null), TypeError);
  assert.throws(() => capitalize(undefined), TypeError);
});