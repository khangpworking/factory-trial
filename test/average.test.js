import test from 'node:test';
import assert from 'node:assert/strict';
import { average } from '../src/average.js';

test('average of one number is that number', () => {
  assert.equal(average([5]), 5);
});

test('average of 2, 4 and 6 is 4', () => {
  assert.equal(average([2, 4, 6]), 4);
});

test('average of 1 and 2 is 1.5', () => {
  assert.equal(average([1, 2]), 1.5);
});

test('average of negative numbers', () => {
  assert.equal(average([-2, -4]), -3);
  assert.equal(average([-1, 2, 2]), 1);
});

test('average of a non-array throws TypeError', () => {
  assert.throws(() => average(5), TypeError);
  assert.throws(() => average('1,2,3'), TypeError);
});

test('average of an empty list throws RangeError', () => {
  assert.throws(() => average([]), RangeError);
});
