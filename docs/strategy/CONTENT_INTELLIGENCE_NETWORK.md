# Content Intelligence Network — Strategy Document

_Created: 2026-02-19_
_Status: Architecture Phase_

---

## The Problem

Content exists in silos. Blog posts, newsletters, changelog entries, music releases, book chapters, product launches — they're all disconnected. No central index. No automated cross-linking. No multi-format repurposing. The newsletter is a single generic signup when it should be a network of targeted content streams.

## The Vision

**One intelligence layer** that knows everything FrankX publishes, automatically indexes it, cross-links related content, and distributes through targeted newsletter streams — each with its own voice, cadence, and audience.

---

## Architecture: Hub & Spoke Content Network

```
                    ┌─────────────────────┐
                    │   Content Registry   │
                    │  data/content-index  │
                    │  .json (central DB)  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
         ┌────▼────┐    ┌─────▼─────┐   ┌──────▼──────┐
         │  Blog   │    │ Products  │   │   Books     │
         │ (Hub)   │    │ Changelog │   │  Chapters   │
         └────┬────┘    └─────┬─────┘   └──────┬──────┘
              │               │                │
    ┌─────────┼─────────┐    │    ┌───────────┼──────────┐
    ▼         ▼         ▼    ▼    ▼           ▼          ▼
Newsletter  Social   Research  Newsletter  Newsletter  Newsletter
 Streams    Queue    Pages     Streams     Streams     Streams
```

---

## Newsletter Streams (6 Distinct Publications)

Each stream has its own: voice, cadence, audience segment, Resend list, and signup component variant.

### 1. Creation Chronicles (Main / General)
- **Audience**: Builders, creators, anyone following the journey
- **Cadence**: Weekly (Sunday evening)
- **Voice**: Personal, behind-the-scenes, studio energy
- **Content**: What shipped this week, what's next, one insight
- **List type**: `creation-chronicles` (already exists in EmailSignup)
- **Source**: Blog posts + changelog + manual narrative
- **Page**: `/newsletter` (existing, needs redesign)

### 2. AI Architect Dispatch
- **Audience**: Developers, AI engineers, technical builders
- **Cadence**: Bi-weekly (Tuesday)
- **Voice**: Technical, precise, architectural
- **Content**: AI system designs, Claude Code patterns, Oracle architecture, agentic workflows
- **List type**: `ai-architect` (new)
- **Source**: Technical blog posts + research docs + ACOS updates
- **Page**: `/newsletter/ai-architect` (new)
- **Existing skill**: `.claude/skills/ai-architect-newsletter/`

### 3. FrankX Music Letters
- **Audience**: Music fans, AI music producers, Suno users
- **Cadence**: Bi-weekly (Friday)
- **Voice**: Creative, passionate, producer-talk
- **Content**: New releases, production techniques, Suno tips, playlist features
- **List type**: `music-lab` (already exists in EmailSignup)
- **Source**: Music releases + music blog posts + production notes
- **Page**: `/newsletter/music` (new)

### 4. Arcanea Transmissions
- **Audience**: Arcanea universe followers, worldbuilding enthusiasts, book readers
- **Cadence**: Monthly
- **Voice**: Mythological, narrative, immersive (exception to no-spiritual rule — Arcanea is fiction)
- **Content**: New chapters, lore reveals, Gate progression updates, bestiary entries
- **List type**: `arcanea` (new)
- **Source**: Book chapters + Arcanea content + design-lab/arcanea
- **Page**: `/newsletter/arcanea` (new)

### 5. Investor Intelligence Brief
- **Audience**: AI-powered investors (retail + crypto + institutional)
- **Cadence**: Weekly (Monday morning)
- **Voice**: Analytical, data-driven, actionable
- **Content**: Market observations, tool reviews, prompt of the week, platform updates
- **List type**: `investor` (new)
- **Source**: Investor research + market monitoring + tool reviews
- **Page**: `/newsletter/investor` (new)

### 6. Inner Circle (Premium / Paid)
- **Audience**: Highest-engagement subscribers, potential customers
- **Cadence**: Weekly (Wednesday)
- **Voice**: Exclusive, direct, high-signal
- **Content**: Revenue numbers, system breakdowns, early access, behind-the-curtain
- **List type**: `inner-circle` (already exists in EmailSignup)
- **Source**: Manual + curated from all streams
- **Page**: `/inner-circle` (existing page, needs newsletter integration)

---

## Content Registry: The Central Brain

### `data/content-index.json`

A machine-readable index of EVERYTHING published across the ecosystem.

```json
{
  "version": "1.0",
  "lastUpdated": "2026-02-19T00:00:00Z",
  "entries": [
    {
      "id": "blog-great-transition",
      "type": "blog",
      "title": "The Great Transition: Why Building Your Own Business Is the Smartest Move",
      "slug": "the-great-transition-build-your-own-business",
      "publishedAt": "2026-02-18",
      "category": "business",
      "tags": ["ai-economy", "solopreneurship", "golden-age"],
      "streams": ["creation-chronicles", "ai-architect"],
      "crossLinks": ["book-great-transition", "blog-golden-age"],
      "status": "published",
      "metrics": {
        "wordCount": 3200,
        "readTime": 12
      }
    },
    {
      "id": "book-great-transition-ch01",
      "type": "book-chapter",
      "title": "Something Is Happening",
      "book": "great-transition",
      "chapter": 1,
      "publishedAt": "2026-02-18",
      "streams": ["creation-chronicles"],
      "crossLinks": ["blog-great-transition"],
      "status": "published"
    },
    {
      "id": "music-release-001",
      "type": "music",
      "title": "Track Name",
      "platform": "suno",
      "publishedAt": "2026-02-15",
      "streams": ["music-lab"],
      "status": "published"
    },
    {
      "id": "product-acos-v10",
      "type": "changelog",
      "title": "ACOS v10: Autonomous Intelligence",
      "version": "10.0",
      "publishedAt": "2026-02-14",
      "streams": ["creation-chronicles", "ai-architect"],
      "status": "published"
    }
  ]
}
```

### Content Types
| Type | Source | Auto-indexable |
|------|--------|----------------|
| `blog` | `content/blog/*.mdx` frontmatter | Yes (scan) |
| `book-chapter` | `content/books/*/chapter-*.md` | Yes (scan) |
| `music` | `data/music-catalog.json` (future) | Yes |
| `changelog` | `data/changelog-data.json` | Yes |
| `product` | `data/templates.json`, `data/investor-products.json` | Yes |
| `research` | `app/research/*/page.tsx` | Partial (needs metadata) |
| `newsletter-issue` | `data/newsletter-archive.json` (new) | Yes |

---

## Automation: Content Scanner

### `scripts/generate-content-index.mjs`

Build-time script (runs in prebuild alongside vault-manifest scanner):

1. **Scan blog MDX frontmatter** → extract title, date, category, tags
2. **Scan book chapters** → extract book, chapter number, title
3. **Read changelog data** → extract versions, dates
4. **Read product data** → extract products, categories
5. **Cross-reference** → auto-detect related content by tags/categories
6. **Assign streams** → rule-based: music tag → music-lab stream, tech tag → ai-architect stream
7. **Write** → `data/content-index.json`

### Stream Assignment Rules

```javascript
const streamRules = {
  'ai-architect': (entry) =>
    entry.category === 'ai-architecture' ||
    entry.tags?.some(t => ['claude-code', 'acos', 'agents', 'oracle', 'llm'].includes(t)),

  'music-lab': (entry) =>
    entry.type === 'music' ||
    entry.category === 'music' ||
    entry.tags?.some(t => ['suno', 'music-production', 'ai-music'].includes(t)),

  'arcanea': (entry) =>
    entry.type === 'book-chapter' && entry.book?.startsWith('arcanea') ||
    entry.tags?.some(t => ['arcanea', 'gates', 'worldbuilding'].includes(t)),

  'investor': (entry) =>
    entry.category === 'investing' ||
    entry.tags?.some(t => ['investing', 'crypto', 'portfolio', 'finance'].includes(t)),

  'creation-chronicles': () => true, // Everything goes to main newsletter
}
```

---

## Multi-AI Operations Layer

### Claude Code = Primary (Always)

Claude Code remains the brain. All content generation, code, and orchestration flows through Claude.

### Integration Points for Other AI Tools

| Tool | Role | Integration |
|------|------|-------------|
| **Claude Code** | Primary: generate, edit, deploy, orchestrate | CLAUDE.md, skills, hooks, MCPs |
| **Cursor/Windsurf** | Secondary: quick edits when CC unavailable | `.cursorrules` / `.windsurfrules` via Starlight sync |
| **Gemini (Nano Banana)** | Visual: image generation for newsletters | MCP, called from Claude Code |
| **OpenAI Images** | Visual: text-heavy diagrams, instruction fidelity | `scripts/image-ops/image-router.mjs` (`openai` provider) |
| **xAI Grok Images** | Visual: style exploration and ideation | `scripts/image-ops/image-router.mjs` (`xai` provider) |
| **Replicate** | Visual: multi-model batch testing | `scripts/image-ops/image-matrix.mjs` + Replicate model catalog |
| **Cline** | Tertiary: VS Code integration for rapid prototyping | Reads same CLAUDE.md context |

### Shared Context Protocol

All AI tools read from the same sources:

```
CLAUDE.md (root)          ← Claude Code primary
.cursorrules              ← Cursor reads (generated by Starlight)
.windsurfrules            ← Windsurf reads (generated by Starlight)
data/content-index.json   ← All tools can reference
.claude/skills/           ← Claude Code exclusive (skills)
.starlight/memory.json    ← Starlight syncs across all tools
data/ai-ops/image-model-router.json ← shared image routing policy
scripts/image-ops/        ← shared image generation + matrix testing
```

### The ACOS Connection

Skills and agents that power the content network:

| Skill/Agent | File | Purpose |
|-------------|------|---------|
| `/generate-social` | `.claude/commands/generate-social.md` | Blog → social content |
| `/ai-architect-newsletter` | `.claude/skills/ai-architect-newsletter/` | Generate AI Architect Dispatch |
| `/create-music` | `.claude/commands/create-music.md` | Music production + metadata |
| `/publish` | `.claude/commands/publish.md` | Push to production |
| `/factory` | `.claude/commands/factory.md` | Mass content generation |
| NEW: `/generate-newsletter` | TBD | Blog+index → newsletter per stream |
| NEW: `/content-scan` | TBD | Run content-index scanner |
| NEW: `/newsletter-archive` | TBD | Archive sent issues |

---

## Newsletter Page Architecture

### `/newsletter` — Hub (redesign existing)

The main newsletter page becomes a hub showing all 6 streams:

```
┌─────────────────────────────────────────────────┐
│            Choose Your Signal                    │
│     Subscribe to what matters to you             │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Creation │  │    AI    │  │  Music   │      │
│  │Chronicles│  │ Architect│  │  Letters │      │
│  │ Weekly   │  │ Bi-weekly│  │ Bi-weekly│      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Arcanea  │  │ Investor │  │  Inner   │      │
│  │Transmit. │  │ Brief    │  │  Circle  │      │
│  │ Monthly  │  │  Weekly  │  │  Weekly  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  [Subscribe to All]  (one-click, all streams)    │
└─────────────────────────────────────────────────┘
```

### Sub-pages
- `/newsletter/ai-architect` — Archive + subscribe
- `/newsletter/music` — Archive + subscribe
- `/newsletter/arcanea` — Archive + subscribe
- `/newsletter/investor` — Archive + subscribe
- `/inner-circle` — Existing (premium tier)

---

## Email Template System

### Current State
- 10 premium React Email variants in `emails/premium-variants/`
- Resend MCP connected
- No template-per-stream mapping

### Target State
Each newsletter stream gets a template variant:

| Stream | Template | Visual Identity |
|--------|----------|-----------------|
| Creation Chronicles | `07-constellation.tsx` | Star map, purple/cyan |
| AI Architect Dispatch | `04-neural-network.tsx` | Circuit patterns, emerald |
| FrankX Music Letters | `06-liquid-intelligence.tsx` | Flow, amber/violet |
| Arcanea Transmissions | `02-bioluminescent-flow.tsx` | Organic, deep purple |
| Investor Brief | `09-apple-glass-premium.tsx` | Clean, glass, blue |
| Inner Circle | `03-crystal-clarity.tsx` | Premium, gold accents |

---

## Implementation Phases

### Phase 1: Content Registry (1 session)
- [ ] Build `scripts/generate-content-index.mjs` scanner
- [ ] Add to `package.json` prebuild
- [ ] Generate initial `data/content-index.json`
- [ ] Create `lib/content-index.ts` reader functions

### Phase 2: Newsletter Hub Redesign (1 session)
- [ ] Redesign `/newsletter` as stream hub
- [ ] Update `EmailSignup` component with new list types
- [ ] Create `/newsletter/[stream]` dynamic route for archives
- [ ] Set up Resend audiences per stream

### Phase 3: Generation Commands (1 session)
- [ ] `/generate-newsletter` command — takes stream + date range, pulls from content-index
- [ ] `/content-scan` command — runs scanner manually
- [ ] Map email templates to streams
- [ ] Test send flow: generate → preview → send via Resend MCP

### Phase 4: Automation (1 session)
- [ ] Changelog watcher: detect new entries → auto-queue for Creation Chronicles
- [ ] Blog publish hook: new MDX → auto-assign streams → queue social + newsletter
- [ ] Newsletter archive: `data/newsletter-archive.json` — store sent issues for web display
- [ ] Cross-link injection: content-index → auto-suggest "Related" links in blog posts

### Phase 5: Multi-AI Sync (1 session)
- [ ] Starlight bridge: content-index available to all AI tools
- [ ] Cursor/Windsurf rules: include content-index path and stream rules
- [ ] ACOS skill update: register all new commands
- [ ] Claude as orchestrator: other tools can read context but only Claude writes/publishes

---

## EmailSignup Component Updates

Current `listType` union:
```typescript
'newsletter' | 'creation-chronicles' | 'inner-circle' | 'music-lab' | 'courses-waitlist'
```

New union:
```typescript
'newsletter'           // Legacy/catch-all
| 'creation-chronicles'  // Main weekly
| 'ai-architect'         // Technical bi-weekly
| 'music-lab'            // Music bi-weekly
| 'arcanea'              // Arcanea monthly
| 'investor'             // Investor weekly
| 'inner-circle'         // Premium weekly
| 'courses-waitlist'     // Course launches
| 'all'                  // Subscribe to everything
```

---

## Revenue Potential

| Stream | Free | Paid Upgrade |
|--------|------|-------------|
| Creation Chronicles | Yes | — |
| AI Architect Dispatch | Yes | Premium deep-dives ($9/mo) |
| Music Letters | Yes | Production templates ($27) |
| Arcanea Transmissions | Yes | Early chapter access ($9/mo) |
| Investor Brief | Yes | Premium prompts + tools ($27/mo) |
| Inner Circle | No | $27/mo or $197/yr |

---

## File Map

| File | Status | Purpose |
|------|--------|---------|
| `data/content-index.json` | To create | Central content registry |
| `scripts/generate-content-index.mjs` | To create | Build-time scanner |
| `lib/content-index.ts` | To create | Reader functions |
| `app/newsletter/page.tsx` | Needs redesign | Stream hub |
| `app/newsletter/[stream]/page.tsx` | To create | Stream archive pages |
| `emails/premium-variants/*.tsx` | Exists (10) | Map to streams |
| `.claude/commands/generate-newsletter.md` | To create | Newsletter generation |
| `.claude/commands/content-scan.md` | To create | Manual scanner trigger |
| `data/newsletter-archive.json` | To create | Sent issue archive |
| `docs/strategy/CONTENT_INTELLIGENCE_NETWORK.md` | This file | Strategy document |
