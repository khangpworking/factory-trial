import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPrice } from "../src/price.js";

test("formats cents with two decimals", () => {
  assert.equal(formatPrice(1999), "$19.99");
  assert.equal(formatPrice(5), "$0.05");
});

test("uses the currency symbol", () => {
  assert.equal(formatPrice(100, "EUR"), "€1.00");
});

test("rejects non-integer amounts and unknown currencies", () => {
  assert.throws(() => formatPrice(1.5), TypeError);
  assert.throws(() => formatPrice(100, "XYZ"), RangeError);
});
