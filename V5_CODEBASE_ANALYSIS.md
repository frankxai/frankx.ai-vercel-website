# FrankX.AI Website - V5 Development Codebase Analysis

**Analysis Date:** November 12, 2025  
**Current Version:** V4 (Latest on main branch, v3 branch with modifications)  
**Tech Stack:** Next.js 16 + TypeScript + Tailwind CSS + Framer Motion + MDX  
**Deployment:** Vercel  

---

## EXECUTIVE SUMMARY

The FrankX.AI website is a sophisticated, creator-focused intelligence hub built with modern Next.js architecture. It implements a multi-agent validated content system, comprehensive product ecosystem, and cinematic design language. Current state is well-organized with clear separation of concerns, but shows signs of rapid iteration with some page consolidation needed. V5 should focus on creator experience enhancement, performance optimization, and stronger information architecture cohesion.

---

## 1. CURRENT PAGES & ROUTES

### Core User-Facing Pages (37 total routes)

**Homepage & Foundation**
- `/` - V4HomePage (current version, cinematic/command-center aesthetic)
- `/page.tsx` - Main entry point using V4HomePage component

**Education & Discovery**
- `/blog` - Blog hub with filtering by category/tag (22 published articles)
- `/blog/[slug]` - Dynamic blog post reader with MDX rendering
- `/resources` - Free templates, tools, and music (persona-based layout)
- `/music-lab` - Suno AI music showcase with featured sessions
- `/guides/[slug]` - Guide content system
- `/prompt-library` - Multi-category prompt library with search/filter
- `/prompt-library/[category]` - Category view
- `/prompt-library/[category]/[id]` - Individual prompt detail

**Products & Offers**
- `/products` - Product gallery (agent-team-validated cards)
- `/products/[slug]` - Dynamic product pages (5 active: Vibe OS, Creative AI Toolkit, Agentic Creator OS, Creation Chronicles, Generative Creator OS)
- `/products/vibe-os` - Specific product page
- `/products/agentic-creator-os` - Specific product page
- `/products/creative-ai-toolkit` - Specific product page
- `/products/creation-chronicles` - Specific product page
- `/products/generative-creator-os` - Specific product page

**Community & Social**
- `/community` - Community hub
- `/team` - Team member showcase (with department-based organization)
- `/about` - Founder story + operating pillars + milestones
- `/affiliates` - Affiliate program information

**Assessment & Engagement**
- `/assessment` - Unified assessment page (consolidated from 3 previous routes via 301 redirects)
- `/assessment/creative` - Creative assessment variant (redirects to /assessment?type=creative)
- `/assessment/advanced` - Advanced assessment variant (redirects to /assessment?type=advanced)

**Tools & Utilities**
- `/tools` - Tools hub
- `/tools/strategy-canvas` - Interactive strategy builder
- `/tools/roi-calculator` - ROI calculator
- `/tools/builder` - Generic builder tool

**Content & Special Pages**
- `/intelligence-atlas` - Intelligence Atlas showcase
- `/coaches/page.tsx` - Coaching offerings
- `/courses` - Course offerings
- `/courses/conscious-ai-foundations` - Specific course
- `/agentic-ai-center` - AI center information
- `/goal/page.tsx` - Goal-setting resource
- `/agent-team` - Agent protocol descriptions
- `/agents` - Agent showcase
- `/contact` - Contact form
- `/dashboard` - User dashboard (if logged in)
- `/onboarding` - Onboarding flow
- `/start` - Quick start guide
- `/search` - Search functionality
- `/thank-you` - Post-signup confirmation
- `/content-studio` - Content creation tools
- `/achievements` - Achievements/badges showcase
- `/insights` - Intelligence insights hub
- `/roadmap` - Product roadmap
- `/founder-playbook` - Founder resources
- `/creation-chronicles` - Chronicles redirect to /blog?category=chronicles (301)
- `/realm` - Community redirect (301 to /community)

### API Routes (7 total)
- `/api/agents` - Agent data endpoint
- `/api/content` - Blog content listing (currently simple directory reader)
- `/api/content/generate` - Content generation endpoint
- `/api/music` - Music data endpoint
- `/api/newsletter` - Newsletter subscription
- `/api/notion` - Notion integration
- `/api/og` - Dynamic OG image generation
- `/api/subscribe` - Alternative subscription endpoint

---

## 2. COMPONENT ARCHITECTURE & INVENTORY

### Core Layout Components
- **Navigation** (`Navigation.tsx`) - Multi-level nav with Products/Learn/Community/About dropdowns
- **Footer** (`Footer.tsx`) - Site-wide footer
- **Layout** (`layout.tsx`) - Root layout with SEO, theme setup, typography

### Home Page Sections (V4 Architecture)
Located in `/components/home/sections/`:
1. **AgentProtocols.tsx** - Agent system showcase
2. **FinalCTA.tsx** - Call-to-action sections
3. **IntelligenceAtlasSpotlight.tsx** - Featured content
4. **KeywordClusters.tsx** - SEO keyword organization
5. **Projects.tsx** - Current projects showcase
6. **Resources.tsx** - Quick resource links
7. **SegmentProfiles.tsx** - Creator persona cards
8. **StrategicSpotlights.tsx** - Featured offerings
9. **Testimonials.tsx** - Social proof
10. **Updates.tsx** - Recent updates feed

**Home Page Versions**
- `V4HomePage.tsx` - Current (uses sections above, cinematic aesthetic)
- `V3HomePage.tsx` - Previous version
- `V2HomePage.tsx` - Earlier iteration
- `HomePage.tsx` - Original
- `OptimizedHomePage.tsx` - Performance variant

### Blog Components
- **BlogCard.tsx** - Featured/regular blog card with image, metadata, hover effects
- **BlogCardCompact.tsx** - Compact list variant
- **MDXComponents.tsx** - Custom MDX renderers (headings, lists, quotes, code blocks, etc.)

### Product Components
- **ProductHero.tsx** - Product header with headline/promise
- **ProductLanding.tsx** - Full product page layout
- **OfferStack.tsx** - Pricing/offer section
- **TransformationList.tsx** - Transformation outcomes
- **ProofRail.tsx** - Social proof carousel
- **FinalCTA.tsx** - Product call-to-action

### Prompt Library Components
- **PromptLibraryView.tsx** - Main container
- **PromptLibrary.tsx** - Grid/list view
- **PromptLibraryView.tsx** - Alternative view
- **CategoryFilter.tsx** - Filter UI
- **PromptCard.tsx** - Individual prompt card
- **PromptCategoryView.tsx** - Category landing
- **PromptDetailView.tsx** - Detailed prompt viewer

### Music Components
- **SongCard.tsx** - Music track card
- **SongGrid.tsx** - Grid layout for songs

### Intelligence System
- **IntelligenceAtlas.tsx** - Main atlas component

### Team Components
- **TeamMemberCard.tsx** - Individual team member
- **DepartmentSection.tsx** - Grouped team display

### Search Components
- **SearchClient.tsx** - Client-side search interface
- **Search.tsx** - Search page

### Funnel Components
- **EmailCaptureForm.tsx** - Newsletter signup
- **EmailCapture.tsx** - Alternative email form
- **CallToAction.tsx** - CTA component

### Recommendations
- **Recommendations.tsx** - Personalized recommendations

### Roadmap
- **Roadmap.tsx** - Product roadmap visualization

### Resources
- **ResourcesPage.tsx** - Resources hub layout

### Affiliate Components
- **AffiliateLink.tsx** - Tracked affiliate links
- **AffiliateCard.tsx** - Affiliate program card
- **AffiliateBadge.tsx** - Visual badge
- **AffiliateDisclosure.tsx** - Legal disclosure

### UI Primitives & Design System (`/components/ui/`)

**Core Design Primitives**
- **primitives.tsx** - `Surface`, `SectionHeading`, `Pill`, `StatBlock` components
- **badge.tsx** - Badge component variants
- **GlassmorphicCard.tsx** - Glassmorphism effect cards
- **PremiumButton.tsx** - High-end button styles
- **InteractiveCard.tsx** - Interactive card with states

**Animation Components**
- **AdvancedAnimations.tsx** - Framer Motion utilities:
  - `ParallaxContainer` - Scroll-based parallax
  - `StaggerContainer` & `StaggerItem` - Stagger animations
  - `FloatingElement` - Perpetual floating motion
  - `MagneticHover` - Magnetic cursor following
  - `MorphingBackground` - Shape-shifting backgrounds
  - `RevealAnimation` - Reveal on scroll
  - `GlowPulse` - Glowing pulse effect
  - `ScrollProgress` - Scroll progress bar

**Effects & Visuals**
- **AnimatedBackground.tsx** - Background motion effects
- **LoadingStates.tsx** - Loading indicators
- **MessageCircle** - Messaging UI

---

## 3. CONTENT SYSTEM & BLOG ARCHITECTURE

### Content Structure
```
content/
├── blog/
│   ├── 01-ai-doesnt-have-to-be-soulless.mdx
│   ├── 02-the-soul-frequency-framework.mdx
│   ├── 03-ai-guide-for-families-and-professionals.mdx
│   ├── 04-conscious-ai-for-entrepreneurs.mdx
│   ├── 05-music-as-consciousness-technology.mdx
│   ├── 06-intelligence-revolution-2025.mdx
│   ├── 07-agentic-creator-os.mdx
│   ├── 08-golden-age-of-intelligence.mdx (110KB - flagship)
│   ├── 09-reader-first-golden-age.mdx
│   ├── 10-agentic-ai-roadmap-2025.mdx
│   ├── 11-building-production-agentic-systems.mdx
│   ├── 12-complete-guide-mcp-server-development.mdx
│   ├── 13-enterprise-ai-governance-at-scale.mdx
│   ├── agentic-seo-publishing-masterplan.mdx (113KB - detailed)
│   ├── frankx-intelligence-atlas-volume-1.mdx (79KB - flagship)
│   └── [17 more articles...]
│
└── guides/
    └── (future guide content)
```

### Blog Management (`lib/blog.ts`)

**Key Functions**
- `getAllBlogPosts()` - Cached, recursive directory scan
- `getBlogPost(slug)` - Get single post
- `getFeaturedPosts()` - Posts marked as `featured: true`
- `getPostsByCategory(category)` - Filter by category
- `getPostsByTag(tag)` - Filter by tag
- `getAllCategories()` - Get unique categories
- `getCategoryDisplayName(category)` - UI-friendly names

**Category System**
- `ai-tech` → "AI & Technology"
- `conscious` → "Conscious AI"
- `creator` → "Creator Economy"
- `general` → "Featured"
- `music` → "AI Music"
- `personal-dev` → "Personal Development"

**Blog Post Interface**
```typescript
interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: string
  keywords?: string[]
  readingGoal?: string
  content: string
  featured?: boolean
  sourceCategory?: string  // Track subdirectory
}
```

**Frontmatter Extraction**
- Uses `gray-matter` for YAML parsing
- Uses `reading-time` for article metrics
- Normalizes variations in frontmatter fields

**Category Header Images**
- Stored in `/public/images/blog-*-header.png`
- Fallback to general hero image
- Generated with Nano Banana/Gemini Imagen (v4+)

---

## 4. STYLING & DESIGN SYSTEM

### Tailwind Configuration
- **Color Palette** (custom extensions):
  - FrankX Brand: purple (#6B46C1), blue (#00D4FF), gold (#FFD700), charcoal, cloud
  - Arcanean Spectrum: 12 shades from void to transcendent
  - Academy Colors: Harmonix Red, Scripta Teal, Lumina Blue, Kinetix Green, Syntaxa Yellow, Nexus Purple

- **Typography**:
  - Montserrat (brand headlines)
  - Inter (body)
  - Playfair Display (serif accents)

- **Spacing**: Default + custom 18, 88, 128 rem values

- **Animations**:
  - fade-in: 0.6s ease-in
  - slide-up: 0.8s ease-out
  - pulse-slow: 3s infinite
  - glow: 2s infinite

### Design Tokens (`lib/design/gradients.ts`)
```typescript
export const gradientPresets = {
  heroBase: 'bg-gradient-to-br from-midnight-900 via-midnight-950 to-black',
  heroAura: 'bg-midnight-radial',
  heroAurora: 'bg-aurora-vortex',
  heroPulse: 'bg-pulse-halo',
  glass: 'bg-glass-light',
  buttonAurora: 'bg-gradient-to-r from-aurora-600 via-pulse-600 to-primary-600',
  buttonSoft: 'bg-gradient-to-r from-midnight-500 via-nebula-500 to-aurora-500',
  cardBorder: 'border-white/10',
}
```

### Surface Tokens (`components/ui/primitives.tsx`)
- **Tones**: base, glass, highlight, transparent
- **Padding**: none, sm, md, lg
- **Glow Effect**: Optional shadow-brand-glow

### Text Classes
- `eyebrow-text` - Small caps, upper, tracking
- Default color: white/70 for descriptions, white for primary

---

## 5. ANIMATION & INTERACTION SYSTEM

### Framer Motion Integration
- **ParallaxContainer** - Scroll-based Y transform with spring physics
- **StaggerContainer/StaggerItem** - Sequential reveal animations
- **FloatingElement** - Perpetual Y-axis + rotation (configurable duration)
- **MagneticHover** - Cursor attraction effects (requires client component)
- **MorphingBackground** - SVG/shape transformations
- **RevealAnimation** - OnScroll visibility with margin offset
- **GlowPulse** - Opacity pulse with glow effect
- **ScrollProgress** - Progress bar tied to scroll position

### Usage Pattern
- Most animations use `whileInView` for scroll-triggered activation
- Viewport margin: -100px (triggers early for smoother UX)
- Spring physics: stiffness 400, damping 90 (responsive feel)
- Transitions: 0.5-0.8s duration with easeOut easing

---

## 6. DATA & CONFIGURATION FILES

### Products Registry (`data/products.json`)
- 5-6 active products with full merchandising
- Each product includes:
  - Headline, promise, summary, badge
  - Transformation bullets (3+ outcomes)
  - Social proof (stats, testimonials)
  - Offer details (price, CTA href, guarantee)
  - Modules (4+ sections)
  - Bonuses with values
  - Case studies with metrics
  - FAQ section

### Music Library (`data/songs.json`)
- 50+ AI-generated tracks
- Metadata: title, description, genre, duration, intention, color palette

### Specs & Roadmap (`data/specs-roadmap.json`)
- Future features tracking
- Integration roadmap

### Prompt Library (`lib/prompts.ts`) - 727 lines
- 100+ categorized prompts
- Categories: Claude, ChatGPT, Midjourney, Suno, Notion, etc.
- Featured prompts system
- Prompt statistics

---

## 7. DATA FETCHING & COMPONENT PATTERNS

### Server vs Client Components
- **Server**: All page.tsx files, layout, data fetching
- **Client**: Navigation (usePathname), home sections (Framer Motion), interactive tools
- **Hybrid**: Some pages (e.g., V4HomePage) marked 'use client' for animations

### Data Sources
1. **Static Files**: JSON (products, songs, specs)
2. **MDX Files**: Blog content via gray-matter + fs
3. **API Routes**: Simple endpoints for content enumeration
4. **External**: Notion integration stubs, newsletter service

### Caching Strategy
- `cache()` from React for `getAllBlogPosts()` (memoized within request)
- Static generation: pages revalidate via next/revalidate
- Dynamic routes: [slug] patterns for blog/guides/products

---

## 8. API ROUTES & BACKEND FUNCTIONALITY

### Implemented APIs
1. **GET /api/content** - Lists blog files (used by pre-build)
2. **POST /api/newsletter** - Email subscription (likely Resend integration)
3. **POST /api/subscribe** - Alternative subscription handler
4. **GET /api/agents** - Agent data (JSON response)
5. **GET /api/music** - Music catalog (JSON from songs.json)
6. **POST /api/content/generate** - Content generation stub
7. **POST /api/notion** - Notion webhook (stub)
8. **GET /api/og** - Dynamic OG image generation

### Dependencies
- **resend** (v6.1.2) - Email service
- **@notionhq/client** - Notion API
- **notion-to-md** - Notion markdown conversion

---

## 9. IMAGE SYSTEM & VISUAL ASSETS

### Public Images
- **Blog headers**: `/public/images/blog-*-header.png` (category-specific)
- **Article images**: `/public/images/blog/` (50+ PNG/SVG files)
- **Hero images**: `/public/images/hero-*.png`
- **Illustrations**: SVG diagrams for system architecture, roadmaps
- **Domain**: Unsplash remote patterns allowed (for user images)

### Image Strategy
- Category images assigned in `lib/blog.ts` CATEGORY_HEADER_IMAGES
- Next.js Image component used (optimized, lazy-loaded)
- Featured blog cards: 72-96px height with overlay gradient
- Regular cards: 52px height

---

## 10. SEO & METADATA

### SEO Configuration (`lib/seo.ts`)
- **Base URL**: https://frankx.ai
- **OG Image**: 1200x630px at /og-image.png
- **Twitter Handle**: @frankxai
- **Schema Markup**: JSON-LD Organization + Product offers

### Metadata Pattern
```typescript
export const metadata = createMetadata({
  title: 'Page Title',
  description: 'Meta description',
  keywords: ['keyword1', 'keyword2'],
  path: '/route'
})
```

### Structured Data
- Organization schema on homepage
- Product schemas for each offering
- LocalBusiness/Person schema for founder bio

---

## 11. BUILD & DEPLOYMENT CONFIGURATION

### Next.js 16 Setup
- **Turbopack**: Default (no webpack override)
- **MDX Support**: `@next/mdx` with custom config
- **Experimental**: `optimizePackageImports` for lucide-react, framer-motion

### Build Process
- **Pre-build Scripts**: 
  - `gen:html` - Generate static HTML from content
  - `gen:feed` - RSS feed generation
  - `gen:search` - Search index creation
  - `sync:notion` - Notion sync (optional)

### Redirects (301 Permanent)
- `/ai-assessment` → `/assessment`
- `/soul-frequency-*` → `/assessment`
- `/products/generative-creator-os` → `/products/agentic-creator-os`
- `/creation-chronicles` → `/blog?category=chronicles`
- `/realm` → `/community`

### Environment Variables
- No .env.example provided (check vercel.json)
- API keys likely: NOTION_TOKEN, RESEND_KEY, etc.

### Vercel Configuration
- Auto-deployment from main branch
- Production revalidation strategy for ISR
- Bot analytics enabled

---

## 12. CURRENT STATE ASSESSMENT

### Strengths
1. **Solid Architecture**: Clear separation of concerns, component reusability
2. **Content System**: Flexible MDX + category system, supports rapid updates
3. **Design Language**: Cohesive cinematic aesthetic, comprehensive animation library
4. **Performance**: React 19, Next.js 16, optimized imports, image handling
5. **Metadata**: SEO-first approach, structured data, multiple meta patterns
6. **Type Safety**: Full TypeScript with strict mode
7. **Accessibility**: Semantic HTML, lucide icons, contrast ratios
8. **Product System**: Robust product data structure with full merchandising

### Areas Needing Attention
1. **Page Consolidation**: 37+ routes, some redundant (assessment, chronicles, realm)
2. **API Routes**: Minimal business logic, mostly stubs or simple file ops
3. **Content Organization**: Blog flat in root, no subcategory structure (yet)
4. **Home Page Complexity**: V4HomePage large component, many sections to optimize
5. **Testing**: No test files visible (unit/E2E)
6. **Documentation**: No component storybook or design system docs
7. **Cache Invalidation**: Content changes may require rebuild
8. **Mobile Optimization**: Heavy reliance on Framer Motion could impact mobile performance

---

## 13. TECHNICAL CONSTRAINTS & CONSIDERATIONS

### Dependencies to Manage
- **Framer Motion**: 11.15.0 - Heavy animations may cause CLS on low-end devices
- **Next.js 16**: Uses Turbopack (experimental in v15, stable in v16)
- **lucide-react**: 468.0 - 468+ icons, bundled via optimizePackageImports
- **MDX Remote**: 5.0.0 - Remote MDX rendering for flexible content

### Performance Considerations
- Large blog files (110KB+) should be chunked or lazy-loaded
- Parallax animations on scroll may impact CLS/LCP metrics
- Bundle size: lucide + framer-motion are largest contributors
- Image optimization: Use Next.js Image with proper sizing

### Browser Compatibility
- CSS Grid/Flex heavily used (modern browsers only)
- CSS Variables (--primary-500, etc.) - ensure fallbacks
- Framer Motion: Requires ES6+ (transpile for older browsers if needed)

---

## 14. GAPS & OPPORTUNITIES FOR V5

### Content Gaps
1. **Subcategory Organization** - Blog could support nested categories
2. **Author System** - All posts authored by "Frank", could support team
3. **Related Posts** - No algorithm for suggesting similar content
4. **Comments/Discussion** - No reader engagement system
5. **Reading Lists** - No way to curate content into sequences

### Feature Gaps
1. **Full-Text Search** - Search.tsx exists but not fully implemented
2. **Recommended Reading** - No personalization engine
3. **Podcast/Video** - Media only includes music and written content
4. **Newsletter Archive** - No public archive of past emails
5. **Testimonial Management** - Hardcoded in product.json, not CMS-driven
6. **Live Events/Webinars** - No event system
7. **User Accounts** - Dashboard exists but no auth system visible
8. **Affiliate Dashboard** - Affiliates page lacks tracking/stats interface

### Design/UX Gaps
1. **Loading States** - Components exist but not used everywhere
2. **Error Boundaries** - error.tsx file exists but no granular error handling
3. **Responsive Optimization** - Some components may not shine on mobile
4. **Accessibility Enhancements** - WCAG 2.1 AA coverage needed
5. **Dark Mode Toggle** - Appears to be dark-only (next-themes installed but not used)
6. **Theme Customization** - No way for users to customize color/typography

### Performance Opportunities
1. **Code Splitting** - Home sections could be dynamically imported
2. **Image Optimization** - Batch conversion to WebP with fallbacks
3. **Animation Throttling** - Parallax/hover only on capable devices
4. **Content Streaming** - Long articles could stream/paginate
5. **Service Worker** - PWA for offline blog reading

### Infrastructure Gaps
1. **Analytics** - Analytics.ts exists but event tracking minimal
2. **A/B Testing** - No experiments/variant system
3. **Feature Flags** - No way to enable/disable features without deploy
4. **Rate Limiting** - APIs lack protection against abuse
5. **Logging** - No centralized error/event logging visible

---

## 15. RECOMMENDATIONS FOR V5 ARCHITECTURE

### Priority 1: Stabilization
1. **Consolidate Routes**: Reduce to ~25 core routes, archive legacy pages
2. **Formalize API**: Expand API routes with proper validation, error handling
3. **Add Testing**: Unit tests for utilities, E2E tests for critical paths
4. **Implement Search**: Finish search.tsx with Lunr integration (already in deps)

### Priority 2: Content Enhancement
1. **Dynamic Metadata**: Use blog frontmatter for all SEO
2. **Content Versioning**: Track article updates/revisions
3. **Reading Time Estimates**: Already calculated, surface in UI
4. **Content Relationships**: Build "related posts" using tag/category similarity
5. **Archive System**: Organize older content, don't delete

### Priority 3: Creator Experience
1. **Personalized Recommendations**: Product/content based on user behavior
2. **Reading Lists**: Curated sequences (e.g., "Start Here", "Go Deep")
3. **Progress Tracking**: Remember article read status (localStorage or auth)
4. **Social Features**: Sharing, bookmarking, highlighting
5. **Feedback Loop**: Reader comments, reactions, engagement metrics

### Priority 4: Performance
1. **Code Split Home**: Import sections dynamically, reduce main bundle
2. **Image Optimization**: WebP with PNG fallback, responsive srcsets
3. **Analytics Dashboard**: Track Core Web Vitals, user behavior
4. **Caching Strategy**: ISR for blog, SWR for product data
5. **Mobile-First**: Test animations on throttled networks

### Priority 5: Monetization
1. **Affiliate Tracking**: Proper LinkTracking/attribution
2. **Email Segmentation**: Based on content consumption
3. **Product Discovery**: Algorithmic recommendations
4. **Upsell Sequences**: Email automation post-course signup
5. **Revenue Attribution**: Connect content → product → revenue

---

## 16. FILE STRUCTURE REFERENCE

### Critical Files (Must Keep)
```
├── app/
│   ├── layout.tsx           # Root layout + metadata
│   ├── page.tsx             # Homepage entry
│   ├── blog/page.tsx        # Blog hub
│   ├── blog/[slug]/page.tsx # Article reader
│   ├── products/            # Product system
│   └── api/                 # API layer
├── components/
│   ├── Navigation.tsx       # Global nav
│   ├── Footer.tsx           # Global footer
│   ├── home/               # Homepage sections
│   ├── blog/               # Blog components
│   ├── ui/                 # Design primitives
│   └── products/           # Product components
├── lib/
│   ├── blog.ts             # Blog logic
│   ├── products.ts         # Product logic
│   ├── seo.ts              # SEO configuration
│   └── design/             # Design tokens
├── content/blog/            # Markdown/MDX articles
├── data/                    # JSON data stores
├── public/                  # Static assets
└── tailwind.config.ts       # Design system
```

### Build Artifacts (Safe to Remove)
```
├── .next/              # Build output
├── node_modules/       # Dependencies
├── .git/              # VCS (keep for history)
└── v1-enterprise-backup/   # Archive (can deprecate)
```

### Configuration Files
```
├── next.config.js      # Next.js settings
├── tsconfig.json       # TypeScript config
├── tailwind.config.ts  # Tailwind config
├── vercel.json         # Vercel deployment
└── .eslintrc.json      # Linting rules
```

---

## 17. SUMMARY TABLE: V5 MIGRATION CHECKLIST

| Category | Current State | V5 Priority | Recommendation |
|----------|---------------|-------------|-----------------|
| **Pages** | 37 routes, some redundant | CONSOLIDATE | Reduce to 25 core, archive 12 |
| **Components** | 50+ well-organized | OPTIMIZE | Code-split home, lazy-load sections |
| **Content** | 22 blog posts, flat structure | ENHANCE | Add subcategories, versioning |
| **Design** | Comprehensive, cohesive | REFINE | Document design system, add storybook |
| **Animation** | Rich Framer Motion usage | TEST | Measure CLS/LCP, add reduced-motion |
| **API** | Minimal, mostly stubs | EXPAND | Add validation, error handling, auth |
| **Search** | Partial Lunr setup | COMPLETE | Finish search.tsx implementation |
| **Analytics** | Installed but minimal | IMPLEMENT | Track events, funnel metrics |
| **Testing** | None visible | ADD | Unit + E2E tests for critical paths |
| **Performance** | Good, room for improvement | OPTIMIZE | Image WebP, dynamic imports, ISR |
| **Accessibility** | Good semantic HTML | ENHANCE | WCAG 2.1 AA compliance audit |
| **Security** | No obvious issues | REVIEW | API validation, rate limiting, CORS |
| **Documentation** | CLAUDE.md exists | EXPAND | Component catalog, API docs, runbooks |

---

## 18. NEXT STEPS FOR V5 KICKOFF

1. **Run Lighthouse Audit**: Baseline performance metrics
2. **Content Audit**: Map all 37 pages, identify duplicates
3. **User Testing**: Validate navigation, product discovery flows
4. **Performance Budget**: Set targets for bundle size, LCP, CLS
5. **Design System Docs**: Document all components, tokens, animations
6. **Roadmap Planning**: Sequence features by impact × effort
7. **Team Alignment**: Clarify ownership of content, code, design
8. **Deployment Strategy**: Staged rollout (staging → canary → production)

---

**End of Analysis**
