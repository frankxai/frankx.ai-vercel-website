import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('merging main preserves the production hold while previews remain enabled', () => {
  const config = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
  // Vercel confirms main is the production branch. Overlapping true rules can
  // re-enable deployment, so the hold must be the only explicit branch rule.
  assert.deepEqual(config.git.deploymentEnabled, { main: false });
});
