import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { createApp } from './app.mjs';

const app = createApp({ token: process.env.DEMO_API_TOKEN, mode: process.env.INFERENCE_MODE ?? 'mock' });
const server = createServer(async (req, res) => {
  try {
    const request = new Request(`http://127.0.0.1${req.url}`, {
      method: req.method, headers: req.headers,
      ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: Readable.toWeb(req), duplex: 'half' } : {})
    });
    const result = await app.handler(request);
    res.writeHead(result.status, Object.fromEntries(result.headers));
    res.end(Buffer.from(await result.arrayBuffer()));
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ error: 'invalid_transport_request' }));
  }
});
server.listen(Number(process.env.PORT ?? 8787), '127.0.0.1', () => console.log('Wearable starter listening on 127.0.0.1; mock devices only.'));
