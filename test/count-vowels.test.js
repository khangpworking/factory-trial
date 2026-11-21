import { test } from "node:test";
import assert from "node:assert/strict";
import { countVowels } from "../src/count-vowels.js";

test("counts the vowels in a lowercase word", () => {
  assert.equal(countVowels("banana"), 3);
});

test("returns zero for an empty string", () => {
  assert.equal(countVowels(""), 0);
});

test("counts upper case vowels", () => {
  assert.equal(countVowels("AEIOU"), 5);
});

test("counts vowels regardless of case", () => {
  assert.equal(countVowels("Hello World"), 3);
});

test("ignores non-vowel letters and other characters", () => {
  assert.equal(countVowels("xyz 123!"), 0);
});

test("rejects values that are not strings", () => {
  assert.throws(() => countVowels(42), TypeError);
  assert.throws(() => countVowels(null), TypeError);
  assert.throws(() => countVowels(undefined), TypeError);
  assert.throws(() => countVowels(["a", "e"]), TypeError);
});
