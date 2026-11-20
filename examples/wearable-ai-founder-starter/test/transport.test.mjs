import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';

test('actual loopback HTTP server carries the complete mock propose/confirm flow', async () => {
  const token = 'transport-test-token-over-thirty-two-characters';
  // A dedicated test-only port. No real device, account or external action.
  const port = 18787;
  const proc = spawn(process.execPath, ['src/server.mjs'], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, DEMO_API_TOKEN: token, PORT: String(port), INFERENCE_MODE: 'mock' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('server_start_timeout')), 3000);
      proc.stdout.once('data', () => { clearTimeout(timeout); resolve(); });
      proc.once('error', error => { clearTimeout(timeout); reject(error); });
      proc.once('exit', code => { clearTimeout(timeout); reject(new Error(`server_exited_${code}`)); });
    });
    const origin = `http://127.0.0.1:${port}`;
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    const capabilities = await (await fetch(`${origin}/capabilities`, { headers })).json();
    assert.equal(capabilities.nativeSdkConnected, false);
    const body = JSON.parse(await readFile(new URL('../fixtures/capture.json', import.meta.url), 'utf8'));
    body.consent.grantedAt = new Date().toISOString();
    const proposed = await fetch(`${origin}/propose`, { method: 'POST', headers, body: JSON.stringify(body) });
    assert.equal(proposed.status, 201);
    const p = await proposed.json();
    const confirmed = await fetch(`${origin}/confirm`, { method: 'POST', headers, body: JSON.stringify({ proposalId: p.proposalId, confirmationToken: p.confirmationToken, actionHash: p.actionHash, approve: true }) });
    assert.equal(confirmed.status, 201);
    const receipt = await confirmed.json();
    assert.equal(receipt.tool, 'save_local_note');
    assert.equal(receipt.externalAction, false);
  } finally {
    proc.kill();
    await new Promise(resolve => proc.exitCode !== null ? resolve() : proc.once('exit', resolve));
  }
});
