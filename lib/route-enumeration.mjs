/**
 * Route enumeration — single source of truth for every public URL on frankx.ai.
 *
 * Consumed by:
 *   - app/sitemap.ts                         → sitemap.xml
 *   - scripts/build-route-index.mjs          → data/route-index.json (for not-found.tsx fuzzy match)
 *   - scripts/check-internal-links.mjs       → pre-publish link validation (Phase 4)
 *
 * Written in plain ESM JavaScript (not TypeScript) so both Next.js's TS compiler
 * AND standalone Node scripts can import it without a `tsx`/`ts-node` dependency.
 * TypeScript registries (book-reviews.ts, os-modules.ts, workshops.ts) are read
 * via regex extraction rather than imported — pragmatic since `.mjs` can't load `.ts`.
 *
 * @typedef {Object} Route
 * @property {string} href                    Canonical path, e.g. '/workshops/ikigai-branding'
 * @property {string} [title]                  Human-readable title for fuzzy match + UI
 * @property {string} [description]            One-sentence description (when known)
 * @property {string[]} [tags]                 Tag/topic facets for fuzzy match
 * @property {RouteType} type                 Category for grouping in suggestions
 *
 * @typedef {'core'|'blog'|'workshop'|'product'|'guide'|'library'|'os'|'research'|'newsletter'|'partnership'|'tool'|'community'|'section'|'video'|'static'|'legacy'} RouteType
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const ROOT = process.cwd()

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

/** kebab-case → Title Case */
function titleFromSlug(slug) {
  return slug
    .replace(/^\//, '')
    .split('/')
    .pop()
    .split('-')
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

/** Derive tag facets from a URL path */
function tagsFromHref(href) {
  return href
    .split('/')
    .filter(Boolean)
    .flatMap((seg) => seg.split('-'))
    .filter((t) => t.length > 1)
}

/** Safe JSON read */
function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'))
  } catch {
    return null
  }
}

/** Walk a content/ directory and extract MDX frontmatter */
function walkMdx(dirRel, basePathFor) {
  const dir = path.join(ROOT, dirRel)
  /** @type {Route[]} */
  const out = []
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    const seen = new Set()
    for (const file of files) {
      const slug = file.replace(/\.(mdx|md)$/, '')
      if (seen.has(slug)) continue
      seen.add(slug)
      try {
        const raw = fs.readFileSync(path.join(dir, file), 'utf8')
        const { data } = matter(raw)
        // Newsletter issues use frontmatter slug + status='sent'/'archived' (drafts excluded)
        if (dirRel.includes('newsletters')) {
          if (!data.slug) continue
          if (data.status && data.status !== 'sent' && data.status !== 'archived') continue
        }
        out.push({
          href: basePathFor(data.slug || slug),
          title: data.title || titleFromSlug(slug),
          description: data.description || data.summary,
          tags: Array.isArray(data.tags) ? data.tags : tagsFromHref(slug),
          type: dirRel.includes('newsletter') ? 'newsletter' : dirRel.includes('guides') ? 'guide' : 'blog',
        })
      } catch {
        /* skip malformed entries */
      }
    }
  } catch {
    /* directory may not exist */
  }
  return out
}

/**
 * Regex-extract entries from a TS registry file.
 * Matches simple `slug: 'xxx', title: 'yyy'` (or `name:`) object literals.
 * Lossy by design — gets the slug+title for fuzzy match, ignores everything else.
 */
function extractFromTsRegistry(rel, type, hrefBuilder) {
  /** @type {Route[]} */
  const out = []
  try {
    const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8')
    const objectRegex = /\{[^{}]*?slug:\s*['"]([^'"]+)['"][^{}]*?(?:title|name):\s*['"]([^'"]+)['"][^{}]*?\}/gs
    let m
    while ((m = objectRegex.exec(raw)) !== null) {
      const [, slug, title] = m
      out.push({
        href: hrefBuilder(slug),
        title,
        tags: tagsFromHref(slug),
        type,
      })
    }
  } catch {
    /* file may not exist */
  }
  return out
}

// ─────────────────────────────────────────────────────────
// Static page catalog (lifted from app/sitemap.ts)
// Hand-curated because these aren't backed by a registry.
// ─────────────────────────────────────────────────────────

/** @type {Route[]} */
const STATIC_ROUTES = [
  // Core
  { href: '/', title: 'FrankX', description: 'AI Architect, top creator, humble excellence', type: 'core' },
  { href: '/about', title: 'About', type: 'core' },
  { href: '/blog', title: 'Blog', type: 'core' },
  { href: '/products', title: 'Products', type: 'core' },
  { href: '/prompt-library', title: 'Prompt Library', type: 'core' },
  { href: '/resources', title: 'Resources', type: 'core' },
  { href: '/guides', title: 'Guides', type: 'core' },
  { href: '/creators', title: 'For Creators', type: 'core' },
  { href: '/students', title: 'For Students', type: 'core' },
  { href: '/music-lab', title: 'Music Lab', description: 'AI music production', type: 'core' },

  // Tools
  { href: '/tools', title: 'Tools', type: 'tool' },
  { href: '/tools/roi-calculator', title: 'ROI Calculator', type: 'tool' },
  { href: '/tools/strategy-canvas', title: 'Strategy Canvas', type: 'tool' },
  { href: '/tools/builder', title: 'Builder', type: 'tool' },
  { href: '/tools/visual-intelligence', title: 'Visual Intelligence', type: 'tool' },

  // Assessments
  { href: '/assessment', title: 'Assessment', type: 'tool' },
  { href: '/assessment/creative', title: 'Creative Assessment', type: 'tool' },
  { href: '/assessment/advanced', title: 'Advanced Assessment', type: 'tool' },
  { href: '/ai-assessment', title: 'AI Assessment', type: 'tool' },
  { href: '/soul-frequency-quiz', title: 'Soul Frequency Quiz', type: 'tool' },

  // Community
  { href: '/community', title: 'Community', type: 'community' },
  { href: '/coaching', title: 'Coaching', type: 'community' },
  { href: '/inner-circle', title: 'Inner Circle', description: 'Premium community', type: 'community' },
  { href: '/vault', title: 'Vault', type: 'community' },
  { href: '/labs', title: 'Labs', type: 'community' },
  { href: '/drops', title: 'Drops', type: 'community' },
  { href: '/skills', title: 'Skills', type: 'community' },
  { href: '/skills/builder', title: 'Skills Builder', type: 'community' },
  { href: '/testimonials', title: 'Testimonials', type: 'community' },
  { href: '/affiliates', title: 'Affiliates', type: 'community' },
  { href: '/newsletter', title: 'Newsletter', type: 'core' },
  { href: '/newsletter/archive', title: 'Newsletter Archive', type: 'newsletter' },
  { href: '/workshops', title: 'Workshops', type: 'core' },
  { href: '/team', title: 'Team', type: 'community' },
  { href: '/founders-circle', title: "Founder's Circle", type: 'community' },

  // Learning
  { href: '/courses', title: 'Courses', type: 'core' },
  { href: '/courses/conscious-ai-foundations', title: 'Conscious AI Foundations', type: 'core' },
  { href: '/courses/agent-architecture-systems', title: 'Agent Architecture Systems', type: 'core' },
  { href: '/courses/creator-business-systems', title: 'Creator Business Systems', type: 'core' },
  { href: '/courses/build-your-ai-creator-os', title: 'Build Your AI Creator OS', type: 'core' },
  { href: '/learning-paths', title: 'Learning Paths', type: 'core' },

  // Workshops (canonical URLs)
  { href: '/workshops/ikigai-branding', title: 'Ikigai Branding Workshop', tags: ['ikigai', 'branding', 'workshop', 'personal', 'positioning'], type: 'workshop' },
  { href: '/workshops/ikigai-content-studio', title: 'Ikigai Content Studio', tags: ['ikigai', 'content', 'studio', 'workshop'], type: 'workshop' },
  { href: '/workshops/personal-ai-coe', title: 'Personal AI Center of Excellence', tags: ['personal', 'ai', 'coe', 'workshop'], type: 'workshop' },
  { href: '/workshops/sovereign-leadership', title: 'Sovereign Leadership', tags: ['sovereign', 'leadership', 'workshop'], type: 'workshop' },
  { href: '/workshops/ai-2026-graduates', title: 'AI for 2026 Graduates', type: 'workshop' },
  { href: '/workshops/build-first-ai-agent', title: 'Build Your First AI Agent', type: 'workshop' },
  { href: '/workshops/ai-music-masterclass', title: 'AI Music Masterclass', type: 'workshop' },

  // Content
  { href: '/content-studio', title: 'Content Studio', type: 'core' },
  { href: '/creation-chronicles', title: 'Creation Chronicles', type: 'section' },
  { href: '/intelligence-atlas', title: 'Intelligence Atlas', type: 'section' },
  { href: '/golden-age', title: 'Golden Age', type: 'section' },
  { href: '/golden-age/chapter-01-when-creation-calls', title: 'When Creation Calls', type: 'section' },
  { href: '/feed', title: 'Feed', type: 'section' },
  { href: '/realm', title: 'Realm', type: 'section' },
  { href: '/gallery', title: 'Gallery', type: 'section' },
  { href: '/studio', title: 'Studio', description: 'Content operations hub', type: 'section' },
  { href: '/studio/visual', title: 'Visual Intelligence Studio', type: 'section' },

  // AI
  { href: '/agents', title: 'Agents', type: 'section' },
  { href: '/agent-team', title: 'Agent Team', type: 'section' },
  { href: '/ai-architecture', title: 'AI Architecture', type: 'section' },
  { href: '/ai-architecture/blueprints', title: 'AI Architecture Blueprints', type: 'section' },
  { href: '/ai-architecture/multi-cloud-comparison', title: 'Multi-Cloud AI Comparison', type: 'section' },
  { href: '/developers', title: 'For Developers', type: 'section' },
  { href: '/automation', title: 'Automation', type: 'section' },
  { href: '/build', title: 'Build', type: 'section' },
  { href: '/start', title: 'Start Here', type: 'section' },

  // Papa
  { href: '/papa', title: 'Papa — In Memory', type: 'section' },
  { href: '/papa/leben', title: 'Papa — Leben', type: 'section' },
  { href: '/papa/en', title: 'Papa — English', type: 'section' },
  { href: '/papa/en/life', title: 'Papa — Life', type: 'section' },

  // Audience
  { href: '/for/creators', title: 'For Creators', type: 'core' },
  { href: '/for/architects', title: 'For AI Architects', type: 'core' },

  // Utility
  { href: '/search', title: 'Search', type: 'static' },
  { href: '/contact', title: 'Contact', type: 'static' },
  { href: '/roadmap', title: 'Roadmap', type: 'static' },
  { href: '/templates', title: 'Templates', type: 'static' },
  { href: '/resources/templates', title: 'Resource Templates', type: 'static' },
  { href: '/updates', title: 'Updates', type: 'static' },
  { href: '/free-playbook', title: 'Free Playbook', type: 'static' },
  { href: '/changelog', title: 'Changelog', type: 'static' },
  { href: '/linktree', title: 'Links', type: 'static' },

  // Legal
  { href: '/privacy', title: 'Privacy', type: 'static' },
  { href: '/terms', title: 'Terms', type: 'static' },
  { href: '/legal', title: 'Legal', type: 'static' },

  // Sections
  { href: '/youtube', title: 'YouTube', type: 'section' },
  { href: '/opus-pro', title: 'Opus Pro', type: 'section' },
  { href: '/watch', title: 'Watch', type: 'video' },
  { href: '/watch/shorts', title: 'Shorts', type: 'video' },
  { href: '/rituals', title: 'Rituals', type: 'section' },
  { href: '/vision', title: 'Vision', type: 'section' },
  { href: '/soulbook', title: 'Soulbook', type: 'section' },
  { href: '/soulbook/7-pillars', title: 'Seven Pillars', type: 'section' },
  { href: '/soulbook/assessment', title: 'Soulbook Assessment', type: 'section' },
  { href: '/soulbook/golden-path', title: 'Golden Path', type: 'section' },
  { href: '/soulbook/life-symphony', title: 'Life Symphony', type: 'section' },
  { href: '/soulbook/vault', title: 'Soulbook Vault', type: 'section' },
  { href: '/ai-world', title: 'AI World', type: 'section' },
  { href: '/ai-ops', title: 'AI Ops', type: 'section' },
  { href: '/ai-ops/architecture', title: 'AI Ops — Architecture', type: 'section' },
  { href: '/ai-ops/patterns', title: 'AI Ops — Patterns', type: 'section' },
  { href: '/ai-ops/models-2026', title: 'AI Models 2026', type: 'section' },
  { href: '/ai-ops/maturity', title: 'AI Maturity', type: 'section' },
  { href: '/ai-ops/accelerator-packs', title: 'Accelerator Packs', type: 'section' },
  { href: '/ai-ops/agi-ready', title: 'AGI Ready', type: 'section' },
  { href: '/ai-architect-academy', title: 'AI Architect Academy', type: 'section' },
  { href: '/see-through-the-noise', title: 'See Through the Noise', type: 'section' },
  { href: '/links', title: 'Links', type: 'static' },
  { href: '/learn', title: 'Learn', type: 'core' },
  { href: '/showcase', title: 'Showcase', type: 'section' },
  { href: '/downloads', title: 'Downloads', type: 'section' },
  { href: '/design-system', title: 'Design System', type: 'section' },
  { href: '/design', title: 'Design', type: 'section' },
  { href: '/design-lab', title: 'Design Lab', type: 'section' },
  { href: '/music', title: 'Music', type: 'section' },

  // ACOS
  { href: '/acos', title: 'ACOS — Agentic Creator OS', type: 'section' },
  { href: '/acos/agents', title: 'ACOS Agents', type: 'section' },

  // Intelligence systems
  { href: '/starlight-intelligence-system', title: 'Starlight Intelligence System', type: 'section' },
  { href: '/intelligence-system', title: 'Investment Intelligence System', type: 'section' },
  { href: '/sis', title: 'SIS', type: 'section' },
  { href: '/intelligence-map', title: 'Intelligence Map', type: 'section' },

  // Plan + inspiration
  { href: '/plan', title: 'Plan', type: 'section' },
  { href: '/inspiration', title: 'Inspiration', type: 'section' },

  // Research
  { href: '/research', title: 'Research', type: 'research' },
  { href: '/research/sources', title: 'Research Sources', type: 'research' },
  { href: '/research/methodology', title: 'Research Methodology', type: 'research' },

  // Library OS
  { href: '/library', title: 'Library', description: 'Book intelligence system', type: 'library' },
  { href: '/library/approach', title: 'Library — Approach', type: 'library' },
  { href: '/library/build', title: 'Library — Build', type: 'library' },
  { href: '/library/quotes', title: 'Library — Quotes', type: 'library' },

  // OS hub
  { href: '/os', title: 'FrankX OS', type: 'os' },

  // Partnerships
  { href: '/partnerships', title: 'Partnerships', type: 'partnership' },
  { href: '/partners', title: 'Partners', type: 'partnership' },

  // Newsletter
  { href: '/inner-circle', title: 'Inner Circle', type: 'community' },

  // Other live pages I've seen in the repo
  { href: '/ai-architect', title: 'AI Architect', type: 'section' },
  { href: '/ai-evolution', title: 'AI Evolution', type: 'section' },
  { href: '/visionaries', title: 'Visionaries', type: 'section' },
  { href: '/agentic-ai-center', title: 'Agentic AI Center', type: 'section' },
  { href: '/agentic-creator-os', title: 'Agentic Creator OS', type: 'section' },
  { href: '/products/agentic-creator-os', title: 'Agentic Creator OS — Product', type: 'product' },
  { href: '/chronicle', title: 'Chronicle', type: 'section' },
  { href: '/bio', title: 'Bio', type: 'static' },
  { href: '/founders-circle', title: "Founder's Circle", type: 'section' },
  { href: '/inner-circle', title: 'Inner Circle', type: 'community' },
  { href: '/shop', title: 'Shop', type: 'section' },
  { href: '/collectibles/trading-cards', title: 'Trading Cards', type: 'section' },
  { href: '/globe', title: 'Atlas Globe (EN)', type: 'section' },
  { href: '/erde', title: 'Atlas Globe (DE)', type: 'section' },
  { href: '/svijet', title: 'Atlas Globe (HR)', type: 'section' },
  { href: '/insights', title: 'Insights', type: 'section' },
  { href: '/community', title: 'Community', type: 'community' },
  { href: '/os/watch', title: 'OS — Watch', type: 'os' },
  { href: '/os/workshop', title: 'OS — Workshop', type: 'os' },
  { href: '/os/aco', title: 'OS — ACO', type: 'os' },
  { href: '/os/acos', title: 'OS — ACOS', type: 'os' },
  { href: '/os/coe-hub', title: 'OS — CoE Hub', type: 'os' },
  { href: '/os/library', title: 'OS — Library', type: 'os' },
  { href: '/os/sis', title: 'OS — Starlight Intelligence', type: 'os' },
  { href: '/os/visual-intelligence', title: 'OS — Visual Intelligence', type: 'os' },
]

// ─────────────────────────────────────────────────────────
// Main enumerator
// ─────────────────────────────────────────────────────────

/**
 * Walk app/ to auto-discover every static `page.{tsx,mdx}` route.
 * Skips:
 *   - route groups (parens) — Next.js convention for org without affecting URL
 *   - private folders starting with `_`
 *   - api/, admin/ (admin is auth-gated; covered separately)
 *   - dynamic segments [slug] — those are resolved via registry walks below
 *   - parallel/interception routes (@*, (..))
 *
 * This is additive: STATIC_ROUTES still wins for entries with hand-curated
 * titles/descriptions/tags; auto-discovered routes get a derived title only.
 *
 * @returns {Route[]}
 */
function discoverAppRoutes() {
  const appDir = path.join(ROOT, 'app')
  /** @type {Route[]} */
  const out = []

  function walk(dir, segments) {
    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    // Check if this directory has a page.tsx / page.mdx → it's a real route
    const hasPage = entries.some(
      (e) => e.isFile() && (e.name === 'page.tsx' || e.name === 'page.mdx' || e.name === 'page.jsx')
    )
    if (hasPage) {
      const href = '/' + segments.join('/')
      out.push({
        href: href === '/' ? '/' : href,
        title: segments.length === 0 ? 'FrankX' : titleFromSlug(segments[segments.length - 1]),
        tags: segments.flatMap((s) => s.split('-')).filter((t) => t.length > 1),
        type: 'section',
      })
    }
    // Recurse into subdirectories
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const name = entry.name
      if (name.startsWith('_')) continue
      if (name.startsWith('.')) continue
      if (name === 'api') continue
      if (name === 'admin') continue
      if (name.startsWith('(') && name.endsWith(')')) {
        // Route group — recurse but don't add to path
        walk(path.join(dir, name), segments)
        continue
      }
      if (name.startsWith('@')) continue // parallel route
      if (name.startsWith('[') && name.endsWith(']')) continue // dynamic segment — registry walks handle these
      walk(path.join(dir, name), [...segments, name])
    }
  }

  try {
    walk(appDir, [])
  } catch {
    /* app dir may not exist in tests */
  }
  return out
}

/**
 * Enumerate every public route on frankx.ai.
 * Order: static catalog (rich metadata) → app/ file-walk (auto-discovery) →
 *        content registries → MDX file walks.
 * Dedup at the end keeps the FIRST occurrence per href, which preserves the
 * richer STATIC_ROUTES entry when both sources have it.
 * @returns {Route[]}
 */
export function enumerateRoutes() {
  /** @type {Route[]} */
  const routes = [...STATIC_ROUTES, ...discoverAppRoutes()]

  // 1. content-index.json — rich blog + product metadata (88 entries)
  const contentIndex = readJson('data/content-index.json')
  if (contentIndex?.entries) {
    for (const entry of contentIndex.entries) {
      if (!entry.href) continue
      routes.push({
        href: entry.href,
        title: entry.title,
        description: entry.description,
        tags: entry.tags,
        type: entry.type === 'blog' ? 'blog' : entry.type === 'product' ? 'product' : 'section',
      })
    }
  }

  // 2. Blog MDX (catch entries not in content-index)
  routes.push(...walkMdx('content/blog', (slug) => `/blog/${slug}`))

  // 3. Guides MDX
  routes.push(...walkMdx('content/guides', (slug) => `/guides/${slug}`))

  // 4. Newsletter issues
  routes.push(...walkMdx('content/newsletters/issues', (slug) => `/newsletter/archive/${slug}`))

  // 5. Products
  const products = readJson('data/products.json')
  if (Array.isArray(products)) {
    for (const p of products) {
      if (!p.slug) continue
      routes.push({
        href: `/products/${p.slug}`,
        title: p.title || p.name || titleFromSlug(p.slug),
        description: p.description || p.tagline,
        tags: p.tags || tagsFromHref(p.slug),
        type: 'product',
      })
    }
  }

  // 6. Books — TS registry, regex-extracted
  routes.push(...extractFromTsRegistry('data/book-reviews.ts', 'library', (slug) => `/library/${slug}`))

  // 7. OS modules — TS registry, regex-extracted
  routes.push(...extractFromTsRegistry('data/os-modules.ts', 'os', (slug) => `/os/${slug}`))

  // 8. AI architecture prototypes/blueprints. The same prototype registry backs
  // /prototype/[id], /blueprint/[slug], and /ai-architecture/[slug].
  const architecturePrototypes = readJson('data/ai-architecture/prototypes.json')
  if (Array.isArray(architecturePrototypes)) {
    for (const p of architecturePrototypes) {
      if (!p.slug) continue
      const base = {
        title: p.title || titleFromSlug(p.slug),
        description: p.subtitle || p.metaDescription || p.overview,
        tags: p.tags || tagsFromHref(p.slug),
        type: 'section',
      }
      routes.push(
        { href: `/prototype/${p.slug}`, ...base },
        { href: `/blueprint/${p.slug}`, ...base },
        { href: `/ai-architecture/${p.slug}`, ...base },
      )
    }
  }

  // 9. Workshops registry (if it has additional entries beyond the static catalog)
  routes.push(...extractFromTsRegistry('data/workshops.ts', 'workshop', (slug) => `/workshops/${slug}`))

  // 10. Video vault — individual short detail pages
  const vault = readJson('data/video-vault-100.json')
  if (Array.isArray(vault)) {
    for (const v of vault) {
      if (!v.id || v.format !== 'short') continue
      routes.push({
        href: `/watch/shorts/${v.id}`,
        title: v.title || titleFromSlug(v.id),
        description: v.description,
        tags: ['short', 'video', ...(v.tags || [])],
        type: 'video',
      })
    }
  }

  // 11. Research domains (TS registry — uses different naming)
  try {
    const raw = fs.readFileSync(path.join(ROOT, 'lib/research/domains.ts'), 'utf8')
    const objectRegex = /\{[^{}]*?slug:\s*['"]([^'"]+)['"][^{}]*?(?:title|name):\s*['"]([^'"]+)['"][^{}]*?\}/gs
    let m
    while ((m = objectRegex.exec(raw)) !== null) {
      const [, slug, title] = m
      routes.push({
        href: `/research/${slug}`,
        title,
        tags: ['research', ...tagsFromHref(slug)],
        type: 'research',
      })
    }
  } catch {
    /* may not exist */
  }

  // 12. Partnerships
  try {
    const partnershipsIndex = path.join(ROOT, 'content/partnerships')
    const files = fs.readdirSync(partnershipsIndex)
    for (const file of files) {
      if (!file.endsWith('.mdx') && !file.endsWith('.md') && !file.endsWith('.json') && !file.endsWith('.ts')) continue
      const slug = file.replace(/\.(mdx|md|json|ts)$/, '')
      if (slug === 'index' || slug === 'types') continue
      routes.push({
        href: `/partnerships/${slug}`,
        title: titleFromSlug(slug),
        tags: ['partnership', slug],
        type: 'partnership',
      })
    }
  } catch {
    /* may not exist */
  }

  // 13. ACOS Packs (dynamic routes based on data/acos/agents.ts)
  try {
    const raw = fs.readFileSync(path.join(ROOT, 'data/acos/agents.ts'), 'utf8')
    const idRegex = /id:\s*['"]([^'"]+)['"]/g
    let m
    const ids = []
    while ((m = idRegex.exec(raw)) !== null) {
      if (!ids.includes(m[1]) && m[1] !== 'content-index') {
        ids.push(m[1])
      }
    }
    const knownPillars = ['content', 'music', 'visuals', 'books', 'workshops', 'research', 'products', 'business', 'personal', 'community', 'meta']
    for (const id of ids) {
      if (knownPillars.includes(id)) {
        routes.push({
          href: `/agents/packs/${id}`,
          title: `${titleFromSlug(id)} Pack`,
          tags: ['agents', 'pack', id],
          type: 'section',
        })
      }
    }
  } catch {
    /* may not exist */
  }

  // Deduplicate by href, keeping the first (most-detailed) entry per URL
  const seen = new Set()
  const deduped = []
  for (const r of routes) {
    if (seen.has(r.href)) continue
    seen.add(r.href)
    deduped.push(r)
  }

  return deduped
}

/** Curated alias map → 301 redirects. Loaded by next.config.mjs + middleware. */
export function loadAliases() {
  const raw = readJson('data/redirect-aliases.json')
  if (!raw) return {}
  // New schema: { $schema, aliases: { from: to, ... } }
  // Legacy schema (pre-2026-05-21): plain { from: to, ... } map
  if (raw.aliases && typeof raw.aliases === 'object') return raw.aliases
  // Strip $schema/_comment keys from legacy flat map if present
  const out = {}
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === 'string' && k.startsWith('/')) out[k] = v
  }
  return out
}
