import { test } from "node:test";
import assert from "node:assert/strict";
import { titleCase } from "../src/title-case.js";

test("upper-cases the first letter of every word", () => {
  assert.equal(titleCase("hello big world"), "Hello Big World");
});

test("returns an empty string unchanged", () => {
  assert.equal(titleCase(""), "");
});

test("keeps the rest of each word unchanged", () => {
  assert.equal(titleCase("hELLO wORLD"), "HELLO WORLD");
});

test("handles a single word", () => {
  assert.equal(titleCase("hello"), "Hello");
});

test("upper-cases an accented first letter", () => {
  assert.equal(titleCase("éclair au chocolat"), "Éclair Au Chocolat");
});

test("leaves non-letter characters unchanged", () => {
  assert.equal(titleCase("hello 123 world"), "Hello 123 World");
});

test("rejects values that are not strings", () => {
  assert.throws(() => titleCase(7), TypeError);
  assert.throws(() => titleCase(null), TypeError);
  assert.throws(() => titleCase(undefined), TypeError);
  assert.throws(() => titleCase(["a", "b"]), TypeError);
});
