import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('main deploys to production: no branch rule disables it', () => {
  const config = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
  // Vercel confirms main is the production branch. The 4 November hold (#1162)
  // was lifted by a separately approved release; re-holding means restoring
  // { main: false } here and in vercel.json together.
  assert.notEqual(config.git?.deploymentEnabled?.main, false);
  assert.notEqual(config.git?.deploymentEnabled, false);
});
