import test from 'node:test';
import assert from 'node:assert/strict';
import { average } from '../src/average.js';

test('average of one number is that number', () => {
  assert.equal(average([5]), 5);
});
