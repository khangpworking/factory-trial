import { test } from "node:test";
import assert from "node:assert/strict";
import { snakeCase } from "../src/snake-case.js";

test("lowercases words and joins them with underscores", () => {
  assert.equal(snakeCase("Hello Big World"), "hello_big_world");
});

test("returns an empty string unchanged", () => {
  assert.equal(snakeCase(""), "");
});

test("handles a single word", () => {
  assert.equal(snakeCase("Hello"), "hello");
});

test("keeps one underscore between each pair of words", () => {
  assert.equal(snakeCase("a b c d"), "a_b_c_d");
});

test("rejects values that are not strings", () => {
  assert.throws(() => snakeCase(7), TypeError);
  assert.throws(() => snakeCase(null), TypeError);
  assert.throws(() => snakeCase(undefined), TypeError);
  assert.throws(() => snakeCase(["a", "b"]), TypeError);
});
