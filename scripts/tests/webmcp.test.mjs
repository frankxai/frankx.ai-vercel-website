import test from 'node:test';
import assert from 'node:assert/strict';
import { registerWebTools, createReadOnlyMcpTools } from '../../lib/webmcp.mjs';

const descriptor = { name: 'atlas_search', description: 'Search public drafts.', inputSchema: { type: 'object' }, annotations: { readOnlyHint: true } };
const tool = { ...descriptor, execute: async () => ({ ok: true }) };
function context() {
  const registered = new Map();
  return { registered, registerTool(tool, { signal }) { registered.set(tool.name, tool); signal.addEventListener('abort', () => registered.delete(tool.name), { once: true }); } };
}
test('unsupported browsers retain the ordinary interface', async () => {
  assert.equal(await registerWebTools(undefined, [tool]).ready, false);
});
test('registers and unregisters page tools with lifecycle', async () => {
  const ctx = context(); const registration = registerWebTools(ctx, [tool]);
  assert.equal(await registration.ready, true); assert.equal(ctx.registered.size, 1);
  const handle = ctx.registered.get(tool.name); registration.stop();
  assert.equal(ctx.registered.size, 0); await assert.rejects(handle.execute({}), /no longer available/);
});
test('external abort removes registrations', async () => {
  const ctx = context(); const controller = new AbortController();
  const registration = registerWebTools(ctx, [tool], { signal: controller.signal }); await registration.ready;
  controller.abort(); assert.equal(ctx.registered.size, 0);
});
test('duplicate names fail before partial registration', async () => {
  const ctx = context(); let errors = 0;
  assert.equal(await registerWebTools(ctx, [tool, tool], { onError: () => errors++ }).ready, false);
  assert.equal(ctx.registered.size, 0); assert.equal(errors, 1);
});
test('async registration failure cancels the group', async () => {
  const ctx = context(); const original = ctx.registerTool;
  ctx.registerTool = (...args) => { original(...args); return Promise.reject(new Error('unsupported')); };
  assert.equal(await registerWebTools(ctx, [tool]).ready, false); assert.equal(ctx.registered.size, 0);
});
test('serializes mutations and rejects completion after page teardown', async () => {
  const ctx = context(); let complete;
  const registration = registerWebTools(ctx, [{ ...tool, annotations: {}, execute: () => new Promise(resolve => { complete = resolve; }) }]);
  await registration.ready; const action = ctx.registered.get(tool.name);
  const pending = action.execute({}); await assert.rejects(action.execute({}), /Another page action/);
  registration.stop(); complete({ ok: true }); await assert.rejects(pending, /page changed/);
});
test('results are snapshots and cyclic results fail', async () => {
  const ctx = context(); const data = { count: 1 };
  const registration = registerWebTools(ctx, [{ ...tool, execute: () => data }]); await registration.ready;
  const result = await ctx.registered.get(tool.name).execute({}); data.count = 2; assert.equal(result.count, 1);
  data.self = data; assert.equal((await ctx.registered.get(tool.name).execute({})).ok, false); registration.stop();
});
test('bridge refuses cross-origin and unreviewed write descriptors', () => {
  assert.throws(() => createReadOnlyMcpTools({ endpoint: 'https://other.test/mcp', origin: 'https://site.test', descriptors: [descriptor] }), /same-origin/);
  assert.throws(() => createReadOnlyMcpTools({ endpoint: '/mcp', origin: 'https://site.test', descriptors: [{ ...descriptor, annotations: {} }] }), /read-only/);
  assert.throws(() => createReadOnlyMcpTools({ endpoint: '/mcp', origin: 'https://site.test', descriptors: [{ ...descriptor, annotations: { readOnlyHint: true, destructiveHint: true } }] }), /read-only/);
});
test('returns declared recovery errors and hides unexpected internal exception details', async () => {
  const ctx = context(); let declared = true;
  const registration = registerWebTools(ctx, [{ ...tool, execute: () => {
    const error = new Error('Internal detail that must stay private');
    if (declared) { error.code = 'REVISION_CONFLICT'; error.publicMessage = 'Read the project again.'; }
    throw error;
  } }]); await registration.ready;
  assert.deepEqual(await ctx.registered.get(tool.name).execute({}), { ok: false, error: { code: 'REVISION_CONFLICT', message: 'Read the project again.' } });
  declared = false; const failed = await ctx.registered.get(tool.name).execute({});
  assert.equal(failed.error.code, 'ACTION_FAILED'); assert.ok(!JSON.stringify(failed).includes('Internal detail')); registration.stop();
});
function bridge(reply) {
  return createReadOnlyMcpTools({ endpoint: '/mcp', origin: 'https://site.test', descriptors: [descriptor], fetchImpl: async (url, request) => {
    assert.equal(url, 'https://site.test/mcp'); assert.equal(request.redirect, 'error'); assert.equal(request.credentials, 'same-origin');
    assert.equal(request.headers['Mcp-Name'], 'atlas_search');
    const body = JSON.parse(request.body); assert.equal(body.params._meta['io.modelcontextprotocol/protocolVersion'], request.headers['MCP-Protocol-Version']);
    return reply(body);
  } })[0];
}
test('bridge returns matching structured read results', async () => {
  const read = bridge(body => Response.json({ jsonrpc: '2.0', id: body.id, result: { structuredContent: { articles: [] }, isError: false } }));
  assert.deepEqual(await read.execute({ query: 'stars' }), { articles: [] });
});
test('bridge preserves failures, rejects forged envelopes and bounds bodies', async () => {
  for (const reply of [() => Response.json({}, { status: 403 }), () => Response.json({ jsonrpc: '2.0', id: 'wrong', result: {} }), body => Response.json({ jsonrpc: '2.0', id: body.id, result: { isError: true } })]) {
    await assert.rejects(bridge(reply).execute({}));
  }
  await assert.rejects(bridge(() => Response.json({})).execute(null), /object/);
  await assert.rejects(bridge(() => Response.json({})).execute({ query: 'x'.repeat(70_000) }), /too large/);
  await assert.rejects(bridge(() => new Response('x'.repeat(2_000_001), { headers: { 'content-type': 'application/json' } })).execute({}), /exceeds/);
});

