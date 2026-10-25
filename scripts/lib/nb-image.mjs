/**
// Canonical source: frankxai/FrankX scripts/lib/nb-image.mjs — edit it there, then copy down.
// A copy lives here because lib/gen and lib/visual-intelligence consume it directly.
 * scripts/lib/nb-image.mjs
 *
 * Single source of truth for FrankX image generation + InfoGenius v5.1 pipeline
 * (Google Search Grounding → Knowledge Prompt → Nano Banana 2/Pro Image + Veo 3.1 Video + Gemini TTS Narration).
 *
 * Model defaults (verified via ListModels):
 *   - 'nb2'    →  gemini-3.1-flash-image-preview  (Nano Banana 2)   ← default
 *   - 'nbpro'  →  gemini-3-pro-image-preview      (Nano Banana Pro, premium hero shots & infographics)
 *   - 'nb1'    →  gemini-2.5-flash-image          (Nano Banana, fallback only)
 *   - 'research'→ gemini-2.5-flash                (Google Search grounded fact extraction)
 *   - 'veo'    →  veo-3.1-fast-generate-preview   (7s 720p cinematic infographic motion)
 *   - 'tts'    →  gemini-2.5-flash-preview-tts    (Spoken fact narration, 'Kore' voice)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { homedir } from 'node:os';

// ─── Model registry ──────────────────────────────────────────────────────

export const MODELS = {
  nb2:      'gemini-3.1-flash-image-preview',     // Nano Banana 2 — current default
  nbpro:    'gemini-3-pro-image-preview',         // Nano Banana Pro — 4K, premium infographics
  nb1:      'gemini-2.5-flash-image',             // Nano Banana 1 — fallback only
  research: 'gemini-2.5-flash',                   // Grounded web research
  researchPro: 'gemini-3-pro-preview',            // Deep grounded Visual Architect
  veo:      'veo-3.1-fast-generate-preview',      // Veo 3.1 fast motion synthesis
  tts:      'gemini-2.5-flash-preview-tts',       // Gemini TTS narration
  openrouterResearch: 'google/gemini-2.5-flash:online', // OpenRouter web-grounded research
  openrouterImage: 'google/gemini-2.5-flash-image-preview', // OpenRouter Nano Banana image gen
  vercelGatewayResearch: 'perplexity/sonar-pro', // Vercel AI Gateway grounded web research
  vercelGatewayFallbackResearch: 'google/gemini-2.5-flash', // Vercel AI Gateway Gemini research
  vercelGatewayImage: 'google/gemini-2.5-flash-image-preview', // Vercel AI Gateway Gemini image gen
};

// Fallback chain: try nb2 → nbpro → nb1 if a model rejects the call.
const FALLBACK_CHAIN = [MODELS.nb2, MODELS.nbpro, MODELS.nb1];

// ─── InfoGenius v5.1 Styles & Audiences ──────────────────────────────────

export const STYLES_V5 = {
  standard: {
    name: 'Scientific Illustration',
    instruction: 'High-quality digital scientific illustration. Clean, modern, highly detailed. Professional color palette. Clear visual hierarchy with labeled components.',
  },
  minimalist: {
    name: 'Bauhaus Minimalist',
    instruction: 'Bauhaus Minimalist. Flat vector art, limited color palette (2-3 colors), reliance on negative space and simple geometric shapes. Information conveyed through spatial relationships.',
  },
  photorealistic: {
    name: 'Photorealistic',
    instruction: 'Photorealistic Composite. Cinematic lighting, 8K resolution, highly detailed textures. Looks like a photograph with annotated overlays.',
  },
  '3d': {
    name: '3D Isometric',
    instruction: '3D Isometric Render. Claymorphism or high-gloss plastic texture, studio lighting, soft shadows, looks like a physical model. Components clearly separated and labeled.',
  },
  technical: {
    name: 'Technical Blueprint',
    instruction: 'Da Vinci Notebook style. Ink on parchment sketch, handwritten annotation style, rough but accurate lines, technical precision. Dense with labels and cross-references.',
  },
  futuristic: {
    name: 'Cyberpunk HUD',
    instruction: 'Restrained Tech HUD. Glowing neon blue/cyan lines on dark background, holographic data visualization, 3D wireframes. Data panels and readouts integrated into design.',
  },
  vintage: {
    name: 'Scientific Lithograph',
    instruction: '19th Century Scientific Lithograph. Engraving style, sepia tones, textured paper background, fine hatch lines. Detailed labels in period-appropriate typography.',
  },
  cartoon: {
    name: 'Educational Comic',
    instruction: 'Educational Comic. Vibrant colors, thick outlines, expressive cel-shaded style, engaging and fun. Information made approachable through visual storytelling.',
  },
  glassmorphic: {
    name: 'Premium 3D Glassmorphism',
    instruction: 'Premium 3D Glassmorphic Infographic. Dark void background (#0b0e14). All information displayed on frosted translucent glass panels floating at different depths. Key concepts rendered as 3D crystal/glass nodes connected by thin luminous teal (#7fffd4) threads. Dramatic directional spotlight from upper-left creating teal rim lighting on all glass surfaces. Gold (#ffd700) accents on highlights. Clean white sans-serif labels on every element. Maximum 3 accent colors. Professional data visualization meets luxury 3D rendering. NOT flat, NOT HUD overlay, NOT cyberpunk, NOT clay. Ultra-high detail, studio quality.',
  },
  premium: {
    name: 'Luxury Brand Visual',
    instruction: 'Luxury tech-brand visual. Apple meets Dior meets DeepMind. Dark void background (#0b0e14). One striking crystal/glass focal element at center with dramatic volumetric lighting. Data and labels on frosted glass cards orbiting the focal point. Thin luminous teal (#7fffd4) connection threads forming constellation pattern. Gold (#ffd700) warm accent highlights. Ultra-clean typography in thin modern serif. 50%+ negative space. Materials: crystal, glass, titanium, light. NEVER clay, plastic, HUD, or clutter. 8K detail.',
  },
};

export const AUDIENCES_V5 = {
  elementary: {
    label: 'Ages 6-10',
    instruction: 'Target: Ages 6-10. Bright, simple, fun. Large clear icons and minimal text labels. Use simple words. Maximum 3-4 visual elements.',
    density: 'minimal',
  },
  highschool: {
    label: 'High School',
    instruction: 'Target: High School. Standard textbook style. Clean lines, clear labels, accurate diagrams. 5-8 visual elements with explanatory labels.',
    density: 'moderate',
  },
  college: {
    label: 'University',
    instruction: 'Target: University. Academic journal style. High detail, data-rich, precise schematics. Include statistics, proper terminology, interconnected systems.',
    density: 'high',
  },
  expert: {
    label: 'Industry Expert',
    instruction: 'Target: Industry Expert. Technical blueprint. Extremely dense detail, precise annotations, industry-standard notation, maximum information per pixel.',
    density: 'maximum',
  },
};

// ─── API key loading (Env → .starlight/.env → Infisical CLI + OpenRouter) ─

const ENV_KEY_NAMES = ['GEMINI_API_KEY', 'GOOGLE_GENERATIVE_AI_API_KEY', 'GOOGLE_API_KEY'];
const OPENROUTER_KEY_NAMES = ['OPENROUTER_API_KEY'];
const VERCEL_GATEWAY_KEY_NAMES = ['AI_GATEWAY_API_KEY', 'VERCEL_AI_GATEWAY_KEY', 'VERCEL_OIDC_TOKEN'];
const INFISICAL_PROJECT_ID = process.env.STARLIGHT_INFISICAL_PROJECT_ID || '6e39a7d9-be07-4f58-babb-0cf650321feb';
const INFISICAL_ENV = process.env.STARLIGHT_INFISICAL_ENV || 'dev';

const ENV_FILE_CANDIDATES = [
  resolve(process.cwd(), '.env.local'),
  resolve(process.cwd(), '.env'),
  resolve(homedir(), '.starlight', '.env'),
  resolve('C:/Users/frank/.starlight/.env'),
  resolve('C:/Users/frank/starlight/.env'),
  resolve('C:/Users/frank/starlight/repos/frankx.ai-vercel-website/.env.local'),
  resolve('C:/Users/frank/starlight/repos/FrankX/.env.local'),
  resolve('C:/Users/frank/starlight/repos/infogenius/.env.local'),
  resolve('C:/Users/frank/starlight/repos/arcanea-infogenius/.env'),
  resolve(homedir(), 'Arcanea', '.env.local'),
  resolve(homedir(), 'Arcanea', 'arcanea-claw', '.env'),
  resolve(homedir(), '.claude', 'mcp.json'),
];

const infisicalMemo = new Map();

function readInfisicalSecret(secretName) {
  if (process.env.INFOGENIUS_DISABLE_INFISICAL === '1') return null;
  if (infisicalMemo.has(secretName)) return infisicalMemo.get(secretName);
  try {
    const out = execFileSync(
      'infisical',
      [
        'secrets',
        'get',
        secretName,
        '--plain',
        '--silent',
        `--projectId=${INFISICAL_PROJECT_ID}`,
        `--env=${INFISICAL_ENV}`,
      ],
      { encoding: 'utf8', timeout: 4500, stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    const valid = out && !out.startsWith('<') && !out.startsWith('your-') ? out : null;
    infisicalMemo.set(secretName, valid);
    return valid;
  } catch {
    infisicalMemo.set(secretName, null);
    return null;
  }
}

function readEnvValue(file, names) {
  if (!existsSync(file)) return null;
  let content;
  try { content = readFileSync(file, 'utf8'); } catch { return null; }

  if (file.endsWith('.json')) {
    try {
      const cfg = JSON.parse(content);
      const servers = cfg.mcpServers || {};
      for (const server of Object.values(servers)) {
        const env = server.env || {};
        for (const name of names) if (env[name]) return env[name];
      }
    } catch { /* fall through */ }
  }

  for (const name of names) {
    const re = new RegExp(`^\\s*${name}\\s*=\\s*(.+)$`, 'm');
    const m = content.match(re);
    if (m) {
      const val = m[1].trim().replace(/^["']|["']$/g, '');
      if (val && !val.startsWith('<') && !val.startsWith('your-')) return val;
    }
  }
  return null;
}

export function loadApiKey({ allowInfisical = true } = {}) {
  for (const name of ENV_KEY_NAMES) {
    const v = process.env[name]?.trim();
    if (v && !v.startsWith('<') && !v.startsWith('your-')) {
      return { key: v, source: `process.env.${name}`, provider: 'google' };
    }
  }
  for (const f of ENV_FILE_CANDIDATES) {
    const k = readEnvValue(f, ENV_KEY_NAMES);
    // Skip legacy expired AQ.A Vertex short token if another source exists
    if (k && !k.startsWith('AQ.Ab8')) {
      return { key: k, source: f, provider: 'google' };
    }
  }
  if (allowInfisical) {
    for (const name of ENV_KEY_NAMES) {
      const ik = readInfisicalSecret(name);
      if (ik) {
        return { key: ik, source: `infisical:${INFISICAL_ENV}/${name}`, provider: 'google' };
      }
    }
  }
  return { key: null, source: null, provider: null };
}

export function loadOpenRouterKey({ allowInfisical = true } = {}) {
  for (const name of OPENROUTER_KEY_NAMES) {
    const v = process.env[name]?.trim();
    if (v && !v.startsWith('<') && !v.startsWith('your-')) {
      return { key: v, source: `process.env.${name}`, provider: 'openrouter' };
    }
  }
  for (const f of ENV_FILE_CANDIDATES) {
    const k = readEnvValue(f, OPENROUTER_KEY_NAMES);
    if (k) return { key: k, source: f, provider: 'openrouter' };
  }
  if (allowInfisical) {
    const ik = readInfisicalSecret('OPENROUTER_API_KEY');
    if (ik) return { key: ik, source: `infisical:${INFISICAL_ENV}/OPENROUTER_API_KEY`, provider: 'openrouter' };
  }
  return { key: null, source: null, provider: null };
}

export function loadVercelGatewayKey({ allowInfisical = true } = {}) {
  for (const name of VERCEL_GATEWAY_KEY_NAMES) {
    const v = process.env[name]?.trim();
    if (v && !v.startsWith('<') && !v.startsWith('your-')) {
      return { key: v, source: `process.env.${name}`, provider: 'vercel' };
    }
  }
  for (const f of ENV_FILE_CANDIDATES) {
    const k = readEnvValue(f, VERCEL_GATEWAY_KEY_NAMES);
    if (k) return { key: k, source: f, provider: 'vercel' };
  }
  if (allowInfisical) {
    for (const name of ['AI_GATEWAY_API_KEY', 'VERCEL_AI_GATEWAY_KEY']) {
      const ik = readInfisicalSecret(name);
      if (ik) return { key: ik, source: `infisical:${INFISICAL_ENV}/${name}`, provider: 'vercel' };
    }
  }
  return { key: null, source: null, provider: null };
}

export function resolveProviderCredentials({ preferredProvider = 'auto', explicitKey } = {}) {
  if (explicitKey) {
    const isOr = explicitKey.startsWith('sk-or-');
    const isVercel = explicitKey.startsWith('vck_') || preferredProvider === 'vercel';
    return {
      provider: isVercel ? 'vercel' : isOr ? 'openrouter' : 'google',
      key: explicitKey,
      source: 'explicit',
    };
  }
  if (preferredProvider === 'vercel') {
    const vCred = loadVercelGatewayKey();
    if (vCred.key) return vCred;
  }
  if (preferredProvider === 'openrouter') {
    const orCred = loadOpenRouterKey();
    if (orCred.key) return orCred;
  }
  const googleCred = loadApiKey();
  if (googleCred.key) return googleCred;

  const vCred = loadVercelGatewayKey();
  if (vCred.key) return vCred;

  const orCred = loadOpenRouterKey();
  if (orCred.key) return orCred;

  return { provider: null, key: null, source: null };
}

// ─── Design-thinking gate ────────────────────────────────────────────────

const DESIGN_EVIDENCE_PATTERNS = [
  /##\s+(CONCEPT|ART\s+DIRECTION|SCENE|COMPOSITION|LIGHTING|PALETTE|MOOD|TYPOGRAPHY|STYLE\s+REFERENCES)/i,
  /\bSCENE:\s/i,
  /\bCOMPOSITION:\s/i,
  /\bLIGHTING:\s/i,
  /\bPALETTE:\s/i,
  /\bMOOD:\s/i,
  /\bVISUAL\s+STYLE:\s/i,
];

function hasDesignThinkingEvidence(prompt) {
  return DESIGN_EVIDENCE_PATTERNS.some((p) => p.test(prompt));
}

// ─── Step 1: Grounded Research & Visual Knowledge Architect ──────────────

function extractNumberedSection(text, sectionName) {
  const regex = new RegExp(`${sectionName}:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, 'i');
  const match = text.match(regex);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map((line) => line.replace(/^(?:\d+\.|-|\*)\s*/, '').replace(/^\[|\]$/g, '').trim())
    .filter((line) => line.length > 0 && !line.startsWith('['));
}

export function composeInfographicPrompt({
  topic,
  research,
  styleName = 'glassmorphic',
  styleInstruction,
  audience = 'college',
  aspectRatio = '16:9',
  label,
}) {
  const styleObj = STYLES_V5[styleName] || STYLES_V5.glassmorphic;
  const resolvedStyleInstruction = styleInstruction || styleObj.instruction;
  const audienceKey = audience.toLowerCase().replace(/\s+/g, '');
  const audienceObj = AUDIENCES_V5[audienceKey] || AUDIENCES_V5.college;

  const factsBlock = (research.facts || []).map((f) => `- ${f}`).join('\n');
  const visualBlock = (research.visualElements || []).map((v) => `- ${v}`).join('\n');
  const labelsBlock = (research.labels || []).map((l) => `"${l}"`).join(', ');

  let prompt = `## CONCEPT
Create a ${aspectRatio} educational infographic about: ${topic}

VISUAL STYLE: ${resolvedStyleInstruction}

AUDIENCE: ${audienceObj.instruction}

KNOWLEDGE TO VISUALIZE (these are researched facts — each must be represented visually):
${factsBlock}

VISUAL ELEMENTS TO INCLUDE:
${visualBlock}

REQUIRED LABELS AND TEXT (render clearly and legibly):
${labelsBlock}

COMPOSITION:
- Clear visual hierarchy — most important information largest and most prominent
- Logical flow — viewer's eye should follow the information in order
- All text must be perfectly spelled, large enough to read, with high contrast
- Include directional arrows or flow indicators where relationships exist
- White space between sections for clarity
- Professional color coding to distinguish different categories of information

QUALITY: Render at maximum quality. Sharp detail, no artifacts. Every label must be perfectly legible. This is an educational tool, not decoration — clarity and accuracy matter above all.`;

  if (label) {
    prompt += `\n\nTITLE: Render "${label}" as a prominent title at the top of the infographic in a clean, modern font.`;
  }

  return prompt;
}

/**
 * Research a topic using Gemini with Google Search grounding (ported from AI Studio InfoGenius + v5.1 MCP).
 * Extracts verified facts, visual elements, required labels, context, imagePrompt, videoPrompt, and web sources.
 */
export async function researchTopicForPrompt({
  topic,
  audience = 'college',
  style = 'glassmorphic',
  styleInstruction,
  language = 'English',
  aspectRatio = '16:9',
  label,
  model,
  provider: preferredProvider = 'auto',
  apiKey: explicitKey,
  verbose = true,
}) {
  const cred = resolveProviderCredentials({ preferredProvider, explicitKey });
  if (!cred.key) {
    throw new Error('researchTopicForPrompt: no GEMINI_API_KEY or OPENROUTER_API_KEY found (checked env, .starlight/.env, Infisical).');
  }

  const audienceKey = audience.toLowerCase().replace(/\s+/g, '');
  const audienceLevel = AUDIENCES_V5[audienceKey] || AUDIENCES_V5.college;
  const styleObj = STYLES_V5[style] || STYLES_V5.glassmorphic;
  const resolvedStyleInstr = styleInstruction || styleObj.instruction;
  const orientation = aspectRatio === '9:16' ? 'Portrait (vertical)' : aspectRatio === '1:1' ? 'Square' : 'Landscape (horizontal)';

  const researchPrompt = `You are a Master Visual Knowledge Architect. Research this topic thoroughly using Google Search and extract the essential knowledge needed to create an educational infographic and a companion motion clip.

TOPIC: "${topic}"
LANGUAGE: ${language}
AUDIENCE: ${audienceLevel.label} (${audienceLevel.density} information density — ${audienceLevel.instruction})
AESTHETIC: ${styleObj.name} (${resolvedStyleInstr})
LAYOUT: Optimized for ${orientation} (${aspectRatio}) orientation.

Respond in EXACTLY this structured format:

FACTS:
1. [Most important verified fact - include specific numbers/2026 data when available]
2. [Second key verified fact]
3. [Third key verified fact]
4. [Fourth key fact if density is high/maximum]
5. [Fifth key fact if density is maximum]

VISUAL_ELEMENTS:
1. [Primary diagram/visualization element to include, e.g., "Flow diagram showing X connecting to Y"]
2. [Secondary visual element, e.g., "Comparison chart of A vs B"]
3. [Supporting visual, e.g., "Cross-section showing internal structure"]
4. [Additional element if density warrants]

LABELS:
1. [Key term or label that MUST appear on the infographic]
2. [Second critical label]
3. [Third label]
4. [Fourth label if needed]

CONTEXT:
[One paragraph explaining WHY this topic matters and what the viewer should understand after seeing this infographic]

VIDEO_PROMPT:
[Cinematic prompt for a 7-second motion sequence animating the core mechanism of this infographic in ${styleObj.name} style]`;

  let text = '';
  const searchResults = [];
  let usedModel = '';

  if (cred.provider === 'openrouter' || cred.provider === 'vercel') {
    const isVercel = cred.provider === 'vercel';
    usedModel =
      model ||
      (isVercel
        ? process.env.INFOGENIUS_VERCEL_RESEARCH_MODEL || MODELS.vercelGatewayResearch
        : process.env.INFOGENIUS_OPENROUTER_RESEARCH_MODEL || MODELS.openrouterResearch);
    const endpoint = isVercel
      ? 'https://ai-gateway.vercel.sh/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';
    if (verbose) {
      console.error(
        `→ [RESEARCH/${isVercel ? 'Vercel-AI-Gateway' : 'OpenRouter'}] Grounding "${topic}" via ${usedModel} (key: ${cred.source})...`
      );
    }
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cred.key}`,
        'HTTP-Referer': 'https://frankx.ai',
        'X-Title': 'FrankX InfoGenius v5.2',
      },
      body: JSON.stringify({
        model: usedModel,
        messages: [{ role: 'user', content: researchPrompt }],
      }),
    });
    const rawText = await res.text();
    if (!res.ok) {
      throw new Error(`researchTopicForPrompt (${cred.provider}) failed (${res.status}): ${rawText.slice(0, 500)}`);
    }
    const data = JSON.parse(rawText);
    const msg = data.choices?.[0]?.message;
    text = typeof msg?.content === 'string' ? msg.content : '';
    for (const c of data.citations || []) {
      if (typeof c === 'string') {
        searchResults.push({ title: c, url: c });
      }
    }
    for (const ann of msg?.annotations || []) {
      const citation = ann?.url_citation;
      if (citation?.url) {
        searchResults.push({
          title: citation.title || citation.url,
          url: citation.url,
        });
      }
    }
  } else {
    usedModel = model || process.env.INFOGENIUS_RESEARCH_MODEL || MODELS.research;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${usedModel}:generateContent?key=${cred.key}`;

    if (verbose) console.error(`→ [RESEARCH/Gemini] Grounding "${topic}" via ${usedModel} + Google Search (key: ${cred.source})...`);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: researchPrompt }] }],
        tools: [{ googleSearch: {} }],
      }),
    });

    const rawText = await res.text();
    if (!res.ok) {
      throw new Error(`researchTopicForPrompt failed (${res.status}): ${rawText.slice(0, 500)}`);
    }

    const data = JSON.parse(rawText);
    text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('\n') || '';

    const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    for (const chunk of chunks) {
      if (chunk.web?.uri) {
        searchResults.push({
          title: chunk.web.title || chunk.web.uri,
          url: chunk.web.uri,
        });
      }
    }
  }
  const facts = extractNumberedSection(text, 'FACTS');
  const visualElements = extractNumberedSection(text, 'VISUAL_ELEMENTS');
  const labels = extractNumberedSection(text, 'LABELS');
  const contextMatch = text.match(/CONTEXT:\s*\n([\s\S]*?)(?=\n[A-Z_]+:|$)/i);
  const context = contextMatch ? contextMatch[1].trim() : topic;
  const videoMatch = text.match(/VIDEO_PROMPT:\s*\n?([\s\S]*?)$/i);
  const videoPrompt = videoMatch
    ? videoMatch[1].trim()
    : `Cinematic 7-second data visualization animation of ${topic}. ${resolvedStyleInstr}`;

  const uniqueSources = Array.from(new Map(searchResults.map((item) => [item.url, item])).values());

  const resolvedResearch = {
    facts: facts.length > 0 ? facts : [`Key information about ${topic}`],
    visualElements: visualElements.length > 0 ? visualElements : [`Diagram of ${topic}`],
    labels: labels.length > 0 ? labels : [topic],
    context,
    sources: uniqueSources.map((s) => s.url),
    searchResults: uniqueSources,
  };

  const imagePrompt = composeInfographicPrompt({
    topic,
    research: resolvedResearch,
    styleName: style,
    styleInstruction: resolvedStyleInstr,
    audience,
    aspectRatio,
    label,
  });

  if (verbose) {
    console.error(`✓ [RESEARCH] Extracted ${resolvedResearch.facts.length} facts, ${resolvedResearch.visualElements.length} visual elements, ${uniqueSources.length} web citations.`);
  }

  return {
    ...resolvedResearch,
    imagePrompt,
    videoPrompt,
    model: usedModel,
    provider: cred.provider,
  };
}

// ─── Step 2: Image Generation ────────────────────────────────────────────

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

async function callOpenRouterImage({ apiKey, model, prompt, aspectRatio, endpoint = 'https://openrouter.ai/api/v1/chat/completions' }) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://frankx.ai',
      'X-Title': 'FrankX InfoGenius v5.2',
    },
    body: JSON.stringify({
      model: model || MODELS.openrouterImage,
      messages: [{ role: 'user', content: prompt }],
      modalities: ['image', 'text'],
      image_config: { aspect_ratio: aspectRatio },
    }),
  });
  const text = await res.text();
  if (!res.ok) return { ok: false, status: res.status, error: text.slice(0, 1000) };
  try {
    return { ok: true, data: JSON.parse(text) };
  } catch {
    return { ok: false, status: res.status, error: 'non-JSON response' };
  }
}

export async function generateImage(opts) {
  const {
    prompt,
    outputPath,
    model = 'nb2',
    aspectRatio = '2:3',
    imageSize = '2K',
    provider: preferredProvider = 'auto',
    apiKey: explicitKey,
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
      '            ## LIGHTING / ## PALETTE / ## MOOD / ## TYPOGRAPHY / ## STYLE REFERENCES / VISUAL STYLE:\n' +
      '  See: .claude/skills/design-thinking/SKILL.md\n' +
      '  Override with enforceDesignThinking: false ONLY for prototype iterations.'
    );
  }

  const cred = resolveProviderCredentials({ preferredProvider, explicitKey });
  if (!cred.key) {
    throw new Error(
      'generateImage: no Gemini or OpenRouter API key found.\n' +
      '  Searched process.env (GEMINI_API_KEY, OPENROUTER_API_KEY), Infisical, and: ' +
      ENV_FILE_CANDIDATES.join(', ')
    );
  }
  if (verbose) console.error(`✓ API key from: ${cred.source} (provider: ${cred.provider})`);

  let inline = null;
  let chosenModel = null;

  if (cred.provider === 'openrouter' || cred.provider === 'vercel') {
    const isVercel = cred.provider === 'vercel';
    const orModel = model.includes('/')
      ? model
      : isVercel
      ? MODELS.vercelGatewayImage
      : MODELS.openrouterImage;
    const endpoint = isVercel
      ? 'https://ai-gateway.vercel.sh/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';
    if (verbose) console.error(`→ [${isVercel ? 'Vercel-AI-Gateway' : 'OpenRouter'}] trying: ${orModel}`);
    const r = await callOpenRouterImage({ apiKey: cred.key, model: orModel, prompt, aspectRatio, endpoint });
    if (!r.ok) {
      throw new Error(`generateImage (${cred.provider}) failed (${r.status}): ${r.error}`);
    }
    const msg = r.data?.choices?.[0]?.message;
    const dataUrl =
      msg?.images?.[0]?.image_url?.url ||
      (Array.isArray(msg?.content)
        ? msg.content.find((c) => c.type === 'image_url')?.image_url?.url
        : null);
    if (!dataUrl || !dataUrl.startsWith('data:')) {
      throw new Error('generateImage (OpenRouter): response had no base64 image data URL');
    }
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      throw new Error('generateImage (OpenRouter): malformed image data URL');
    }
    inline = { mimeType: match[1], data: match[2] };
    chosenModel = orModel;
  } else {
    const requestedModel = MODELS[model] || model;
    const modelChain = fallback
      ? [requestedModel, ...FALLBACK_CHAIN.filter((m) => m !== requestedModel)]
      : [requestedModel];

    let result = null;
    let lastError = null;
    for (const m of modelChain) {
      if (verbose) console.error(`→ trying: ${m}`);
      const r = await callGemini({ apiKey: cred.key, model: m, prompt, aspectRatio, imageSize });
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

    for (const c of result.candidates || []) {
      for (const part of c.content?.parts || []) {
        if (part.inlineData?.data) { inline = part.inlineData; break; }
      }
      if (inline) break;
    }
    if (!inline) {
      throw new Error('generateImage: response had no inlineData. Response: ' + JSON.stringify(result).slice(0, 800));
    }
  }

  const mime = inline.mimeType || 'image/png';
  const ext = MIME_TO_EXT[mime] || mime.split('/')[1] || 'bin';
  const finalPath = outputPath.replace(/\.[a-z]+$/i, '') + '.' + ext;
  const dir = dirname(finalPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

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
    source: cred.source,
    provider: cred.provider,
  };
}

// ─── Step 3: Veo 3.1 Infographic Video Animation ─────────────────────────

/**
 * Animate an infographic prompt using Veo 3.1 (`veo-3.1-fast-generate-preview`),
 * ported from the Google AI Studio InfoGenius app (`generateInfographicVideo`).
 */
export async function generateInfographicVideo({
  prompt,
  aspectRatio = '16:9',
  outputPath,
  model = MODELS.veo,
  pollIntervalMs = 8000,
  maxPolls = 45,
  apiKey: explicitKey,
  verbose = true,
}) {
  if (!prompt) throw new Error('generateInfographicVideo: prompt is required');
  if (!outputPath) throw new Error('generateInfographicVideo: outputPath is required');

  const { key: loadedKey } = loadApiKey();
  const apiKey = explicitKey || loadedKey;
  if (!apiKey) throw new Error('generateInfographicVideo: no GEMINI_API_KEY found');

  const normalizedAspect = aspectRatio === '1:1' ? '16:9' : aspectRatio;
  const startUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predictLongRunning?key=${apiKey}`;

  if (verbose) console.error(`→ [VEO] Starting video generation via ${model} (${normalizedAspect})...`);

  const startRes = await fetch(startUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        aspectRatio: normalizedAspect,
        sampleCount: 1,
      },
    }),
  });

  const startText = await startRes.text();
  if (!startRes.ok) {
    throw new Error(`generateInfographicVideo start failed (${startRes.status}): ${startText.slice(0, 500)}`);
  }

  let operation = JSON.parse(startText);
  let polls = 0;

  while (!operation.done && polls < maxPolls) {
    polls += 1;
    await new Promise((r) => setTimeout(r, pollIntervalMs));
    const pollUrl = `https://generativelanguage.googleapis.com/v1beta/${operation.name}?key=${apiKey}`;
    const pollRes = await fetch(pollUrl);
    const pollText = await pollRes.text();
    if (!pollRes.ok) {
      throw new Error(`generateInfographicVideo poll failed (${pollRes.status}): ${pollText.slice(0, 500)}`);
    }
    operation = JSON.parse(pollText);
    if (verbose) console.error(`  … [VEO] polling (${polls}/${maxPolls}) done=${Boolean(operation.done)}`);
  }

  if (!operation.done) {
    throw new Error(`generateInfographicVideo timed out after ${maxPolls} polls`);
  }

  const downloadUri =
    operation.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri ||
    operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadUri) {
    throw new Error(`generateInfographicVideo finished with no video URI: ${JSON.stringify(operation).slice(0, 500)}`);
  }

  const sep = downloadUri.includes('?') ? '&' : '?';
  const videoRes = await fetch(`${downloadUri}${sep}key=${apiKey}`);
  if (!videoRes.ok) {
    throw new Error(`generateInfographicVideo download failed (${videoRes.status})`);
  }

  const buffer = Buffer.from(await videoRes.arrayBuffer());
  const finalPath = outputPath.replace(/\.[a-z0-9]+$/i, '') + '.mp4';
  const dir = dirname(finalPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(finalPath, buffer);

  if (verbose) console.error(`✓ [VEO] saved video: ${finalPath} (${buffer.length} bytes)`);

  return {
    path: finalPath,
    model,
    bytes: buffer.length,
    mimeType: 'video/mp4',
  };
}

// ─── Step 4: Gemini TTS Audio Narration ──────────────────────────────────

function wrapPcmInWavHeader(pcmBuffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
  if (pcmBuffer.length >= 4 && pcmBuffer.toString('ascii', 0, 4) === 'RIFF') {
    return pcmBuffer;
  }
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM chunk size
  header.writeUInt16LE(1, 20);  // PCM format = 1
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

/**
 * Generate spoken audio narration of extracted facts using `gemini-2.5-flash-preview-tts`
 * (`Kore` voice by default), ported from the Google AI Studio InfoGenius app (`generateNarration`).
 */
export async function generateNarration({
  facts = [],
  text,
  voiceName = 'Kore',
  outputPath,
  model = MODELS.tts,
  apiKey: explicitKey,
  verbose = true,
}) {
  const narrationText = text || (facts.length ? `Read the following facts clearly and professionally: ${facts.join('. ')}` : '');
  if (!narrationText) throw new Error('generateNarration: facts or text is required');
  if (!outputPath) throw new Error('generateNarration: outputPath is required');

  const { key: loadedKey } = loadApiKey();
  const apiKey = explicitKey || loadedKey;
  if (!apiKey) throw new Error('generateNarration: no GEMINI_API_KEY found');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  if (verbose) console.error(`→ [TTS] Generating narration via ${model} (voice: ${voiceName})...`);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: narrationText }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    }),
  });

  const rawText = await res.text();
  if (!res.ok) {
    throw new Error(`generateNarration failed (${res.status}): ${rawText.slice(0, 500)}`);
  }

  const data = JSON.parse(rawText);
  const inline = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inline?.data) {
    throw new Error('generateNarration: response contained no audio inlineData');
  }

  const rawBuffer = Buffer.from(inline.data, 'base64');
  const wavBuffer = wrapPcmInWavHeader(rawBuffer, 24000, 1, 16);
  const finalPath = outputPath.replace(/\.[a-z0-9]+$/i, '') + '.wav';
  const dir = dirname(finalPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(finalPath, wavBuffer);

  if (verbose) console.error(`✓ [TTS] saved narration: ${finalPath} (${wavBuffer.length} bytes)`);

  return {
    path: finalPath,
    model,
    voiceName,
    bytes: wavBuffer.length,
    mimeType: 'audio/wav',
  };
}

// ─── List available models (debug helper) ────────────────────────────────

export async function listImageModels() {
  const { key } = loadApiKey();
  if (!key) throw new Error('listImageModels: no API key');
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`listImageModels (${res.status}): ${data.error?.message || JSON.stringify(data)}`);
  }
  return (data.models || [])
    .filter((m) => /image|nano|banana|veo|tts/i.test(m.name + ' ' + (m.displayName || '')))
    .map((m) => ({ name: m.name.replace(/^models\//, ''), display: m.displayName }));
}
