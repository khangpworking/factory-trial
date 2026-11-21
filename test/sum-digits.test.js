import { test } from "node:test";
import assert from "node:assert/strict";
import { sumDigits } from "../src/sum-digits.js";

test("adds the digits of a positive integer", () => {
  assert.equal(sumDigits(123), 6);
});

test("returns zero for zero", () => {
  assert.equal(sumDigits(0), 0);
});

test("adds the digits of the absolute value of a negative integer", () => {
  assert.equal(sumDigits(-123), 6);
});

test("returns the value of a single-digit integer", () => {
  assert.equal(sumDigits(7), 7);
  assert.equal(sumDigits(-7), 7);
});

test("adds the digits of a larger integer", () => {
  assert.equal(sumDigits(987654321), 45);
});

test("rejects values that are not integers", () => {
  assert.throws(() => sumDigits(1.5), TypeError);
  assert.throws(() => sumDigits("123"), TypeError);
  assert.throws(() => sumDigits(NaN), TypeError);
  assert.throws(() => sumDigits(Infinity), TypeError);
});
