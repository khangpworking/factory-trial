import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDuration } from "../src/duration.js";

test("parses single units", () => {
  assert.equal(parseDuration("45s"), 45);
  assert.equal(parseDuration("2m"), 120);
});

test("parses combined units", () => {
  assert.equal(parseDuration("1h30m"), 5400);
});

test("rejects malformed input", () => {
  assert.throws(() => parseDuration(""), SyntaxError);
  assert.throws(() => parseDuration("10x"), SyntaxError);
});
