/**
 * Prompt Hub — SBO (Second Brain OS) Runtime Bridge
 *
 * Interface-only adapter so the Cartographer + Psychometrist agents can call
 * Second Brain OS without a hard dependency. SBO is open at
 * https://github.com/frankxai/second-brain-os but not yet npm-published, and
 * the v0.1.0 public surface is a Python ingestion package + slash-command
 * distill flow rather than a JS API.
 *
 * The bridge anticipates a future TypeScript adapter (npm package or REST
 * shim). Until that exists, the stub keeps the runtime path unblocked and
 * surfaces a single startup notice so operators know they're in
 * single-session mode.
 *
 * Resolution order (first wired wins):
 *   1. npm import — `@frankxai/second-brain-os`
 *   2. local file import — `$SBO_LOCAL_PATH/index.js`
 *   3. HTTP remote — `$SBO_REMOTE_URL` (assumes a future REST adapter)
 *   4. stub fallback
 *
 * See: docs/superpowers/specs/2026-05-13-prompt-hub-sbo-bridge.md
 */

import type { SboReflection } from './types';

export type { SboReflection } from './types';

// ============================================================================
// Public contract
// ============================================================================

export type SboHealthStatus = 'ok' | 'degraded' | 'offline';
export type SboMode = 'local' | 'remote' | 'stub';

export interface SboHealth {
  status: SboHealthStatus;
  mode: SboMode;
}

export interface SboCommitResult {
  ok: boolean;
  id?: string;
}

export interface SboClient {
  recall(userId: string, theme?: string): Promise<SboReflection[]>;
  commit(reflection: SboReflection): Promise<SboCommitResult>;
  health(): Promise<SboHealth>;
}

// ============================================================================
// Stub implementation
// ============================================================================

const STUB_WARNING =
  '[prompt-hub] SBO not wired. Operating in single-session stub mode. ' +
  'See docs/superpowers/specs/2026-05-13-prompt-hub-sbo-bridge.md for wiring.';

let stubWarningEmitted = false;

function emitStubWarningOnce(): void {
  if (stubWarningEmitted) return;
  stubWarningEmitted = true;
  console.warn(STUB_WARNING);
}

/**
 * Create an explicit stub client. Used by tests and as the fallback inside
 * `getSboClient()`. The stub returns empty reads, no-op writes, and reports
 * `degraded / stub` health.
 */
export function createStubClient(): SboClient {
  emitStubWarningOnce();

  return {
    async recall(_userId: string, _theme?: string): Promise<SboReflection[]> {
      return [];
    },
    async commit(_reflection: SboReflection): Promise<SboCommitResult> {
      return { ok: false };
    },
    async health(): Promise<SboHealth> {
      return { status: 'degraded', mode: 'stub' };
    },
  };
}

// ============================================================================
// Lazy resolver
// ============================================================================

interface RawSboModule {
  createClient?: (options?: Record<string, unknown>) => SboClient;
  default?: SboClient | ((options?: Record<string, unknown>) => SboClient);
  recall?: SboClient['recall'];
  commit?: SboClient['commit'];
  health?: SboClient['health'];
}

function adaptModule(mod: RawSboModule, mode: SboMode): SboClient | null {
  // Preferred shape: factory function.
  if (typeof mod.createClient === 'function') {
    try {
      return mod.createClient();
    } catch {
      return null;
    }
  }

  // Default export is itself a factory.
  if (typeof mod.default === 'function') {
    try {
      return (mod.default as (options?: Record<string, unknown>) => SboClient)();
    } catch {
      return null;
    }
  }

  // Default export is a client instance.
  if (mod.default && typeof mod.default === 'object') {
    const candidate = mod.default as Partial<SboClient>;
    if (
      typeof candidate.recall === 'function' &&
      typeof candidate.commit === 'function' &&
      typeof candidate.health === 'function'
    ) {
      return candidate as SboClient;
    }
  }

  // Flat named exports.
  if (
    typeof mod.recall === 'function' &&
    typeof mod.commit === 'function' &&
    typeof mod.health === 'function'
  ) {
    return {
      recall: mod.recall,
      commit: mod.commit,
      health: async () => {
        try {
          const h = await mod.health!();
          return { status: h.status, mode };
        } catch {
          return { status: 'degraded', mode };
        }
      },
    };
  }

  return null;
}

async function tryNpmImport(): Promise<SboClient | null> {
  try {
    // Dynamic specifier prevents bundler/TS resolution at build time. The
    // package is not yet published; this attempt is expected to fail today
    // and succeed once SBO ships a JS adapter on npm.
    const specifier = '@frankxai/second-brain-os';
    const mod = (await import(/* webpackIgnore: true */ specifier)) as RawSboModule;
    return adaptModule(mod, 'local');
  } catch {
    return null;
  }
}

async function tryLocalImport(): Promise<SboClient | null> {
  const localPath = typeof process !== 'undefined' ? process.env?.SBO_LOCAL_PATH : undefined;
  if (!localPath) return null;

  try {
    // Build a file:// URL so the dynamic import works on Windows paths too.
    const trimmed = localPath.replace(/[\\/]+$/, '');
    const entry = `${trimmed}/index.js`;
    const url = entry.match(/^[a-zA-Z]:[\\/]/)
      ? `file:///${entry.replace(/\\/g, '/')}`
      : entry.startsWith('/')
        ? `file://${entry}`
        : entry;

    const mod = (await import(/* webpackIgnore: true */ url)) as RawSboModule;
    return adaptModule(mod, 'local');
  } catch {
    return null;
  }
}

interface RemoteCommitResponse {
  ok?: boolean;
  id?: string;
}

interface RemoteHealthResponse {
  status?: SboHealthStatus;
}

function buildRemoteClient(baseUrl: string): SboClient {
  const base = baseUrl.replace(/\/+$/, '');

  return {
    async recall(userId: string, theme?: string): Promise<SboReflection[]> {
      const params = new URLSearchParams({ userId });
      if (theme) params.set('theme', theme);
      const res = await fetch(`${base}/recall?${params.toString()}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return [];
      const data = (await res.json()) as { reflections?: SboReflection[] };
      return Array.isArray(data.reflections) ? data.reflections : [];
    },

    async commit(reflection: SboReflection): Promise<SboCommitResult> {
      try {
        const res = await fetch(`${base}/commit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(reflection),
        });
        if (!res.ok) return { ok: false };
        const data = (await res.json()) as RemoteCommitResponse;
        return { ok: data.ok ?? true, id: data.id };
      } catch {
        return { ok: false };
      }
    },

    async health(): Promise<SboHealth> {
      try {
        const res = await fetch(`${base}/health`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) return { status: 'offline', mode: 'remote' };
        const data = (await res.json()) as RemoteHealthResponse;
        return { status: data.status ?? 'ok', mode: 'remote' };
      } catch {
        return { status: 'offline', mode: 'remote' };
      }
    },
  };
}

async function tryRemoteAdapter(): Promise<SboClient | null> {
  const remoteUrl = typeof process !== 'undefined' ? process.env?.SBO_REMOTE_URL : undefined;
  if (!remoteUrl) return null;

  // Don't probe the network here — just wire the client. Callers can use
  // `health()` to verify reachability.
  try {
    return buildRemoteClient(remoteUrl);
  } catch {
    return null;
  }
}

// Cache the resolved client across calls in the same process. Tests can reset
// via `__resetSboClientCacheForTests`.
let cachedClient: SboClient | null = null;

/**
 * Lazy resolver. Tries (in order): npm import, local file import via
 * `SBO_LOCAL_PATH`, HTTP remote via `SBO_REMOTE_URL`, stub fallback.
 *
 * Always returns a client — never throws. The stub path emits a one-time
 * warning so operators know they're in single-session mode.
 */
export async function getSboClient(): Promise<SboClient> {
  if (cachedClient) return cachedClient;

  const fromNpm = await tryNpmImport();
  if (fromNpm) {
    cachedClient = fromNpm;
    return cachedClient;
  }

  const fromLocal = await tryLocalImport();
  if (fromLocal) {
    cachedClient = fromLocal;
    return cachedClient;
  }

  const fromRemote = await tryRemoteAdapter();
  if (fromRemote) {
    cachedClient = fromRemote;
    return cachedClient;
  }

  cachedClient = createStubClient();
  return cachedClient;
}

/**
 * Test-only helper. Drops the cached client so the next `getSboClient()`
 * call re-runs the resolution chain. Not exported via the public bridge
 * surface in agent prompts — consumed by the spec's smoke tests only.
 */
export function __resetSboClientCacheForTests(): void {
  cachedClient = null;
  stubWarningEmitted = false;
}
