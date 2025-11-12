# V5 Development - File Reference & Navigation Guide

## Critical File Locations (All Paths Absolute)

### Configuration & Build
```
/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website/
├── next.config.js                 # Next.js configuration, redirects, image rules
├── tsconfig.json                  # TypeScript compiler options
├── tailwind.config.ts             # Design tokens, colors, animations
├── package.json                   # Dependencies, scripts (npm run dev|build)
├── vercel.json                    # Vercel deployment settings
├── .eslintrc.json                 # Linting rules
└── CLAUDE.md                      # Project-specific Claude instructions
```

### Root Layouts & Entry Points
```
/app/
├── layout.tsx                     # Root layout (metadata, navigation, footer)
├── page.tsx                       # Homepage entry point (uses V4HomePage)
├── not-found.tsx                  # 404 page
├── error.tsx                      # Global error boundary
└── globals.css                    # Global styles
```

### Page Routes (Key Pages)
```
/app/
├── blog/
│   ├── page.tsx                   # Blog hub with category/tag filters
│   └── [slug]/page.tsx            # Dynamic article reader
├── products/
│   ├── page.tsx                   # Products gallery
│   ├── [slug]/page.tsx            # Dynamic product pages
│   └── [slug]/BuyButton.tsx       # Purchase CTA component
├── resources/
│   ├── page.tsx                   # Free resources hub
│   └── templates/page.tsx         # Template gallery
├── prompt-library/
│   ├── page.tsx                   # Prompt library home
│   ├── [category]/page.tsx        # Category view
│   └── [category]/[id]/page.tsx   # Individual prompt
├── music-lab/page.tsx             # Music showcase
├── about/page.tsx                 # Founder story
├── team/page.tsx                  # Team showcase
├── community/page.tsx             # Community hub
├── assessment/page.tsx            # Unified assessment (consolidated)
├── contact/page.tsx               # Contact form
└── [many other pages...]          # 30+ additional routes
```

### API Routes
```
/app/api/
├── content/
│   ├── route.ts                   # GET: Blog content listing
│   └── generate/route.ts          # POST: Content generation
├── agents/route.ts                # GET: Agent data
├── music/route.ts                 # GET: Music catalog
├── newsletter/route.ts            # POST: Email subscription
├── subscribe/route.ts             # POST: Alternative subscription
├── notion/route.ts                # POST: Notion webhook
└── og/route.tsx                   # GET: Dynamic OG image generation
```

### Components - Layout & Navigation
```
/components/
├── Navigation.tsx                 # Multi-level navigation menu
├── Footer.tsx                     # Site-wide footer
└── EmailCapture.tsx               # Newsletter subscription form
```

### Components - Homepage
```
/components/home/
├── V4HomePage.tsx                 # Current homepage (uses 'use client')
├── V3HomePage.tsx                 # Previous version
├── V2HomePage.tsx                 # Earlier iteration
├── HomePage.tsx                   # Original version
├── OptimizedHomePage.tsx          # Performance variant
└── sections/
    ├── AgentProtocols.tsx         # Agent system showcase
    ├── FinalCTA.tsx               # Call-to-action sections
    ├── IntelligenceAtlasSpotlight.tsx
    ├── KeywordClusters.tsx        # SEO keyword display
    ├── Projects.tsx               # Project milestones
    ├── Resources.tsx              # Quick links
    ├── SegmentProfiles.tsx        # Creator persona cards
    ├── StrategicSpotlights.tsx    # Featured offerings
    ├── Testimonials.tsx           # Social proof
    └── Updates.tsx                # Recent updates feed
```

### Components - Blog System
```
/components/blog/
├── BlogCard.tsx                   # Featured/regular article card
├── BlogCardCompact.tsx            # Compact article variant
└── MDXComponents.tsx              # Custom MDX element renderers
```

### Components - Product System
```
/components/products/
├── ProductHero.tsx                # Product header section
├── ProductLanding.tsx             # Full product page layout
├── OfferStack.tsx                 # Pricing/offer display
├── TransformationList.tsx         # Transformation outcomes
├── ProofRail.tsx                  # Testimonial carousel
└── FinalCTA.tsx                   # Product call-to-action
```

### Components - Prompt Library
```
/components/prompt-library/
├── PromptLibraryView.tsx          # Main container
├── PromptLibrary.tsx              # Grid/list view
├── CategoryFilter.tsx             # Filter UI
├── PromptCard.tsx                 # Individual prompt card
├── PromptCategoryView.tsx         # Category landing page
└── PromptDetailView.tsx           # Detailed prompt viewer
```

### Components - Music & Media
```
/components/music/
├── SongCard.tsx                   # Music track card
└── SongGrid.tsx                   # Grid layout for songs

/components/intelligence-atlas/
└── IntelligenceAtlas.tsx          # Intelligence Atlas component
```

### Components - Team & Community
```
/components/team/
├── TeamMemberCard.tsx             # Individual team member
└── DepartmentSection.tsx          # Grouped team display

/components/recommendations/
└── Recommendations.tsx            # Recommendation system

/components/resources/
└── ResourcesPage.tsx              # Resources hub layout
```

### Components - Funnels & Forms
```
/components/funnels/
├── EmailCaptureForm.tsx           # Email signup form
├── EmailCapture.tsx               # Alternative email capture
└── CallToAction.tsx               # CTA component

/components/affiliates/
├── AffiliateLink.tsx              # Tracked affiliate links
├── AffiliateCard.tsx              # Affiliate program card
├── AffiliateBadge.tsx             # Visual badge
└── AffiliateDisclosure.tsx        # Legal disclosure
```

### Components - UI Primitives & Design System
```
/components/ui/
├── primitives.tsx                 # Core primitives: Surface, SectionHeading, Pill, StatBlock
├── badge.tsx                      # Badge components
├── GlassmorphicCard.tsx           # Glassmorphism cards
├── PremiumButton.tsx              # High-end button styles
├── InteractiveCard.tsx            # Interactive card component
├── AdvancedAnimations.tsx         # Framer Motion utilities
│   ├── ParallaxContainer
│   ├── StaggerContainer/Item
│   ├── FloatingElement
│   ├── MagneticHover
│   ├── MorphingBackground
│   ├── RevealAnimation
│   ├── GlowPulse
│   └── ScrollProgress
├── AnimatedBackground.tsx         # Background effects
├── LoadingStates.tsx              # Loading indicators
└── [UI components continue...]
```

### Libraries & Utilities
```
/lib/
├── blog.ts                        # Blog post management (146 lines)
│   ├── getAllBlogPosts()          # Recursive directory scan + cache
│   ├── getBlogPost(slug)
│   ├── getFeaturedPosts()
│   ├── getPostsByCategory()
│   ├── getPostsByTag()
│   ├── getAllCategories()
│   └── Category display names & header images
│
├── products.ts                    # Product data management (56 lines)
│   ├── getProductCards()
│   ├── getProductBySlug()
│   └── getProductById()
│
├── hub.ts                         # Hub page data structure (533 lines)
│   ├── HeroStat, HeroHighlight
│   ├── QuickAction, SegmentProfile
│   ├── UpdateEntry, ResourceCollection
│   ├── ProjectMilestone, KeywordCluster
│   ├── AgentProtocol, HomeSpotlight
│   └── Data definitions for home sections
│
├── prompts.ts                     # Prompt library management (727 lines)
│   ├── CATEGORIES (categories array)
│   ├── PROMPTS (100+ prompts)
│   ├── getFeaturedPrompts()
│   └── getPromptStats()
│
├── seo.ts                         # SEO configuration (94 lines)
│   ├── createMetadata()
│   ├── robotsConfig
│   └── siteConfig
│
├── content-loader.ts              # Content loading utilities (345 lines)
│   ├── loadContent()
│   ├── parseMarkdown()
│   └── generateSearchIndex()
│
├── agents.ts                      # Agent team data (87 lines)
│   └── claudeAgents (team member definitions)
│
├── team-members.ts                # Comprehensive team roster (578 lines)
│   ├── Team member profiles
│   ├── Department grouping
│   └── Role descriptions
│
├── intelligence-atlas.ts          # Atlas data structure (164 lines)
├── analytics.ts                   # Event tracking (127 lines)
├── ai-services.ts                 # AI service integrations (270 lines)
├── accessibility.ts               # WCAG utilities (165 lines)
├── responsive.ts                  # Responsive design helpers (219 lines)
├── text.ts                        # Text utilities (149 lines)
│   └── sanitizeDeepInPlace()
├── guides.ts                      # Guide content system (67 lines)
├── resources.ts                   # Resources data (31 lines)
├── utils.ts                       # Common utilities (13 lines)
│   └── cn() - classname merger
├── search.ts                      # Search utilities (20 lines)
├── icon-map.ts                    # Icon mapping (60 lines)
├── notion.ts                      # Notion integration (10 lines)
├── gtag.ts                        # Google Analytics (14 lines)
└── design/
    └── gradients.ts               # Design tokens (gradient presets)
```

### Data Files
```
/data/
├── products.json                  # Product registry (all 5-6 products)
│   ├── Creative AI Toolkit
│   ├── Vibe OS
│   ├── Agentic Creator OS
│   ├── Creation Chronicles
│   └── [additional products...]
├── songs.json                     # Music library (50+ tracks)
└── specs-roadmap.json             # Feature roadmap
```

### Content - Blog Articles
```
/content/blog/
├── 01-ai-doesnt-have-to-be-soulless.mdx
├── 02-the-soul-frequency-framework.mdx
├── 03-ai-guide-for-families-and-professionals.mdx
├── 04-conscious-ai-for-entrepreneurs.mdx
├── 05-music-as-consciousness-technology.mdx
├── 06-intelligence-revolution-2025.mdx
├── 07-agentic-creator-os.mdx
├── 08-golden-age-of-intelligence.mdx         # 110KB flagship
├── 09-reader-first-golden-age.mdx
├── 10-agentic-ai-roadmap-2025.mdx
├── 11-building-production-agentic-systems.mdx
├── 12-complete-guide-mcp-server-development.mdx
├── 13-enterprise-ai-governance-at-scale.mdx
├── agentic-seo-publishing-masterplan.mdx     # 113KB detailed
├── frankx-intelligence-atlas-volume-1.mdx    # 79KB flagship
└── [17 more articles...]
```

### Content - Guides
```
/content/guides/
└── [Guide content structure ready for future use]
```

### Public Assets
```
/public/
├── images/
│   ├── blog-ai-tech-header.png
│   ├── blog-conscious-header.png
│   ├── blog-creator-header.png
│   ├── blog-music-header.png
│   ├── blog-personal-dev-header.png
│   ├── hero-ai-hub-v4.png
│   ├── blog/
│   │   ├── blog-hero-aurora.svg
│   │   ├── agentic-creator-os-roadmap-2025.png
│   │   ├── agentic-systems-architecture.png
│   │   ├── ai-governance-framework.png
│   │   ├── conscious-ai-integration.png
│   │   ├── golden-age-intelligence-panels.svg
│   │   ├── intelligence-atlas-volume-1.svg
│   │   └── [50+ more images...]
│   └── [other images...]
├── og-image.png                   # 1200x630px default OG image
└── [other static assets...]
```

### Types & Type Definitions
```
/types/
├── products.ts                    # Product TypeScript interface
└── affiliates.ts                  # Affiliate type definitions
```

### Special Directories
```
/_image-archive/                   # Historical image versions
/Articles/                         # Article drafts or archive
/docs/                             # Documentation (if present)
/scripts/                          # Build and utility scripts
│   ├── generate_interlinked_html.mjs
│   ├── generate_feed.mjs
│   ├── generate_search_index.mjs
│   └── sync_notion_to_mdx.mjs
/agents/                           # Agent protocol definitions
/products/                         # Product detail files
/v1-enterprise-backup/             # Version 1 archive (can deprecate)
/v2/                               # Version 2 archive (can deprecate)
/reading-site/                     # Reading-specific site variant
```

---

## Key Function Reference

### Blog Management Functions
```typescript
// Location: /lib/blog.ts

getAllBlogPosts(): BlogPost[]
  // Returns all blog posts, sorted by date (newest first)
  // Uses React cache() for memoization

getBlogPost(slug: string): BlogPost | null
  // Fetch single post by slug

getFeaturedPosts(): BlogPost[]
  // Filter posts with featured: true, limit 3

getPostsByCategory(category: string): BlogPost[]
  // Filter by category (case-insensitive)

getPostsByTag(tag: string): BlogPost[]
  // Filter by tag (case-insensitive)

getAllCategories(): string[]
  // Return unique categories from all posts

getCategoryDisplayName(category: string): string
  // Map category key to UI-friendly name

getCategoryHeaderImage(category: string): string
  // Get category header image path
```

### Product Functions
```typescript
// Location: /lib/products.ts

getProductCards(): ProductCard[]
  // Transform products.json into card format for display

getProductBySlug(slug: string): ProductRecord
  // Fetch product by slug

getProductById(id: string): ProductRecord
  // Fetch product by ID
```

### SEO Functions
```typescript
// Location: /lib/seo.ts

createMetadata(options: MetadataOptions): Metadata
  // Generate Next.js metadata object with OG images, Twitter cards
```

---

## Component Import Paths

```typescript
// Design Primitives
import { Surface, SectionHeading, Pill, StatBlock } from '@/components/ui/primitives'
import { badge } from '@/components/ui/badge'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

// Animation Components
import {
  ParallaxContainer,
  StaggerContainer,
  StaggerItem,
  MagneticHover,
  MorphingBackground,
  RevealAnimation,
  GlowPulse,
  ScrollProgress
} from '@/components/ui/AdvancedAnimations'

// Blog Components
import BlogCard from '@/components/blog/BlogCard'
import BlogCardCompact from '@/components/blog/BlogCardCompact'
import MDXComponents from '@/components/blog/MDXComponents'

// Product Components
import ProductHero from '@/components/products/ProductHero'
import ProductLanding from '@/components/products/ProductLanding'
import OfferStack from '@/components/products/OfferStack'

// Layout
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Utilities
import { getAllBlogPosts, getFeaturedPosts } from '@/lib/blog'
import { getProductCards } from '@/lib/products'
import { createMetadata } from '@/lib/seo'
```

---

## Environment & Configuration

### Package Scripts
```bash
npm run dev           # Start development server on port 3000
npm run build         # Production build
npm run start         # Production server
npm run lint          # Run ESLint
npm run type-check    # TypeScript type checking
npm run gen:html      # Generate static HTML from content
npm run gen:feed      # Generate RSS feed
npm run gen:search    # Generate search index
npm run sync:notion   # Sync Notion to MDX (optional)
npm run roadmap:check # Daily roadmap check script
npm run watch         # Watch mode for content
```

### Environment Variables (Likely Needed)
```
NOTION_TOKEN=               # Notion API key
RESEND_API_KEY=             # Resend email service
NEXT_PUBLIC_SITE_URL=       # Public site URL
ANALYTICS_ID=               # Google Analytics or similar
AFFILIATE_TRACKING_ID=      # For affiliate links
```

---

## Quick Navigation Map

**For Homepage Work**: Start with V4HomePage.tsx + sections/ folder
**For Blog Updates**: Go to content/blog/ + lib/blog.ts
**For Product Updates**: See data/products.json + components/products/
**For Styling**: Check tailwind.config.ts + components/ui/
**For SEO**: Review lib/seo.ts + next.config.js
**For Navigation**: Edit components/Navigation.tsx
**For API Work**: See app/api/ routes
**For Images**: Store in public/images/, reference in components

---

## File Size Reference

```
lib/prompts.ts                  727 lines
lib/team-members.ts            578 lines
lib/hub.ts                      533 lines
components/home/V3HomePage.tsx  39,097 lines (large!)
components/home/V4HomePage.tsx  27,222 lines (large!)
content/blog/08-golden-age...   110KB (flagship article)
content/blog/agentic-seo...     113KB (detailed article)
lib/blog.ts                     146 lines (well-organized)
```

**Note**: Large files (V3/V4 HomePage) are good candidates for code-splitting.

---

**End of File Reference Guide**
