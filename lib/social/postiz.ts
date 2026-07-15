// Minimal Postiz REST client, built from the verified @postiz/node SDK (v1.0.8) source —
// not the SDK package itself, to avoid pulling in its node-fetch dependency (native fetch
// covers the same calls in the Next.js Node runtime) and to keep every request auditable here.
//
// Contract, confirmed from the SDK's compiled source:
//   base URL default: https://api.postiz.com (override for self-hosted via POSTIZ_API_URL)
//   auth header: `Authorization: <api key>` (raw key, not "Bearer ...")
//   POST   /public/v1/posts         — create/schedule a post
//   GET    /public/v1/integrations  — list connected channels
//
// Deliberately draft-only: CLAUDE.md lists "posting to LinkedIn/X/Bluesky/Threads via any
// auto-distribute path" as a hard stop requiring Frank's explicit ask. This client can create
// a Postiz *draft* and nothing else — the final publish action always happens inside Postiz,
// a separate, explicit step a human takes. `type` is not exposed as a caller-configurable option.

const DEFAULT_BASE_URL = 'https://api.postiz.com';

export class PostizNotConfiguredError extends Error {
  constructor() {
    super('POSTIZ_API_KEY is not set — Postiz distribution is disabled until it is.');
    this.name = 'PostizNotConfiguredError';
  }
}

export function isPostizConfigured(): boolean {
  return Boolean(process.env.POSTIZ_API_KEY);
}

function baseUrl(): string {
  return process.env.POSTIZ_API_URL || DEFAULT_BASE_URL;
}

function authHeaders(): Record<string, string> {
  const apiKey = process.env.POSTIZ_API_KEY;
  if (!apiKey) throw new PostizNotConfiguredError();
  return { 'Content-Type': 'application/json', Authorization: apiKey };
}

/** Raw passthrough — the SDK types this as `unknown`, so callers inspect it directly
 *  (e.g. via GET /api/content-studio/distribute) rather than this module guessing field names. */
export async function listIntegrations(): Promise<unknown> {
  const res = await fetch(`${baseUrl()}/public/v1/integrations`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Postiz integrations() failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export type PostizProviderSettings =
  | { __type: 'linkedin'; post_as_images_carousel: boolean }
  | { __type: 'x' }
  | { __type: 'instagram'; post_type: 'post' | 'story'; collaborators: [] };

export interface CreateDraftParams {
  integrationId: string;
  content: string;
  settings: PostizProviderSettings;
  /** Free-text grouping key — we use the content item id (e.g. "linkedin-my-slug"). */
  group: string;
}

/** Creates a DRAFT in Postiz. Never schedules, never publishes — see module header. */
export async function createDraft(params: CreateDraftParams): Promise<unknown> {
  const body = {
    type: 'draft' as const,
    shortLink: false,
    date: new Date().toISOString(),
    tags: [],
    posts: [
      {
        integration: { id: params.integrationId },
        value: [{ id: '', content: params.content, image: [] }],
        group: params.group,
        settings: params.settings,
      },
    ],
  };

  const res = await fetch(`${baseUrl()}/public/v1/posts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Postiz post() failed: ${res.status} ${await res.text()}`);
  return res.json();
}
