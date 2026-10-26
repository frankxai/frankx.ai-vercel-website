import { existsSync, readFileSync } from 'node:fs'
import { NextRequest } from 'next/server'
import {
  CREDIT_COSTS,
  CREDIT_PACK_CATALOG,
  appendTenantGalleryItem,
  consumeTenantCredits,
  getTenantWallet,
  sanitizeTenantId,
  saveTenantBrandPreset,
} from '@/lib/infogenius/tenant-credits'

export const maxDuration = 120

function isExpiredJwt(val: string): boolean {
  if (!val || !val.startsWith('eyJ')) return false
  const parts = val.split('.')
  if (parts.length !== 3) return false
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'))
    if (typeof payload.exp === 'number' && payload.exp * 1000 < Date.now() + 60_000) {
      return true
    }
  } catch {
    return false
  }
  return false
}

function resolveManagedServerCredential(): {
  key: string
  provider: 'vercel' | 'google' | 'openrouter'
} {
  const gatewayKey =
    process.env.AI_GATEWAY_API_KEY?.trim() ||
    process.env.VERCEL_AI_GATEWAY_KEY?.trim() ||
    process.env.VERCEL_OIDC_TOKEN?.trim()
  if (gatewayKey && !isExpiredJwt(gatewayKey)) {
    return { key: gatewayKey, provider: 'vercel' }
  }
  const geminiKey =
    process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()
  if (geminiKey && !geminiKey.startsWith('AQ.Ab8')) {
    return { key: geminiKey, provider: 'google' }
  }
  const orKey = process.env.OPENROUTER_API_KEY?.trim()
  if (orKey) {
    return { key: orKey, provider: 'openrouter' }
  }
  try {
    const localVercelEnv = 'C:/Users/frank/.starlight/.env.vercel'
    if (existsSync(localVercelEnv)) {
      const raw = readFileSync(localVercelEnv, 'utf8')
      const m = raw.match(/^VERCEL_OIDC_TOKEN=(.+)$/m)
      if (m) {
        const token = m[1].trim().replace(/^["']|["']$/g, '')
        if (token && !isExpiredJwt(token)) {
          return { key: token, provider: 'vercel' }
        }
      }
    }
  } catch {
    // ignore local file lookup in cloud
  }
  return { key: '', provider: 'vercel' }
}

export async function GET(req: NextRequest) {
  const format = req.nextUrl.searchParams.get('format')
  const tenantId = sanitizeTenantId(
    req.nextUrl.searchParams.get('tenantId') || req.headers.get('X-Tenant-Id')
  )
  const wallet = await getTenantWallet(tenantId)
  const managed = resolveManagedServerCredential()

  const discovery = {
    version: '5.3.0',
    protocol: 'SIP-Visual-Knowledge-OS',
    openapiUrl: '/api/byok/infogenius?format=openapi',
    brandWorlds: [
      {
        id: 'frankx',
        name: 'FrankX AI Architect',
        buyerPersona: 'CTOs, AI Architects, Solution Engineers & Technical Founders',
        signatureStyles: ['glassmorphic', 'premium', 'da-vinci-technical', '3d-isometric'],
      },
      {
        id: 'starlight',
        name: 'Starlight Sovereign (SIP)',
        buyerPersona: 'Multi-Agent Fleet Operators, MCP Developers & Sovereign AI Teams',
        signatureStyles: [
          'neural-cosmos',
          'cyber-observability',
          'liquid-starlight',
          'sovereign-mesh',
        ],
      },
      {
        id: 'gencreator',
        name: 'GenCreator Publishing OS',
        buyerPersona: 'Newsletter Operators, Content Studios, Executive Ghostwriters & Educators',
        signatureStyles: ['territory-b-editorial', 'coe-blueprint', 'source-to-edition'],
      },
      {
        id: 'arcanea',
        name: 'Arcanea Universe & Academy',
        buyerPersona: 'Worldbuilders, Creative Directors, Game Studios & Lore Architects',
        signatureStyles: ['sacred-geometry', 'illuminated-lore-scroll'],
      },
    ],
    actions: ['architect', 'generate', 'decompose-article', 'narrate', 'save-brand-preset'],
    gatewayRouting: {
      researchChain: ['perplexity/sonar', 'google/gemini-2.5-flash', 'openai/gpt-4.1-mini'],
      imageChain: [
        'google/gemini-3-pro-image',
        'gemini-3-pro-image-preview',
        'gemini-3.1-flash-image-preview',
      ],
      ttsModes: ['solo (Kore)', 'dialogue (MultiSpeakerVoiceConfig: Kore + Fenrir)'],
      vectorOutput: 'Interactive SVG Architecture Blueprint + HUD Code-Overlay',
    },
    mcpTools: [
      'generate_infographic',
      'decompose_article_carousel',
      'narrate_executive_dialogue',
      'animate_infographic_veo',
      'research_topic_grounded',
      'list_brand_presets',
    ],
  }

  if (format === 'openapi') {
    return Response.json({
      openapi: '3.1.0',
      info: {
        title: 'InfoGenius v5.3 Visual Knowledge OS API',
        version: '5.3.0',
        description:
          'Multi-tenant grounded visual synthesis API & MCP backend across FrankX, Starlight, GenCreator, and Arcanea brand worlds.',
      },
      servers: [{ url: 'https://www.frankx.ai' }, { url: 'https://infogenius-three.vercel.app' }],
      paths: {
        '/api/byok/infogenius': {
          get: {
            summary: 'Inspect tenant credit wallet, brand worlds, and MCP/Gateway capabilities',
            parameters: [
              { name: 'tenantId', in: 'query', schema: { type: 'string' } },
              { name: 'format', in: 'query', schema: { type: 'string', enum: ['json', 'openapi'] } },
            ],
          },
          post: {
            summary:
              'Execute grounded research, 2K/4K image synthesis, SVG blueprint generation, 5-slide decomposition, or 2-speaker TTS narration',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      action: {
                        type: 'string',
                        enum: [
                          'architect',
                          'generate',
                          'decompose-article',
                          'narrate',
                          'save-brand-preset',
                        ],
                      },
                      topic: { type: 'string' },
                      articleText: { type: 'string' },
                      style: { type: 'string', enum: Object.keys(STYLES_V5) },
                      audience: { type: 'string', enum: Object.keys(AUDIENCES_V5) },
                      aspectRatio: { type: 'string', enum: ['16:9', '1:1', '9:16'] },
                      imageSize: { type: 'string', enum: ['1K', '2K', '4K'] },
                      narrationMode: { type: 'string', enum: ['solo', 'dialogue'] },
                      tenantId: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  return Response.json({
    success: true,
    wallet,
    creditCosts: CREDIT_COSTS,
    creditPacks: CREDIT_PACK_CATALOG,
    managedGatewayActive: Boolean(managed.key),
    managedProvider: managed.provider,
    discovery,
  })
}

interface StyleDefinition {
  key: string
  name: string
  tag: string
  brandWorld: 'frankx' | 'starlight' | 'gencreator' | 'arcanea' | 'community'
  instruction: string
  palette: string[]
}

const STYLES_V5: Record<string, StyleDefinition> = {
  glassmorphic: {
    key: 'glassmorphic',
    name: 'Premium 3D Glassmorphism',
    tag: 'v5.3 Flagship',
    brandWorld: 'frankx',
    instruction:
      'Premium 3D Glassmorphic Infographic. Dark void background (#0b0e14). All information displayed on frosted translucent glass panels floating at different depths. Key concepts rendered as 3D crystal/glass nodes connected by thin luminous teal (#7fffd4) threads. Dramatic directional spotlight from upper-left creating teal rim lighting on all glass surfaces. Gold (#ffd700) accents on highlights. Clean white sans-serif labels on every element. Maximum 3 accent colors. Professional data visualization meets luxury 3D rendering. NOT flat, NOT HUD overlay, NOT cyberpunk, NOT clay. Ultra-high detail, studio quality.',
    palette: ['#0b0e14', '#7fffd4', '#ffd700', '#ffffff'],
  },
  premium: {
    key: 'premium',
    name: 'Luxury Brand Visual',
    tag: 'v5.3 Flagship',
    brandWorld: 'frankx',
    instruction:
      'Luxury tech-brand visual. Apple meets Dior meets DeepMind. Dark void background (#0b0e14). One striking crystal/glass focal element at center with dramatic volumetric lighting. Data and labels on frosted glass cards orbiting the focal point. Thin luminous teal (#7fffd4) connection threads forming constellation pattern. Gold (#ffd700) warm accent highlights. Ultra-clean typography in thin modern serif. 50%+ negative space. Materials: crystal, glass, titanium, light. NEVER clay, plastic, HUD, or clutter. 8K detail.',
    palette: ['#0b0e14', '#7fffd4', '#ffd700', '#e2e8f0'],
  },
  'da-vinci-technical': {
    key: 'da-vinci-technical',
    name: 'Da Vinci Technical',
    tag: 'FrankX Signature',
    brandWorld: 'frankx',
    instruction:
      'Leonardo da Vinci notebook style on dark obsidian parchment (#0a0f1c), warm sepia and gold ink sketches (#f59e0b, #fbbf24) with cyan callout lines (#06b6d4), technical diagrams, exploded views, and crisp architectural annotations in Inter and JetBrains Mono.',
    palette: ['#0a0f1c', '#f59e0b', '#06b6d4', '#f8fafc'],
  },
  '3d-isometric': {
    key: '3d-isometric',
    name: '3D Isometric Studio',
    tag: 'FrankX Signature',
    brandWorld: 'frankx',
    instruction:
      'Clean isometric 3D blocks on deep obsidian (#0a0f1c), modern glassmorphic UI layers, soft studio lighting, emerald (#10b981) and cyan (#06b6d4) accents, clearly separated and labeled system modules.',
    palette: ['#0a0f1c', '#10b981', '#06b6d4', '#f8fafc'],
  },
  'neural-cosmos': {
    key: 'neural-cosmos',
    name: 'Starlight Neural Cosmos',
    tag: 'Starlight SIP',
    brandWorld: 'starlight',
    instruction:
      'Starlight Intelligence Systems Neural Cosmos Infographic. Deep navy void background (#050B14). Six semantic memory vaults rendered as luminous crystalline astrolabe nodes connected by precision cyber-cyan (#00E5FF) and frontier-violet (#8B5CF6) optical conduits. Key human governance gates highlighted in warm Starlight Gold (#FCD34D). Crisp Instrument Sans and IBM Plex Mono typography.',
    palette: ['#050b14', '#00e5ff', '#fcd34d', '#ffffff'],
  },
  'cyber-observability': {
    key: 'cyber-observability',
    name: 'Starlight Cyber Observability',
    tag: 'Starlight Operator',
    brandWorld: 'starlight',
    instruction:
      'Starlight Operator Observability Schematic. Deep obsidian-navy background (#050B14) with precision telemetry grid. Maker and Independent Verifier execution lanes displayed as structured frosted operator panels with emerald (#10B981) pass badges, cyber cyan (#00E5FF) data streams, and starlight gold (#FCD34D) human approval gates.',
    palette: ['#050b14', '#00e5ff', '#10b981', '#fcd34d'],
  },
  'liquid-starlight': {
    key: 'liquid-starlight',
    name: 'Liquid Starlight Horizon',
    tag: 'Starlight Horizon',
    brandWorld: 'starlight',
    instruction:
      'Liquid Starlight Horizon Visual. Deep cosmos background (#050B14) with sculptural refractive liquid-crystal conduits carrying luminous aquamarine (#7FFFD4) and warm starlight gold (#FCD34D) light streams. Frosted glass callout plates with crisp white Instrument Sans labels.',
    palette: ['#050b14', '#7fffd4', '#fcd34d', '#ffffff'],
  },
  'sovereign-mesh': {
    key: 'sovereign-mesh',
    name: 'Starlight Sovereign Mesh',
    tag: 'Starlight Protocol',
    brandWorld: 'starlight',
    instruction:
      'Starlight Sovereign Agent Mesh Blueprint. Isometric multi-node network on deep navy (#050B14) showing isolated agent worktrees, central Memory Gateway, and SIP cryptographic attestation locks in cyan (#00E5FF) and gold (#FCD34D).',
    palette: ['#050b14', '#00e5ff', '#fcd34d', '#e2e8f0'],
  },
  'territory-b-editorial': {
    key: 'territory-b-editorial',
    name: 'Territory B Editorial Print',
    tag: 'GenCreator Flagship',
    brandWorld: 'gencreator',
    instruction:
      'GenCreator Territory B Editorial Print Infographic. Warm archival paper background (#FBF9F5) with ultra-crisp deep carbon ink (#221F1B) hairline Swiss grid, technical diagrams, and Instrument Serif + Instrument Sans editorial typography. Single selective Spot Red (#C8322A) accent used for edition numbers, verification stamps, and focal flow. Stripe Press meets Monocle aesthetic.',
    palette: ['#fbf9f5', '#c8322a', '#221f1b', '#221f1b'],
  },
  'coe-blueprint': {
    key: 'coe-blueprint',
    name: 'GenCreator 6-Pillar CoE',
    tag: 'GenCreator Enterprise',
    brandWorld: 'gencreator',
    instruction:
      'Enterprise AI Center of Excellence schematic. Six-pillar architecture layout on dark navy (#0a0f1c), crisp vector swimlanes, emerald (#10b981), cyan (#06b6d4), and violet (#8b5cf6) subsystem badges, governance gates, and telemetry callouts.',
    palette: ['#0a0f1c', '#10b981', '#06b6d4', '#f8fafc'],
  },
  'source-to-edition': {
    key: 'source-to-edition',
    name: 'Source-to-Edition Workflow',
    tag: 'GenCreator Pipeline',
    brandWorld: 'gencreator',
    instruction:
      'GenCreator Source-to-Edition Workflow Diagram. Warm editorial paper (#FBF9F5) and deep ink (#221F1B) with Spot Red (#C8322A) pipeline connectors and emerald (#10B981) verification checkmarks.',
    palette: ['#fbf9f5', '#c8322a', '#10b981', '#221f1b'],
  },
  'sacred-geometry': {
    key: 'sacred-geometry',
    name: 'Arcanea Sacred Geometry',
    tag: 'Arcanea Canon',
    brandWorld: 'arcanea',
    instruction:
      'Arcanea Sacred Geometry Codex Infographic. Deep cosmic void background (#0B0E14). Golden-ratio astrolabe rings and sacred geometric polyhedra in luminous Arcanean Gold (#FFD700) and Atlantean Teal (#00BCD4) with aquamarine (#7FFFD4) harmonic nodes. Clean Geist and Instrument Serif labels.',
    palette: ['#0b0e14', '#00bcd4', '#ffd700', '#ffffff'],
  },
  'illuminated-lore-scroll': {
    key: 'illuminated-lore-scroll',
    name: 'Arcanea Illuminated Codex',
    tag: 'Arcanea Lore',
    brandWorld: 'arcanea',
    instruction:
      'Arcanea Illuminated Codex Scroll. Dark obsidian vellum background (#0B0E14) framed with intricate gold-leaf (#FFD700) geometric filigree and Atlantean teal (#00BCD4) crystal inlays. Crisp parchment-white (#F4ECE1) serif annotations.',
    palette: ['#0b0e14', '#ffd700', '#00bcd4', '#f4ece1'],
  },
  standard: {
    key: 'standard',
    name: 'Scientific Illustration',
    tag: 'Editorial',
    brandWorld: 'community',
    instruction:
      'High-quality digital scientific illustration. Clean, modern, highly detailed. Professional color palette. Clear visual hierarchy with labeled components.',
    palette: ['#0f172a', '#38bdf8', '#22c55e', '#f8fafc'],
  },
  minimalist: {
    key: 'minimalist',
    name: 'Bauhaus Minimalist',
    tag: 'Swiss Grid',
    brandWorld: 'community',
    instruction:
      'Bauhaus Minimalist. Flat vector art, limited color palette (2-3 colors), reliance on negative space and simple geometric shapes. Information conveyed through spatial relationships.',
    palette: ['#111111', '#e63946', '#f4a261', '#f1faee'],
  },
  photorealistic: {
    key: 'photorealistic',
    name: 'Photorealistic Composite',
    tag: '8K Optical',
    brandWorld: 'community',
    instruction:
      'Photorealistic Composite. Cinematic lighting, 8K resolution, Hasselblad 50mm f/2.8 depth of field, highly detailed textures with precision callout overlays.',
    palette: ['#090d16', '#38bdf8', '#f59e0b', '#ffffff'],
  },
  futuristic: {
    key: 'futuristic',
    name: 'Focused Futuristic HUD',
    tag: 'Telemetry',
    brandWorld: 'community',
    instruction:
      'Restrained Tech HUD. Glowing cyan and emerald data lines on dark obsidian background, holographic data visualization, 3D wireframes. Data panels and readouts integrated cleanly.',
    palette: ['#050811', '#00f5d4', '#7b2cbf', '#e0fbfc'],
  },
  vintage: {
    key: 'vintage',
    name: 'Scientific Lithograph',
    tag: '19th Century',
    brandWorld: 'community',
    instruction:
      '19th Century Scientific Lithograph. Engraving style, sepia tones, textured paper background, fine hatch lines. Detailed labels in period-appropriate typography.',
    palette: ['#2b2118', '#8c6239', '#c69c6d', '#f4ece1'],
  },
}

function resolveStyleDefinition(rawStyle: string): StyleDefinition {
  const clean = String(rawStyle || 'glassmorphic').trim()
  if (STYLES_V5[clean]) return STYLES_V5[clean]
  const stripped = clean.includes('/') ? clean.split('/').pop() || clean : clean
  if (STYLES_V5[stripped]) return STYLES_V5[stripped]
  return STYLES_V5.glassmorphic
}

function escapeXml(unsafe: string): string {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function wrapSvgText(text: string, maxCharsPerLine = 42, maxLines = 3): string[] {
  const words = String(text || '').trim().split(/\s+/)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxCharsPerLine) {
      current = (current + ' ' + word).trim()
    } else {
      if (current) lines.push(current)
      current = word
      if (lines.length >= maxLines - 1) break
    }
  }
  if (current && lines.length < maxLines) {
    const remainingWords = words.slice(lines.join(' ').split(/\s+/).filter(Boolean).length)
    const tail = remainingWords.join(' ')
    lines.push(tail.length > maxCharsPerLine ? tail.slice(0, maxCharsPerLine - 1) + '…' : tail)
  }
  return lines.length > 0 ? lines : ['Verified architecture point']
}

function buildInteractiveSvgBlueprint({
  topic,
  styleObj,
  audienceObj,
  facts,
  labels,
  sources,
}: {
  topic: string
  styleObj: StyleDefinition
  audienceObj: { label: string; density: string }
  facts: string[]
  labels: string[]
  sources: string[]
}): string {
  const bgHex = (styleObj.palette[0] || '#0b0e14').split(' ')[0]
  const isLightPaper = bgHex.toLowerCase() === '#fbf9f5' || bgHex.toLowerCase() === '#ffffff'
  const primaryHex = (styleObj.palette[1] || '#7fffd4').split(' ')[0]
  const secondaryHex = (styleObj.palette[2] || '#ffd700').split(' ')[0]
  const textHex = isLightPaper ? '#221f1b' : '#f8fafc'
  const mutedHex = isLightPaper ? '#57534e' : '#94a3b8'
  const cardFill = isLightPaper ? '#ffffff' : '#111622'
  const cardStroke = isLightPaper ? '#d6d3cd' : primaryHex

  const nodePositions = [
    { x: 60, y: 150 },
    { x: 740, y: 150 },
    { x: 60, y: 410 },
    { x: 740, y: 410 },
  ]

  const cardsSvg = nodePositions
    .map((pos, idx) => {
      const factText = facts[idx] || facts[0] || `Key structural mechanism ${idx + 1} for ${topic}`
      const labelText = labels[idx] || `Node 0${idx + 1}`
      const wrapped = wrapSvgText(factText, 44, 3)
      const tspans = wrapped
        .map(
          (line, lIdx) =>
            `<tspan x="${pos.x + 24}" dy="${lIdx === 0 ? 0 : 22}">${escapeXml(line)}</tspan>`
        )
        .join('')
      const anchorX = idx % 2 === 0 ? pos.x + 400 : pos.x
      const anchorY = pos.y + 85
      return `
      <line x1="600" y1="345" x2="${anchorX}" y2="${anchorY}" stroke="${primaryHex}" stroke-width="2" stroke-dasharray="6 4" opacity="0.65" />
      <circle cx="${anchorX}" cy="${anchorY}" r="5" fill="${secondaryHex}" />
      <g>
        <rect x="${pos.x}" y="${pos.y}" width="400" height="175" rx="18" fill="${cardFill}" fill-opacity="${isLightPaper ? '0.96' : '0.88'}" stroke="${cardStroke}" stroke-width="1.5" stroke-opacity="0.55" />
        <rect x="${pos.x + 20}" y="${pos.y + 18}" width="46" height="24" rx="6" fill="${primaryHex}" fill-opacity="0.18" />
        <text x="${pos.x + 43}" y="${pos.y + 35}" text-anchor="middle" fill="${primaryHex}" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">0${idx + 1}</text>
        <text x="${pos.x + 78}" y="${pos.y + 35}" fill="${secondaryHex}" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700">${escapeXml(labelText.slice(0, 32))}</text>
        <text x="${pos.x + 24}" y="${pos.y + 74}" fill="${textHex}" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="500">${tspans}</text>
      </g>`
    })
    .join('\n')

  const titleLines = wrapSvgText(topic, 30, 2)
  const centerTitleSvg = titleLines
    .map(
      (line, idx) =>
        `<tspan x="600" dy="${idx === 0 ? 0 : 22}">${escapeXml(line)}</tspan>`
    )
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${primaryHex}" stop-opacity="${isLightPaper ? '0.12' : '0.28'}" />
      <stop offset="100%" stop-color="${bgHex}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="${bgHex}" />
  <circle cx="600" cy="345" r="290" fill="url(#coreGlow)" />
  <g stroke="${isLightPaper ? '#e5e0d8' : '#1e293b'}" stroke-width="1" opacity="0.45">
    <line x1="0" y1="110" x2="1200" y2="110" />
    <line x1="0" y1="615" x2="1200" y2="615" />
    <line x1="600" y1="110" x2="600" y2="615" stroke-dasharray="4 6" />
  </g>
  <!-- Header Bar -->
  <rect x="60" y="34" width="190" height="30" rx="15" fill="${primaryHex}" fill-opacity="0.15" stroke="${primaryHex}" stroke-width="1" stroke-opacity="0.5" />
  <text x="155" y="54" text-anchor="middle" fill="${primaryHex}" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">${escapeXml(styleObj.brandWorld.toUpperCase())} · VECTOR HUD</text>
  <text x="270" y="55" fill="${textHex}" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="800">${escapeXml(topic.slice(0, 58))}</text>
  <text x="1140" y="54" text-anchor="end" fill="${mutedHex}" font-family="JetBrains Mono, monospace" font-size="12">${escapeXml(styleObj.name)} · ${escapeXml(audienceObj.label)}</text>
  <!-- 4 Knowledge Cards -->
  ${cardsSvg}
  <!-- Central Core Node -->
  <g>
    <circle cx="600" cy="345" r="102" fill="${cardFill}" stroke="${primaryHex}" stroke-width="2.5" />
    <circle cx="600" cy="345" r="90" fill="none" stroke="${secondaryHex}" stroke-width="1" stroke-dasharray="4 4" opacity="0.7" />
    <text x="600" y="315" text-anchor="middle" fill="${secondaryHex}" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" letter-spacing="1.5">CORE ARCHITECTURE</text>
    <text x="600" y="344" text-anchor="middle" fill="${textHex}" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="800">${centerTitleSvg}</text>
    <text x="600" y="392" text-anchor="middle" fill="${primaryHex}" font-family="JetBrains Mono, monospace" font-size="10">${sources.length > 0 ? `${sources.length} Web Citations` : 'Verified Blueprint'}</text>
  </g>
  <!-- Footer Provenance -->
  <text x="60" y="648" fill="${mutedHex}" font-family="JetBrains Mono, monospace" font-size="11">Built on SIP · InfoGenius v5.3 Code-Overlay &amp; Vector Blueprint · Zero-Slop Exact Typography</text>
  <text x="1140" y="648" text-anchor="end" fill="${primaryHex}" font-family="JetBrains Mono, monospace" font-size="11">frankx.ai/infogenius</text>
</svg>`
}

const AUDIENCES_V5: Record<
  string,
  { label: string; density: string; instruction: string }
> = {
  elementary: {
    label: 'Ages 6-10',
    density: 'minimal',
    instruction:
      'Target: Ages 6-10. Bright, simple, fun. Large clear icons and minimal text labels. Use simple words. Maximum 3-4 visual elements.',
  },
  highschool: {
    label: 'High School',
    density: 'moderate',
    instruction:
      'Target: High School. Standard textbook style. Clean lines, clear labels, accurate diagrams. 5-8 visual elements with explanatory labels.',
  },
  college: {
    label: 'University',
    density: 'high',
    instruction:
      'Target: University. Academic journal style. High detail, data-rich, precise schematics. Include statistics, proper terminology, interconnected systems.',
  },
  expert: {
    label: 'Industry Expert',
    density: 'maximum',
    instruction:
      'Target: Industry Expert. Technical blueprint. Extremely dense detail, precise annotations, industry-standard notation, maximum information per pixel.',
  },
}

function extractNumberedSection(text: string, sectionName: string): string[] {
  const regex = new RegExp(`${sectionName}:\\s*\\n([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, 'i')
  const match = text.match(regex)
  if (!match) return []
  return match[1]
    .split('\n')
    .map((line) =>
      line
        .replace(/^(?:\d+\.|-|\*)\s*/, '')
        .replace(/^\[|\]$/g, '')
        .trim()
    )
    .filter((line) => line.length > 0 && !line.startsWith('['))
}

function composeInfographicPrompt({
  topic,
  styleObj,
  audienceObj,
  aspectRatio,
  facts,
  visualElements,
  labels,
  label,
}: {
  topic: string
  styleObj: StyleDefinition
  audienceObj: { label: string; density: string; instruction: string }
  aspectRatio: string
  facts: string[]
  visualElements: string[]
  labels: string[]
  label?: string
}): string {
  const factsBlock = facts.map((f) => `- ${f}`).join('\n')
  const visualBlock = visualElements.map((v) => `- ${v}`).join('\n')
  const labelsBlock = labels.map((l) => `"${l}"`).join(', ')

  let prompt = `## CONCEPT
Create a ${aspectRatio} educational infographic about: ${topic}

VISUAL STYLE: ${styleObj.instruction}
BRAND PALETTE: ${styleObj.palette.join(', ')}

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
- Breathing room and negative space between sections for clarity
- Professional color coding to distinguish different categories of information

QUALITY: Render at maximum quality. Sharp detail, no artifacts. Every label must be perfectly legible. This is an educational tool, not decoration — clarity and accuracy matter above all.`

  if (label) {
    prompt += `\n\nTITLE: Render "${label}" as a prominent title at the top of the infographic in a clean, modern font.`
  }

  return prompt
}

function wrapPcmInWavHeader(
  pcmBuffer: Buffer,
  sampleRate = 24000,
  numChannels = 1,
  bitsPerSample = 16
): Buffer {
  if (pcmBuffer.length >= 4 && pcmBuffer.toString('ascii', 0, 4) === 'RIFF') {
    return pcmBuffer
  }
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8
  const blockAlign = (numChannels * bitsPerSample) / 8
  const dataSize = pcmBuffer.length
  const header = Buffer.alloc(44)

  header.write('RIFF', 0)
  header.writeUInt32LE(36 + dataSize, 4)
  header.write('WAVE', 8)
  header.write('fmt ', 12)
  header.writeUInt32LE(16, 16)
  header.writeUInt16LE(1, 20)
  header.writeUInt16LE(numChannels, 22)
  header.writeUInt32LE(sampleRate, 24)
  header.writeUInt32LE(byteRate, 28)
  header.writeUInt16LE(blockAlign, 32)
  header.writeUInt16LE(bitsPerSample, 34)
  header.write('data', 36)
  header.writeUInt32LE(dataSize, 40)

  return Buffer.concat([header, pcmBuffer])
}

async function runGroundedResearch({
  topic,
  styleObj,
  audienceObj,
  aspectRatio,
  apiKey,
  provider,
}: {
  topic: string
  styleObj: StyleDefinition
  audienceObj: { label: string; density: string; instruction: string }
  aspectRatio: string
  apiKey: string
  provider: 'google' | 'openrouter' | 'vercel'
}) {
  const orientation =
    aspectRatio === '9:16'
      ? 'Portrait (vertical)'
      : aspectRatio === '1:1'
        ? 'Square'
        : 'Landscape (horizontal)'

  const researchPrompt = `You are a Master Visual Knowledge Architect. Research this topic thoroughly using web search and extract the essential knowledge needed to create an educational infographic and a 7-second companion motion clip.

TOPIC: "${topic}"
AUDIENCE: ${audienceObj.label} (${audienceObj.density} information density — ${audienceObj.instruction})
AESTHETIC: ${styleObj.name} (${styleObj.instruction})
LAYOUT: Optimized for ${orientation} (${aspectRatio}) orientation.

Respond in EXACTLY this structured format:

FACTS:
1. [Most important verified fact - include specific numbers/2026 data when available]
2. [Second key verified fact]
3. [Third key verified fact]
4. [Fourth key fact if density is high/maximum]

VISUAL_ELEMENTS:
1. [Primary diagram/visualization element to include, e.g., "Flow diagram showing X connecting to Y"]
2. [Secondary visual element, e.g., "Comparison chart of A vs B"]
3. [Supporting visual, e.g., "Cross-section showing internal structure"]

LABELS:
1. [Key term or label that MUST appear on the infographic]
2. [Second critical label]
3. [Third label]
4. [Fourth label]

CONTEXT:
[One paragraph explaining WHY this topic matters and what the viewer should understand after seeing this infographic]

VIDEO_PROMPT:
[Cinematic prompt for a 7-second motion sequence animating the core mechanism of this infographic in ${styleObj.name} style]`

  let text = ''
  const searchResults: Array<{ title: string; url: string }> = []

  if (provider === 'openrouter' || provider === 'vercel') {
    const isVercel = provider === 'vercel'
    const endpoint = isVercel
      ? 'https://ai-gateway.vercel.sh/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions'
    const researchModel = isVercel ? 'perplexity/sonar' : 'google/gemini-2.5-flash:online'
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://frankx.ai/infogenius',
        'X-Title': 'FrankX InfoGenius v5.2',
      },
      body: JSON.stringify({
        model: researchModel,
        messages: [{ role: 'user', content: researchPrompt }],
        ...(isVercel
          ? {
              providerOptions: {
                gateway: {
                  models: ['google/gemini-2.5-flash', 'openai/gpt-4.1-mini'],
                },
              },
            }
          : {}),
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(
        `${isVercel ? 'Vercel AI Gateway' : 'OpenRouter'} research error (${res.status}): ${errText.slice(0, 300)}`
      )
    }
    const data = await res.json()
    const msg = data.choices?.[0]?.message
    text = typeof msg?.content === 'string' ? msg.content : ''
    for (const c of data.citations || []) {
      if (typeof c === 'string') {
        searchResults.push({ title: c, url: c })
      }
    }
    for (const ann of msg?.annotations || []) {
      if (ann?.url_citation?.url) {
        searchResults.push({
          title: ann.url_citation.title || ann.url_citation.url,
          url: ann.url_citation.url,
        })
      }
    }
  } else {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: researchPrompt }] }],
          tools: [{ googleSearch: {} }],
        }),
      }
    )
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Gemini research error (${res.status}): ${errText.slice(0, 300)}`)
    }
    const data = await res.json()
    text =
      data.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || '')
        .join('\n') || ''
    for (const chunk of data.candidates?.[0]?.groundingMetadata?.groundingChunks || []) {
      if (chunk.web?.uri) {
        searchResults.push({
          title: chunk.web.title || chunk.web.uri,
          url: chunk.web.uri,
        })
      }
    }
  }

  const facts = extractNumberedSection(text, 'FACTS')
  const visualElements = extractNumberedSection(text, 'VISUAL_ELEMENTS')
  const labels = extractNumberedSection(text, 'LABELS')
  const contextMatch = text.match(/CONTEXT:\s*\n([\s\S]*?)(?=\n[A-Z_]+:|$)/i)
  const context = contextMatch ? contextMatch[1].trim() : topic
  const videoMatch = text.match(/VIDEO_PROMPT:\s*\n?([\s\S]*?)$/i)
  const videoPrompt = videoMatch
    ? videoMatch[1].trim()
    : `Cinematic 7-second data visualization animation of ${topic}. ${styleObj.instruction}`

  const uniqueSources = Array.from(
    new Map(searchResults.map((item) => [item.url, item])).values()
  )

  return {
    facts: facts.length > 0 ? facts : [`Core mechanism and architecture of ${topic}`],
    visualElements:
      visualElements.length > 0 ? visualElements : [`Primary structural diagram of ${topic}`],
    labels: labels.length > 0 ? labels : [topic],
    context,
    videoPrompt,
    searchResults: uniqueSources,
    sources: uniqueSources.map((s) => s.url),
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      action = 'architect',
      topic = '',
      articleText = '',
      style = 'glassmorphic',
      customStyleName = '',
      customStyleInstruction = '',
      customPalette = [],
      audience = 'college',
      aspectRatio = '16:9',
      imageSize = '2K',
      label = '',
      customFacts = [],
      narrationMode = 'solo',
      provider: requestedProvider = 'auto',
      tenantId: rawTenantId = '',
    } = body

    const requestStartMs = Date.now()
    const tenantId = sanitizeTenantId(rawTenantId || req.headers.get('X-Tenant-Id'))
    const baseStyleObj = resolveStyleDefinition(style)
    const styleObj: StyleDefinition = customStyleInstruction
      ? {
          key: style || 'custom-brand',
          name: customStyleName || 'Custom Brand Style',
          tag: 'Custom Brand DNA',
          brandWorld: baseStyleObj.brandWorld || 'frankx',
          instruction: String(customStyleInstruction),
          palette:
            Array.isArray(customPalette) && customPalette.length > 0
              ? customPalette.map(String)
              : baseStyleObj.palette,
        }
      : baseStyleObj

    const audienceObj = AUDIENCES_V5[audience] || AUDIENCES_V5.college
    const userKey = req.headers.get('X-User-API-Key')?.trim() || ''
    const managedCred = resolveManagedServerCredential()
    const usingManagedCredits = !userKey && Boolean(managedCred.key)
    const activeKey = userKey || managedCred.key
    const provider: 'google' | 'openrouter' | 'vercel' = userKey
      ? requestedProvider === 'vercel' || userKey.startsWith('vck_')
        ? 'vercel'
        : requestedProvider === 'openrouter' || userKey.startsWith('sk-or-')
          ? 'openrouter'
          : 'google'
      : managedCred.provider

    // Action: Save Custom Brand Style Preset to Multi-Tenant Vault
    if (action === 'save-brand-preset') {
      const updatedWallet = await saveTenantBrandPreset(tenantId, {
        key: styleObj.key,
        name: styleObj.name,
        palette: styleObj.palette,
        instruction: styleObj.instruction,
        updatedAt: new Date().toISOString(),
      })
      return Response.json({
        success: true,
        wallet: updatedWallet,
      })
    }

    // Action 0: Decompose Article / Markdown into a 5-Slide Visual Carousel & Diagram Pack
    if (action === 'decompose-article') {
      const rawArticle = String(articleText || topic).trim()
      if (!rawArticle || rawArticle.length < 20) {
        return Response.json(
          { error: 'Please paste at least a paragraph or markdown section to decompose.' },
          { status: 400 }
        )
      }

      const lines = rawArticle
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)
      const headings = lines
        .filter((l) => /^#{1,3}\s+/.test(l))
        .map((l) => l.replace(/^#{1,3}\s+/, '').trim())
      const bullets = lines
        .filter((l) => /^[-*•]\s+|^\d+\.\s+/.test(l))
        .map((l) => l.replace(/^([-*•]|\d+\.)\s+/, '').trim())
      const paragraphs = lines.filter(
        (l) => !/^#{1,6}\s+/.test(l) && !/^[-*•]\s+|^\d+\.\s+/.test(l) && l.length > 35
      )

      const docTitle =
        headings[0] ||
        paragraphs[0]?.slice(0, 68) ||
        'System Architecture & Visual Playbook'

      const slideRoles = [
        {
          role: '01 · Hero Thesis & Overview',
          defaultTitle: docTitle,
          defaultVisual: 'Central focal crystal architecture node with 3 orbiting thesis pillars',
        },
        {
          role: '02 · Core Architecture & Stack',
          defaultTitle: headings[1] || `${docTitle}: Layered Architecture`,
          defaultVisual: 'Multi-tier system stack showing substrate, orchestration, and interface layers',
        },
        {
          role: '03 · Execution & Data Flow',
          defaultTitle: headings[2] || `${docTitle}: End-to-End Pipeline`,
          defaultVisual: 'Left-to-right directed graph with verification gates and feedback loop',
        },
        {
          role: '04 · Benchmarks & Trade-offs',
          defaultTitle: headings[3] || `${docTitle}: Telemetry & Comparison`,
          defaultVisual: 'Split comparison matrix contrasting legacy bottlenecks vs target throughput',
        },
        {
          role: '05 · Implementation Blueprint',
          defaultTitle: headings[4] || `${docTitle}: Deployment Checklist`,
          defaultVisual: 'Actionable 4-step rollout sequence with production readiness badges',
        },
      ]

      let slides = slideRoles.map((sr, idx) => {
        const factSlice = bullets.slice(idx * 2, idx * 2 + 3)
        const paraFallback = paragraphs[idx] || paragraphs[0] || docTitle
        const slideFacts =
          factSlice.length > 0
            ? factSlice
            : [
                paraFallback.slice(0, 140),
                `Key mechanism for ${sr.defaultTitle}`,
                `Verification criterion and measurable outcome for stage ${idx + 1}`,
              ]
        const slideLabels = [
          sr.defaultTitle.slice(0, 36),
          `Stage 0${idx + 1}`,
          'Verification Gate',
        ]
        const slideVisuals = [
          sr.defaultVisual,
          'Frosted glass callout cards with quantitative telemetry',
          'Directional luminous flow connectors',
        ]

        const slidePrompt = composeInfographicPrompt({
          topic: sr.defaultTitle,
          styleObj,
          audienceObj,
          aspectRatio,
          facts: slideFacts,
          visualElements: slideVisuals,
          labels: slideLabels,
          label: sr.defaultTitle.slice(0, 48),
        })

        const slideSlug = sr.defaultTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 40)

        return {
          slideNumber: idx + 1,
          role: sr.role,
          title: sr.defaultTitle,
          facts: slideFacts,
          visualElements: slideVisuals,
          labels: slideLabels,
          imagePrompt: slidePrompt,
          cliCommand: `npm run infogenius -- "${sr.defaultTitle.replace(/"/g, '\\"')}" --style ${styleObj.key} --audience ${audience} --aspect ${aspectRatio} --size ${imageSize} --out public/images/blog/generated/slide-0${idx + 1}-${slideSlug}.png`,
        }
      })

      // If user supplied an API key, enrich the 5 slides using Gemini / OpenRouter LLM decomposition
      if (userKey) {
        try {
          const decomposePrompt = `You are a Master Visual Knowledge Architect. Decompose the following article/markdown into a 5-slide visual infographic sequence.
Return ONLY valid JSON matching this array schema (5 items):
[
  {
    "slideNumber": 1,
    "role": "01 · Hero Thesis",
    "title": "Short punchy slide title",
    "facts": ["Fact 1 with numbers/details", "Fact 2", "Fact 3"],
    "visualElements": ["Primary diagram description", "Secondary callout description"],
    "labels": ["Label 1", "Label 2", "Label 3"]
  }
]

ARTICLE TEXT:
${rawArticle.slice(0, 6000)}`

          let rawJsonText = ''
          if (provider === 'openrouter' || provider === 'vercel') {
            const endpoint =
              provider === 'vercel'
                ? 'https://ai-gateway.vercel.sh/v1/chat/completions'
                : 'https://openrouter.ai/api/v1/chat/completions'
            const r = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userKey}`,
                'HTTP-Referer': 'https://frankx.ai/infogenius',
              },
              body: JSON.stringify({
                model: 'google/gemini-2.5-flash',
                messages: [{ role: 'user', content: decomposePrompt }],
              }),
            })
            if (r.ok) {
              const d = await r.json()
              rawJsonText = d.choices?.[0]?.message?.content || ''
            }
          } else {
            const r = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ role: 'user', parts: [{ text: decomposePrompt }] }],
                }),
              }
            )
            if (r.ok) {
              const d = await r.json()
              rawJsonText =
                d.candidates?.[0]?.content?.parts
                  ?.map((p: { text?: string }) => p.text || '')
                  .join('\n') || ''
            }
          }

          const jsonMatch = rawJsonText.match(/\[[\s\S]*\]/)
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0])
            if (Array.isArray(parsed) && parsed.length > 0) {
              slides = parsed.slice(0, 5).map((item, idx) => {
                const title = String(item.title || slideRoles[idx]?.defaultTitle || `Slide ${idx + 1}`)
                const facts = Array.isArray(item.facts) && item.facts.length > 0 ? item.facts.map(String) : slides[idx].facts
                const visualElements =
                  Array.isArray(item.visualElements) && item.visualElements.length > 0
                    ? item.visualElements.map(String)
                    : slides[idx].visualElements
                const labels =
                  Array.isArray(item.labels) && item.labels.length > 0
                    ? item.labels.map(String)
                    : slides[idx].labels
                const slidePrompt = composeInfographicPrompt({
                  topic: title,
                  styleObj,
                  audienceObj,
                  aspectRatio,
                  facts,
                  visualElements,
                  labels,
                  label: title.slice(0, 48),
                })
                const slideSlug = title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
                  .slice(0, 40)
                return {
                  slideNumber: idx + 1,
                  role: String(item.role || slideRoles[idx]?.role || `0${idx + 1} · Visual`),
                  title,
                  facts,
                  visualElements,
                  labels,
                  imagePrompt: slidePrompt,
                  cliCommand: `npm run infogenius -- "${title.replace(/"/g, '\\"')}" --style ${styleObj.key} --audience ${audience} --aspect ${aspectRatio} --size ${imageSize} --out public/images/blog/generated/slide-0${idx + 1}-${slideSlug}.png`,
                }
              })
            }
          }
        } catch {
          // keep deterministic slides on fallback
        }
      }

      const batchCliScript = slides.map((s) => s.cliCommand).join('\n')

      return Response.json({
        success: true,
        mode: userKey ? 'ai-decomposed-pack' : 'deterministic-decomposed-pack',
        documentTitle: docTitle,
        style: styleObj,
        audience: audienceObj,
        aspectRatio,
        imageSize,
        slides,
        batchCliScript,
      })
    }

    const cleanTopic = String(topic).trim()
    if (!cleanTopic || cleanTopic.length < 2) {
      return Response.json({ error: 'Please enter a valid topic.' }, { status: 400 })
    }

    const slug = cleanTopic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50)

    // Action 1: Narrate facts via Gemini TTS (Solo Kore OR 2-Speaker MultiSpeakerVoiceConfig Kore + Fenrir)
    if (action === 'narrate') {
      const ttsKey =
        userKey && !userKey.startsWith('sk-or-') && !userKey.startsWith('vck_')
          ? userKey
          : process.env.GEMINI_API_KEY?.trim() ||
            process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
            ''
      if (!ttsKey) {
        return Response.json(
          {
            error:
              'Google Gemini API key required for Kore / Multi-Speaker TTS narration. Paste your Google AI Studio key in the BYOK drawer.',
          },
          { status: 401 }
        )
      }
      const factsToRead: string[] =
        Array.isArray(customFacts) && customFacts.length > 0
          ? customFacts
          : [`Overview of ${cleanTopic}`]

      const isDialogue = narrationMode === 'dialogue'
      const dialogueScript = factsToRead
        .map((fact, idx) =>
          idx % 2 === 0
            ? `Architect: Point ${idx + 1} on ${cleanTopic}. ${fact}`
            : `Strategist: And here is why that matters in production: ${fact}`
        )
        .join('\n')

      const narrationPrompt = isDialogue
        ? `Synthesize a crisp, high-intellect executive architecture briefing between Architect and Strategist:\n${dialogueScript}`
        : `Read the following facts clearly and professionally: ${factsToRead.join('. ')}`

      const speechConfig = isDialogue
        ? {
            multiSpeakerVoiceConfig: {
              speakerVoiceConfigs: [
                {
                  speaker: 'Architect',
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                  },
                },
                {
                  speaker: 'Strategist',
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Fenrir' },
                  },
                },
              ],
            },
          }
        : {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          }

      const ttsRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${ttsKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: narrationPrompt }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig,
            },
          }),
        }
      )

      if (!ttsRes.ok) {
        const errText = await ttsRes.text()
        throw new Error(`TTS error (${ttsRes.status}): ${errText.slice(0, 300)}`)
      }

      const ttsData = await ttsRes.json()
      const base64Pcm = ttsData.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data
      if (!base64Pcm) {
        throw new Error('No audio stream returned from Gemini TTS.')
      }
      const wavBuf = wrapPcmInWavHeader(Buffer.from(base64Pcm, 'base64'), 24000, 1, 16)
      return Response.json({
        success: true,
        audioDataUrl: `data:audio/wav;base64,${wavBuf.toString('base64')}`,
        voice: isDialogue ? 'Kore (Architect) × Fenrir (Strategist)' : 'Kore',
        narrationMode: isDialogue ? 'dialogue' : 'solo',
        transcript: isDialogue ? dialogueScript : factsToRead.join(' '),
      })
    }

    // Step 1: Research (Grounded if key provided, or structured architectural synthesis if zero-key)
    let research = {
      facts:
        Array.isArray(customFacts) && customFacts.length > 0
          ? customFacts
          : [
              `Primary system architecture, core mechanism, and 2026 benchmarks for ${cleanTopic}`,
              `End-to-end data & control flow across the key stages of ${cleanTopic}`,
              `Critical operational trade-offs, bottlenecks, and verification gates in ${cleanTopic}`,
              `Real-world production impact and adoption metrics for ${cleanTopic}`,
            ],
      visualElements: [
        `Central focal architecture diagram illustrating ${cleanTopic}`,
        `Multi-depth callout cards comparing key metrics and stage transitions`,
        `Directional luminous flow threads connecting inputs, processing nodes, and outputs`,
      ],
      labels: [label || cleanTopic, 'Core Mechanism', 'System Flow', 'Telemetry & Impact'],
      context: `Architectural breakdown and visual knowledge synthesis for ${cleanTopic}.`,
      videoPrompt: `Cinematic 7-second data visualization animation of ${cleanTopic}. ${styleObj.instruction}`,
      searchResults: [] as Array<{ title: string; url: string }>,
      sources: [] as string[],
      grounded: false,
    }

    if (userKey || (action === 'generate' && usingManagedCredits)) {
      try {
        const liveResearch = await runGroundedResearch({
          topic: cleanTopic,
          styleObj,
          audienceObj,
          aspectRatio,
          apiKey: activeKey,
          provider,
        })
        research = {
          ...liveResearch,
          facts:
            Array.isArray(customFacts) && customFacts.length > 0
              ? [...customFacts, ...liveResearch.facts]
              : liveResearch.facts,
          grounded: true,
        }
      } catch {
        // Fallback to structured architectural facts if upstream search grounding is rate-limited
      }
    }

    const imagePrompt = composeInfographicPrompt({
      topic: cleanTopic,
      styleObj,
      audienceObj,
      aspectRatio,
      facts: research.facts,
      visualElements: research.visualElements,
      labels: research.labels,
      label: label || undefined,
    })

    const cliCommand = `npm run infogenius -- "${cleanTopic.replace(/"/g, '\\"')}" --style ${styleObj.key} --audience ${audience} --aspect ${aspectRatio} --size ${imageSize}`
    const publicSrc = `/images/blog/generated/infogenius-${styleObj.key}-${slug}.png`
    const mdxSnippet = `<LiquidGlassZoom\n  src="${publicSrc}"\n  alt="${cleanTopic} — ${styleObj.name} Infographic"\n  caption="${cleanTopic}"\n/>`
    const svgBlueprint = buildInteractiveSvgBlueprint({
      topic: cleanTopic,
      styleObj,
      audienceObj,
      facts: research.facts,
      labels: research.labels,
      sources: research.sources,
    })

    // If action === 'architect', return the research + precision prompt + SVG blueprint + CLI/MDX snippets immediately
    if (action === 'architect') {
      const wallet = await getTenantWallet(tenantId)
      return Response.json({
        success: true,
        mode: userKey ? 'grounded-architect' : 'instant-architect',
        provider: userKey ? provider : 'local-architect',
        topic: cleanTopic,
        style: styleObj,
        audience: audienceObj,
        aspectRatio,
        imageSize,
        research,
        imagePrompt,
        videoPrompt: research.videoPrompt,
        svgBlueprint,
        cliCommand,
        mdxSnippet,
        wallet,
      })
    }

    // Action === 'generate': requires either BYOK userKey OR Managed Credits
    if (!activeKey) {
      return Response.json(
        {
          error:
            'API key or Managed Credit Wallet required to render 2K/4K pixels. Paste your Gemini / Vercel AI Gateway / OpenRouter key, or top up Workspace Credits.',
        },
        { status: 401 }
      )
    }

    const creditCost = imageSize === '4K' ? CREDIT_COSTS.infographic4K : CREDIT_COSTS.infographic2K
    let activeWallet = await getTenantWallet(tenantId)

    if (usingManagedCredits && activeWallet.creditsRemaining < creditCost) {
      return Response.json(
        {
          error: `Insufficient credits (${activeWallet.creditsRemaining} remaining, ${creditCost} required). Purchase a credit pack or connect a BYOK API key.`,
          wallet: activeWallet,
          refusal: 'insufficient_credits',
        },
        { status: 402 }
      )
    }

    let imageDataUrl: string | null = null
    let usedImageModel = ''

    if (provider === 'openrouter' || provider === 'vercel') {
      const isVercel = provider === 'vercel'
      usedImageModel = isVercel ? 'google/gemini-3-pro-image' : 'google/gemini-2.5-flash-image-preview'
      const endpoint = isVercel
        ? 'https://ai-gateway.vercel.sh/v1/chat/completions'
        : 'https://openrouter.ai/api/v1/chat/completions'
      const imgRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeKey}`,
          'HTTP-Referer': 'https://frankx.ai/infogenius',
          'X-Title': 'FrankX InfoGenius v5.2',
        },
        body: JSON.stringify({
          model: usedImageModel,
          messages: [{ role: 'user', content: imagePrompt }],
          modalities: ['image', 'text'],
          image_config: { aspect_ratio: aspectRatio },
        }),
      })
      if (!imgRes.ok) {
        const errText = await imgRes.text()
        throw new Error(
          `${isVercel ? 'Vercel AI Gateway' : 'OpenRouter'} image error (${imgRes.status}): ${errText.slice(0, 300)}`
        )
      }
      const imgData = await imgRes.json()
      const msg = imgData.choices?.[0]?.message
      imageDataUrl =
        msg?.images?.[0]?.image_url?.url ||
        (Array.isArray(msg?.content)
          ? msg.content.find((c: { type?: string }) => c.type === 'image_url')?.image_url?.url
          : null)
    } else {
      const modelsToTry = [
        'gemini-3-pro-image-preview',
        'gemini-3.1-flash-image-preview',
        'gemini-2.5-flash-image',
      ]
      let lastErr = ''
      for (const m of modelsToTry) {
        const imgRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${activeKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: imagePrompt }] }],
              generationConfig: {
                responseModalities: ['IMAGE', 'TEXT'],
                imageConfig: { aspectRatio, imageSize },
              },
            }),
          }
        )
        if (!imgRes.ok) {
          lastErr = `${m} (${imgRes.status}): ${(await imgRes.text()).slice(0, 200)}`
          continue
        }
        const imgData = await imgRes.json()
        for (const c of imgData.candidates || []) {
          for (const part of c.content?.parts || []) {
            if (part.inlineData?.data) {
              const mime = part.inlineData.mimeType || 'image/png'
              imageDataUrl = `data:${mime};base64,${part.inlineData.data}`
              usedImageModel = m
              break
            }
          }
          if (imageDataUrl) break
        }
        if (imageDataUrl) break
      }
      if (!imageDataUrl) {
        throw new Error(`Image generation failed across Gemini models. Last error: ${lastErr}`)
      }
    }

    if (imageDataUrl) {
      if (usingManagedCredits) {
        const charge = await consumeTenantCredits(
          tenantId,
          creditCost,
          `${imageSize} Infographic (${cleanTopic.slice(0, 32)})`
        )
        if (charge.ok) activeWallet = charge.wallet
      }
      activeWallet = await appendTenantGalleryItem(tenantId, {
        id: `ig_${Date.now()}`,
        topic: cleanTopic,
        style: styleObj.key,
        aspectRatio,
        imageSize,
        imageUrl: publicSrc,
        createdAt: new Date().toISOString(),
        creditsSpent: usingManagedCredits ? creditCost : 0,
      })
    }

    const gatewayTelemetry = {
      durationMs: Date.now() - requestStartMs,
      routedProvider: provider,
      imageModel: usedImageModel,
      researchGrounded: research.grounded,
      fallbackChain:
        provider === 'vercel'
          ? ['google/gemini-3-pro-image', 'google/gemini-2.5-flash-image-preview']
          : ['gemini-3-pro-image-preview', 'gemini-3.1-flash-image-preview', 'gemini-2.5-flash-image'],
    }

    const provenance = {
      schemaVersion: '5.3.0',
      generator: 'frankx-infogenius-web-studio',
      createdAt: new Date().toISOString(),
      tenantId,
      billingMode: usingManagedCredits ? 'managed-credits' : 'byok',
      creditsSpent: usingManagedCredits ? creditCost : 0,
      topic: cleanTopic,
      brandWorld: styleObj.brandWorld,
      style: styleObj.key,
      styleName: styleObj.name,
      audience,
      aspectRatio,
      imageSize,
      provider,
      imageModel: usedImageModel,
      gatewayTelemetry,
      research,
      prompts: {
        imagePrompt,
        videoPrompt: research.videoPrompt,
      },
    }

    return Response.json({
      success: true,
      mode: usingManagedCredits ? 'managed-credit-generation' : 'byok-generation',
      provider,
      imageModel: usedImageModel,
      imageDataUrl,
      svgBlueprint,
      gatewayTelemetry,
      topic: cleanTopic,
      style: styleObj,
      audience: audienceObj,
      aspectRatio,
      imageSize,
      research,
      imagePrompt,
      videoPrompt: research.videoPrompt,
      cliCommand,
      mdxSnippet,
      provenance,
      wallet: activeWallet,
    })
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'InfoGenius Studio request failed',
      },
      { status: 500 }
    )
  }
}
