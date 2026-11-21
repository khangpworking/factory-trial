import { test } from 'node:test';
import assert from 'node:assert/strict';
import { obsolete } from '../src/obsolete.js';
test('obsolete', () => assert.equal(obsolete(), 1));
