import { randomBytes, randomUUID, createHash } from 'node:crypto';
import { PolicyError, requireThat, sameSecret, profiles, validateCapture } from './policy.mjs';
import { mockInference, openAIInference } from './inference.mjs';

const MAX_BODY = 1100000;
const json = (body, status = 200) => Response.json(body, { status, headers: {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'
} });

async function readBody(request) {
  requireThat(request.headers.get('content-type')?.split(';')[0] === 'application/json', 415, 'json_required');
  const reader = request.body?.getReader();
  requireThat(reader, 400, 'body_required');
  const chunks = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw new PolicyError(413, 'body_too_large'); }
    chunks.push(Buffer.from(value));
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new PolicyError(400, 'invalid_json'); }
}

export function createApp({ token, now = Date.now, mode = 'mock', infer, allowActions = true, inferenceLimit = 30 } = {}) {
  requireThat(typeof token === 'string' && token.length >= 32, 503, 'strong_demo_token_required');
  requireThat(mode === 'mock' || mode === 'openai', 503, 'invalid_inference_mode');
  const inference = infer ?? (mode === 'mock' ? mockInference : openAIInference({ apiKey: process.env.OPENAI_API_KEY, model: process.env.OPENAI_MODEL }));
  const proposals = new Map(), receipts = new Map(), budgets = new Map();
  const actor = 'local-demo-founder'; // Fixed server principal; request cannot choose actor.
  function clean() {
    for (const [id, proposal] of proposals) if (proposal.expiresAt < now()) proposals.delete(id);
    for (const [id, receipt] of receipts) if (receipt.createdAt + 3600000 < now()) receipts.delete(id);
  }
  function meter() {
    const bucket = Math.floor(now() / 3600000);
    if (!budgets.has(bucket)) { budgets.clear(); budgets.set(bucket, { requests: 0, input_tokens: 0, output_tokens: 0 }); }
    return budgets.get(bucket);
  }
  async function handler(request) {
    try {
      clean();
      requireThat(sameSecret(request.headers.get('authorization'), `Bearer ${token}`), 401, 'unauthorized');
      const path = new URL(request.url).pathname.replace(/^\/api(?=\/)/, '');
      if (request.method === 'GET' && path === '/capabilities') return json({ mode, profiles, nativeSdkConnected: false, actionsEnabled: allowActions });
      if (request.method === 'GET' && path === '/meter') return json({ ...meter(), scope: 'one-process-demo', billing: false });
      requireThat(request.method === 'POST' && ['/propose', '/confirm'].includes(path), 404, 'not_found');
      const body = await readBody(request);
      requireThat(body !== null && typeof body === 'object' && !Array.isArray(body), 400, 'object_required');
      if (path === '/propose') {
        const capture = validateCapture(body, now(), mode);
        const usage = meter();
        requireThat(usage.requests < inferenceLimit, 429, 'hourly_demo_budget_exhausted');
        // Reserve before awaiting inference so concurrent requests cannot bypass.
        usage.requests++;
        const result = await inference(capture);
        requireThat(typeof result.text === 'string' && result.text.trim().length > 0 && result.text.length <= 4000, 502, 'invalid_inference_output');
        usage.input_tokens += result.usage?.input_tokens ?? 0;
        usage.output_tokens += result.usage?.output_tokens ?? 0;
        const note = result.text.trim();
        // Model can supply text only. It cannot select a tool, destination,
        // identity, confirmation state, permission, or external request.
        const action = { tool: 'save_local_note', note };
        const actionHash = createHash('sha256').update(JSON.stringify(action)).digest('hex');
        if (!allowActions) return json({ previewOnly: true, summary: note, action, actionHash, confirmationEnabled: false, mode });
        const proposalId = randomUUID(), confirmationToken = randomBytes(32).toString('hex'), expiresAt = now() + 120000;
        proposals.set(proposalId, { actor, action, actionHash, confirmationToken, expiresAt });
        return json({ proposalId, action, actionHash, confirmationToken, expiresAt, mode, display: capture.capabilities.display, approvalRequired: true }, 201);
      }
      requireThat(allowActions, 503, 'preview_actions_disabled');
      const proposal = proposals.get(body.proposalId);
      requireThat(proposal && proposal.actor === actor, 404, 'proposal_unavailable');
      requireThat(proposal.expiresAt >= now(), 410, 'proposal_expired');
      requireThat(body.approve === true, 403, 'explicit_approval_required');
      requireThat(sameSecret(body.confirmationToken, proposal.confirmationToken) && body.actionHash === proposal.actionHash, 403, 'confirmation_mismatch');
      // Synchronous consume precedes side effect: one-use in this process.
      proposals.delete(body.proposalId);
      const receiptId = randomUUID();
      const receipt = { receiptId, actor, proposalId: body.proposalId, actionHash: proposal.actionHash, tool: proposal.action.tool, note: proposal.action.note, createdAt: now(), stored: 'process-memory-only', externalAction: false };
      receipts.set(receiptId, receipt);
      return json(receipt, 201);
    } catch (error) {
      return json({ error: error instanceof PolicyError ? error.code : 'request_failed' }, error instanceof PolicyError ? error.status : 502);
    }
  }
  return { handler, inspect: () => ({ proposals: proposals.size, receipts: receipts.size }) };
}
