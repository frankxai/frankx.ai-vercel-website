import { createApp } from '../src/app.mjs';

// Preview intentionally has no confirmation/action path. In-memory state is
// not a durable serverless authorization or billing store.
let app;
export default {
  async fetch(request) {
    try {
      app ??= createApp({ token: process.env.DEMO_API_TOKEN, mode: process.env.INFERENCE_MODE ?? 'mock', allowActions: false });
      return await app.handler(request);
    } catch {
      return Response.json({ error: 'preview_configuration_missing' }, { status: 503 });
    }
  }
};
