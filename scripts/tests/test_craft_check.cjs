'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const checker = path.join(__dirname, '..', 'craft-check.cjs');
const fixtures = path.join(__dirname, '..', 'fixtures', 'craft');

test('the committed craft check scores both fixtures', () => {
  for (const name of ['slop.html', 'craft.html']) {
    const file = path.join(fixtures, name);
    const want = fs.readFileSync(file, 'utf8').match(/craft-expect:\s*(\S+)/)[1];
    const run = spawnSync(process.execPath, [checker, file], { encoding: 'utf8' });
    process.stdout.write(`${name} verdict=${String(run.stdout || '').trim()} exit=${run.status}\n`);
    assert.equal(String(run.stdout || '').trim(), want);
    assert.equal(run.status, want === 'accept' ? 0 : 1);
  }
});
