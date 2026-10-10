import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pointer = fs.readFileSync(path.join(root, '.claude', 'commands', 'ceremonies.md'), 'utf8');
const ids = ['morning', 'press', 'essay', 'orchestra'];

test('this brand command surface points at the shared ceremonies', () => {
  assert.match(pointer, /does not copy the crew/);
  assert.match(pointer, /scripts\/ceremonies\/run\.mjs/);
  for (const id of ids) assert.ok(pointer.includes(`/${id}`), id);
  assert.equal(pointer.includes('You are the'), false);
});
