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

test("parses days", () => {
  assert.equal(parseDuration("1d"), 86400);
  assert.equal(parseDuration("1d 2h"), 93600);
});

test("allows multiple spaces between parts", () => {
  assert.equal(parseDuration("1h   30m"), 5400);
});

test("rejects units out of order", () => {
  assert.throws(() => parseDuration("30m1h"), SyntaxError);
});

test("rejects repeated units", () => {
  assert.throws(() => parseDuration("1h1h"), SyntaxError);
});

test("rejects malformed input", () => {
  assert.throws(() => parseDuration(""), SyntaxError);
  assert.throws(() => parseDuration("10x"), SyntaxError);
});
