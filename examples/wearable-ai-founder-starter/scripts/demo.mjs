import { readFile } from 'node:fs/promises';
const origin = `http://127.0.0.1:${process.env.PORT ?? 8787}`;
const payload = JSON.parse(await readFile(new URL('../fixtures/capture.json', import.meta.url), 'utf8'));
payload.consent.grantedAt = new Date().toISOString();
// Enabling cloud mode is a separate deliberate choice before execution.
payload.consent.cloudInference = process.env.DEMO_ALLOW_CLOUD === 'yes';
const headers = { Authorization: `Bearer ${process.env.DEMO_API_TOKEN}`, 'Content-Type': 'application/json' };
const proposed = await fetch(`${origin}/propose`, { method: 'POST', headers, body: JSON.stringify(payload) });
const proposal = await proposed.json();
if (!proposed.ok) throw new Error(JSON.stringify(proposal));
console.log(JSON.stringify({ stage: 'review-proposal', ...proposal }, null, 2));
// No unattended automatic approval: caller must inspect and type approve.
process.stdout.write('Type approve to save this note in local process memory: ');
const { createInterface } = await import('node:readline/promises');
const prompt = createInterface({ input: process.stdin, output: process.stdout });
const answer = await prompt.question(''); prompt.close();
if (answer.trim() !== 'approve') { console.log('No action taken.'); process.exit(0); }
const confirmed = await fetch(`${origin}/confirm`, { method: 'POST', headers, body: JSON.stringify({
  proposalId: proposal.proposalId, confirmationToken: proposal.confirmationToken,
  actionHash: proposal.actionHash, approve: true
}) });
console.log(JSON.stringify(await confirmed.json(), null, 2));
if (!confirmed.ok) process.exitCode = 1;
