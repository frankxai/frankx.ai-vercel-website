/** Browser-only adapter. Application handlers remain the permission boundary. */
export function registerWebTools(context, tools, { signal, onError = () => {} } = {}) {
  const lifecycle = new AbortController();
  const stop = () => lifecycle.abort();
  if (signal?.aborted || !context?.registerTool) return { ready: Promise.resolve(false), stop };
  signal?.addEventListener('abort', stop, { once: true });
  lifecycle.signal.addEventListener('abort', () => signal?.removeEventListener('abort', stop), { once: true });
  const names = new Set();
  const pending = [];
  let writing = false;
  try {
    for (const tool of tools) {
      if (!/^[A-Za-z0-9_.-]{1,128}$/.test(tool.name) || names.has(tool.name) || typeof tool.execute !== 'function') {
        throw new Error('Invalid or duplicate browser tool.');
      }
      names.add(tool.name);
    }
    for (const tool of tools) {
      pending.push(Promise.resolve(context.registerTool({
        ...tool,
        async execute(input) {
          if (lifecycle.signal.aborted) throw new Error('This page action is no longer available.');
          const mutation = tool.annotations?.readOnlyHint !== true;
          if (mutation && writing) throw new Error('Another page action is updating this workspace. Try again after it completes.');
          if (mutation) writing = true;
          try {
            const result = await tool.execute(input, { signal: lifecycle.signal });
            if (lifecycle.signal.aborted) throw new Error('The page changed before the action completed.');
            // Snapshot results; never return live state, functions or cyclic structures.
            const json = JSON.stringify(result);
            if (json === undefined || json.length > 2_000_000) throw new Error('Tool result is unavailable or too large.');
            return JSON.parse(json);
          } catch (error) {
            if (lifecycle.signal.aborted) throw error;
            // Browser engines otherwise collapse script failures into an opaque UnknownError.
            // Only application-authored public messages cross this boundary.
            const declared = /^[A-Z_]{1,64}$/.test(error?.code ?? '') && typeof error?.publicMessage === 'string';
            return { ok: false, error: { code: declared ? error.code : 'ACTION_FAILED',
              message: declared ? error.publicMessage.slice(0, 500) : 'The action could not complete. Check the current inputs and retry.' } };
          } finally { if (mutation) writing = false; }
        },
      }, { signal: lifecycle.signal })));
    }
  } catch (error) {
    stop();
    onError(error);
    // Observe registrations already started before a synchronous failure.
    void Promise.allSettled(pending);
    return { ready: Promise.resolve(false), stop };
  }
  const ready = Promise.all(pending).then(() => !lifecycle.signal.aborted, error => {
    stop();
    onError(error);
    return false;
  });
  return { ready, stop };
}

/** Only explicitly supplied, non-destructive public read tools are bridged. */
export function createReadOnlyMcpTools({ endpoint, origin, descriptors, fetchImpl = fetch }) {
  const target = new URL(endpoint, origin);
  if (target.origin !== new URL(origin).origin || target.username || target.password) {
    throw new Error('Browser MCP endpoint must be same-origin.');
  }
  return descriptors.map(descriptor => {
    if (descriptor.annotations?.readOnlyHint !== true || descriptor.annotations?.destructiveHint === true) {
      throw new Error('Only reviewed read-only tools may use this bridge.');
    }
    return {
      name: descriptor.name,
      title: descriptor.title ?? descriptor.name,
      description: descriptor.description,
      inputSchema: descriptor.inputSchema,
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      async execute(input, { signal } = {}) {
        if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Tool arguments must be an object.');
        const id = crypto.randomUUID();
        const body = JSON.stringify({ jsonrpc: '2.0', id, method: 'tools/call', params: {
          name: descriptor.name, arguments: input,
          _meta: { 'io.modelcontextprotocol/protocolVersion': '2025-11-25', 'io.modelcontextprotocol/clientCapabilities': {},
            'io.modelcontextprotocol/clientInfo': { name: 'starlight-webmcp', version: '0.1.0' } },
        } });
        if (new TextEncoder().encode(body).length > 65_536) throw new Error('Tool arguments are too large.');
        const deadline = AbortSignal.timeout(15_000);
        const requestSignal = signal ? AbortSignal.any([signal, deadline]) : deadline;
        const response = await fetchImpl(target.href, {
          method: 'POST', credentials: 'same-origin', redirect: 'error', cache: 'no-store', signal: requestSignal,
          headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream',
            'MCP-Protocol-Version': '2025-11-25', 'Mcp-Method': 'tools/call', 'Mcp-Name': descriptor.name }, body,
        });
        if (!response.ok) throw new Error(`The public MCP operation failed (${response.status}).`);
        if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Unexpected MCP response format.');
        const reader = response.body?.getReader();
        if (!reader) throw new Error('Empty MCP response.');
        const chunks = []; let bytes = 0;
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            bytes += value.byteLength;
            if (bytes > 2_000_000) throw new Error('MCP response exceeds the limit.');
            chunks.push(value);
          }
        } finally { await reader.cancel().catch(() => {}); }
        const buffer = new Uint8Array(bytes); let offset = 0;
        for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
        const envelope = JSON.parse(new TextDecoder().decode(buffer));
        if (envelope.jsonrpc !== '2.0' || envelope.id !== id || envelope.error || !envelope.result || envelope.result.isError) {
          throw new Error('The MCP operation did not return a successful matching result.');
        }
        const result = envelope.result;
        if (result.structuredContent) return result.structuredContent;
        const text = result.content?.find(item => item.type === 'text')?.text;
        if (typeof text !== 'string') throw new Error('The MCP operation returned no structured result.');
        return JSON.parse(text);
      },
    };
  });
}

