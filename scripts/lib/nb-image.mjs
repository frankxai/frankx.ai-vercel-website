/**
 * scripts/lib/nb-image.mjs
 *
 * Single source of truth for FrankX image generation via Nano Banana 2 / Pro / 1.
 * Every command, agent, skill, and script that needs an image goes through here.
 *
 * Why this exists:
 *   - The NB2 MCP server keeps getting cleaned up between sessions.
 *   - Claude Desktop reinstalls drop the mcpServers block.
 *   - Hardcoding model IDs across 29 files breaks on every model rename.
 *   - This module survives all three because it talks to Gemini directly.
 *
 * Model defaults (2026-04-29, verified via ListModels):
 *   - 'nb2'    →  gemini-3.1-flash-image-preview  (Nano Banana 2)   ← default
 *   - 'nbpro'  →  gemini-3-pro-image-preview      (Nano Banana Pro, premium hero shots)
 *   - 'nb1'    →  gemini-2.5-flash-image          (Nano Banana, fallback only)
 *
 * Design-thinking discipline:
 *   When `enforceDesignThinking: true` (default), the prompt MUST include
 *   evidence of the 80/20 process — at minimum a "## CONCEPT" or "## ART DIRECTION"
 *   header. Raw prompt strings without research/concept work are rejected with a
 *   clear error pointing the caller to the design-thinking skill.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import { resolve, dirname, basename, extname } from 'node:path';
import { homedir } from 'node:os';

// ─── Model registry ──────────────────────────────────────────────────────

export const MODELS = {
  nb2:    'gemini-3.1-flash-image-preview',     // Nano Banana 2 — current default
  nbpro:  'gemini-3-pro-image-preview',         // Nano Banana Pro — 4K, premium
  nb1:    'gemini-2.5-flash-image',             // Nano Banana 1 — fallback only
};

// Fallback chain: try nb2 → nbpro → nb1 if a model rejects the call.
const FALLBACK_CHAIN = [MODELS.nb2, MODELS.nbpro, MODELS.nb1];

// ─── API key loading ─────────────────────────────────────────────────────

const ENV_KEY_NAMES = ['GEMINI_API_KEY', 'GOOGLE_GENERATIVE_AI_API_KEY', 'GOOGLE_API_KEY'];

const ENV_FILE_CANDIDATES = [
  // Process env wins (highest priority, e.g. shell export or CI secret)
  // — handled separately in loadApiKey()
  resolve(homedir(), 'Arcanea', '.env.local'),               // confirmed working 2026-04-29
  resolve(homedir(), 'Arcanea', 'arcanea-claw', '.env'),     // legacy, may be expired
  resolve(homedir(), '.claude', 'mcp.json'),                 // legacy NB2 MCP env
  resolve('C:/Users/frank/Arcanea/.env.local'),
  resolve('C:/Users/frank/Arcanea/arcanea-claw/.env'),
  resolve(process.cwd(), '.env.local'),
  resolve(process.cwd(), '.env'),
];

function readEnvValue(file, names) {
  if (!existsSync(file)) return null;
  let content;
  try { content = readFileSync(file, 'utf8'); } catch { return null; }

  // JSON config (e.g. ~/.claude/mcp.json) — extract from env block
  if (file.endsWith('.json')) {
    try {
      const cfg = JSON.parse(content);
      const servers = cfg.mcpServers || {};
      for (const server of Object.values(servers)) {
        const env = server.env || {};
        for (const name of names) if (env[name]) return env[name];
      }
    } catch { /* fall through to plain-text scan */ }
  }

  // Plain-text .env scan
  for (const name of names) {
    const re = new RegExp(`^\\s*${name}\\s*=\\s*(.+)$`, 'm');
    const m = content.match(re);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  }
  return null;
}

export function loadApiKey() {
  // 1. Process env (CI, shell export)
  for (const name of ENV_KEY_NAMES) {
    if (process.env[name]) return { key: process.env[name], source: `process.env.${name}` };
  }
  // 2. Candidate files in order
  for (const f of ENV_FILE_CANDIDATES) {
    const k = readEnvValue(f, ENV_KEY_NAMES);
    if (k) return { key: k, source: f };
  }
  return { key: null, source: null };
}

// ─── Design-thinking gate ────────────────────────────────────────────────

// A prompt has been through the design-thinking 80/20 process if it shows
// evidence of art direction (palette, scene, composition, material, lighting,
// or mood blocks). Single-line prompts with no structure get rejected.
const DESIGN_EVIDENCE_PATTERNS = [
  /##\s+(CONCEPT|ART\s+DIRECTION|SCENE|COMPOSITION|LIGHTING|PALETTE|MOOD|TYPOGRAPHY|STYLE\s+REFERENCES)/i,
  /\bSCENE:\s/i,
  /\bCOMPOSITION:\s/i,
  /\bLIGHTING:\s/i,
  /\bPALETTE:\s/i,
  /\bMOOD:\s/i,
];

function hasDesignThinkingEvidence(prompt) {
  return DESIGN_EVIDENCE_PATTERNS.some((p) => p.test(prompt));
}

// ─── Generation ──────────────────────────────────────────────────────────

const MIME_TO_EXT = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

async function callGemini({ apiKey, model, prompt, aspectRatio, imageSize }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
      imageConfig: { aspectRatio, imageSize },
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) return { ok: false, status: res.status, error: text.slice(0, 1000) };
  try {
    return { ok: true, data: JSON.parse(text) };
  } catch {
    return { ok: false, status: res.status, error: 'non-JSON response' };
  }
}

/**
 * Generate an image and write it to disk. Returns metadata.
 *
 * @param {object} opts
 * @param {string} opts.prompt          - The art-directed prompt (must pass design-thinking gate by default)
 * @param {string} opts.outputPath      - Absolute target path. Extension is OVERRIDDEN by inlineData.mimeType.
 * @param {string} [opts.model='nb2']   - 'nb2' | 'nbpro' | 'nb1' | full Gemini model ID
 * @param {string} [opts.aspectRatio]   - '2:3' (book covers), '16:9' (heroes), '1:1' (square), '4:3', etc.
 * @param {string} [opts.imageSize='2K']- '1K' | '2K' | '4K'
 * @param {boolean} [opts.enforceDesignThinking=true]
 * @param {boolean} [opts.fallback=true] - Try nbpro then nb1 if requested model fails
 * @param {boolean} [opts.backupExisting=true] - Rename existing target to *.LEGACY.<ext> before writing
 * @param {boolean} [opts.verbose=true]
 *
 * @returns {Promise<{ path: string, model: string, mimeType: string, bytes: number, source: string }>}
 */
export async function generateImage(opts) {
  const {
    prompt,
    outputPath,
    model = 'nb2',
    aspectRatio = '2:3',
    imageSize = '2K',
    enforceDesignThinking = true,
    fallback = true,
    backupExisting = true,
    verbose = true,
  } = opts;

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('generateImage: prompt is required (string)');
  }
  if (!outputPath) {
    throw new Error('generateImage: outputPath is required (absolute path)');
  }

  if (enforceDesignThinking && !hasDesignThinkingEvidence(prompt)) {
    throw new Error(
      'generateImage: prompt has not passed the design-thinking 80/20 gate.\n' +
      '  Required: at least one of ## CONCEPT / ## ART DIRECTION / ## SCENE / ## COMPOSITION /\n' +
      '            ## LIGHTING / ## PALETTE / ## MOOD / ## TYPOGRAPHY / ## STYLE REFERENCES\n' +
      '  See: .claude/skills/design-thinking/SKILL.md\n' +
      '  Override with enforceDesignThinking: false ONLY for prototype iterations.'
    );
  }

  const { key: apiKey, source } = loadApiKey();
  if (!apiKey) {
    throw new Error(
      'generateImage: no Gemini API key found.\n' +
      '  Searched process.env (GEMINI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, GOOGLE_API_KEY)\n' +
      '  and: ' + ENV_FILE_CANDIDATES.join(', ')
    );
  }
  if (verbose) console.error(`✓ API key from: ${source}`);

  const requestedModel = MODELS[model] || model;
  const modelChain = fallback
    ? [requestedModel, ...FALLBACK_CHAIN.filter((m) => m !== requestedModel)]
    : [requestedModel];

  let result = null;
  let chosenModel = null;
  let lastError = null;
  for (const m of modelChain) {
    if (verbose) console.error(`→ trying: ${m}`);
    const r = await callGemini({ apiKey, model: m, prompt, aspectRatio, imageSize });
    if (r.ok) {
      result = r.data;
      chosenModel = m;
      if (verbose) console.error(`✓ accepted by: ${m}`);
      break;
    }
    lastError = `${r.status}: ${r.error.slice(0, 200)}`;
    if (verbose) console.error(`  ✗ ${lastError}`);
  }
  if (!result) {
    throw new Error(`generateImage: all models rejected the request. Last error: ${lastError}`);
  }

  // Extract inline image
  let inline = null;
  for (const c of result.candidates || []) {
    for (const part of c.content?.parts || []) {
      if (part.inlineData?.data) { inline = part.inlineData; break; }
    }
    if (inline) break;
  }
  if (!inline) {
    throw new Error('generateImage: response had no inlineData. Response: ' + JSON.stringify(result).slice(0, 800));
  }

  // Derive extension from mimeType (per the FrankX rule: never hardcode .png from slug)
  const mime = inline.mimeType || 'image/png';
  const ext = MIME_TO_EXT[mime] || mime.split('/')[1] || 'bin';
  const finalPath = outputPath.replace(/\.[a-z]+$/i, '') + '.' + ext;
  const dir = dirname(finalPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  // Backup pre-existing file if it differs in extension or content (rare but safe)
  if (backupExisting && outputPath !== finalPath && existsSync(outputPath)) {
    const legacyName = outputPath.replace(/\.([a-z]+)$/i, '.LEGACY.$1');
    if (!existsSync(legacyName)) {
      renameSync(outputPath, legacyName);
      if (verbose) console.error(`✓ backed up legacy file → ${legacyName}`);
    }
  }

  const buffer = Buffer.from(inline.data, 'base64');
  writeFileSync(finalPath, buffer);
  if (verbose) console.error(`✓ saved: ${finalPath} (${buffer.length} bytes, ${mime})`);

  return {
    path: finalPath,
    model: chosenModel,
    mimeType: mime,
    bytes: buffer.length,
    source,
  };
}

// ─── List available models (debug helper) ────────────────────────────────

export async function listImageModels() {
  const { key } = loadApiKey();
  if (!key) throw new Error('listImageModels: no API key');
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  return (data.models || [])
    .filter((m) => /image|nano|banana/i.test(m.name + ' ' + (m.displayName || '')))
    .map((m) => ({ name: m.name.replace(/^models\//, ''), display: m.displayName }));
}
