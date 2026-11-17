import { test } from "node:test";
import assert from "node:assert/strict";
import { unitPrice } from "../scripts/unit-price.mjs";

test("divides by the count", () => {
  assert.equal(unitPrice("Eggs 3 pcs", 300), 100);
});

test("a label without a count is one item", () => {
  assert.equal(unitPrice("Apple", 250), 250);
});
