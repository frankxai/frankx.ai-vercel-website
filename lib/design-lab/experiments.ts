/**
 * Design Lab Experiment Registry
 *
 * Each experiment represents a design challenge where AI coding agents compete.
 * Navigable at /design-lab/[slug]. Outputs get rated and the best become products.
 */

// ── Types ──

export type ExperimentCategory = 'landing-page' | 'component' | 'dashboard' | 'marketing' | 'product-page'

export type ExperimentStatus = 'active' | 'judging' | 'complete' | 'upcoming'

export interface AgentEntry {
  agent: string
  tool: string // e.g. "Claude Code + ui-ux-pro-max", "v0.dev", "Cursor + shadcn"
  description: string
  screenshotUrl?: string // path to /public/images/design-lab/
  liveUrl?: string
  codeUrl?: string
  ratings: {
    design: number // 1-10
    code: number
    accessibility: number
    performance: number
    creativity: number
  }
  overallScore: number // computed average
  verdict: string // short summary
  isWinner?: boolean
  isProductized?: boolean
  productUrl?: string
}

export interface DesignExperiment {
  slug: string
  title: string
  subtitle: string
  description: string
  brief: string // the design challenge brief agents received
  category: ExperimentCategory
  status: ExperimentStatus
  icon: string // lucide icon name
  color: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'blue' | 'orange' | 'teal'
  entries: AgentEntry[]
  constraints: string[] // design constraints given to all agents
  judgingCriteria: string[]
  startedAt: string
  completedAt?: string
  highlights: { stat: string; label: string }[]
  relatedLinks: { label: string; href: string }[]
  lastUpdated: string
}

// ── Category Config ──

export const experimentCategoryConfig: Record<ExperimentCategory, { label: string; description: string; icon: string }> = {
  'landing-page': { label: 'Landing Pages', description: 'Full hero sections and landing page designs', icon: 'Layout' },
  component: { label: 'Components', description: 'Individual UI components and patterns', icon: 'Component' },
  dashboard: { label: 'Dashboards', description: 'Data-rich dashboard layouts and visualizations', icon: 'BarChart3' },
  marketing: { label: 'Marketing', description: 'Email templates, social cards, and marketing assets', icon: 'Megaphone' },
  'product-page': { label: 'Product Pages', description: 'E-commerce and SaaS product showcases', icon: 'ShoppingBag' },
}

// ── Status Config ──

export const experimentStatusConfig: Record<ExperimentStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: 'text-emerald-400' },
  judging: { label: 'Judging', color: 'text-amber-400' },
  complete: { label: 'Complete', color: 'text-blue-400' },
  upcoming: { label: 'Upcoming', color: 'text-slate-400' },
}

// ── Helpers ──

export function getExperimentBySlug(slug: string): DesignExperiment | undefined {
  return designExperiments.find((e) => e.slug === slug)
}

export function getExperimentsByCategory(category: ExperimentCategory): DesignExperiment[] {
  return designExperiments.filter((e) => e.category === category)
}

export function getExperimentsByStatus(status: ExperimentStatus): DesignExperiment[] {
  return designExperiments.filter((e) => e.status === status)
}

export function getWinningEntries(): { experiment: DesignExperiment; entry: AgentEntry }[] {
  return designExperiments.flatMap((exp) =>
    exp.entries.filter((e) => e.isWinner).map((entry) => ({ experiment: exp, entry }))
  )
}

export function getProductizedEntries(): { experiment: DesignExperiment; entry: AgentEntry }[] {
  return designExperiments.flatMap((exp) =>
    exp.entries.filter((e) => e.isProductized).map((entry) => ({ experiment: exp, entry }))
  )
}

// ── Experiment Data ──

export const designExperiments: DesignExperiment[] = [
  {
    slug: 'hero-section-showdown',
    title: 'Hero Section Showdown',
    subtitle: '3 AI agents compete to build the ultimate SaaS landing hero',
    description: 'The classic design challenge: build a stunning SaaS hero section with headline, subhead, CTA, and visual. Each agent received the same brief and constraints. The results reveal how different AI tools approach the same creative problem — from layout decisions to animation choices to accessibility defaults.',
    brief: 'Design a hero section for a fictional AI writing assistant called "Inkwell AI". Include: compelling headline, subheadline, primary CTA button, secondary link, and a visual element (illustration, screenshot, or abstract graphic). Must work on mobile. Dark theme preferred. Use modern design trends.',
    category: 'landing-page',
    status: 'complete',
    icon: 'Layout',
    color: 'violet',
    entries: [
      {
        agent: 'FORGE',
        tool: 'Claude Code + ui-ux-pro-max skill',
        description: 'Built a glassmorphic hero with animated gradient orbs, a floating product screenshot, and micro-interactions on hover. Used Framer Motion for entrance animations with useReducedMotion support. Tailwind-first, zero external CSS.',
        ratings: { design: 9, code: 9, accessibility: 8, performance: 8, creativity: 9 },
        overallScore: 8.6,
        verdict: 'Best overall design with strong animations and clean code. Accessibility could improve with better focus indicators.',
        isWinner: true,
        isProductized: true,
        productUrl: '/products/hero-templates',
      },
      {
        agent: 'External',
        tool: 'v0.dev (Vercel)',
        description: 'Generated a clean, minimal hero with a centered layout, gradient text headline, and a browser mockup visual. Shipped with shadcn/ui components. Quick iteration but less creative flair.',
        ratings: { design: 7, code: 8, accessibility: 7, performance: 9, creativity: 6 },
        overallScore: 7.4,
        verdict: 'Solid and production-ready but safe. Follows established patterns without pushing creative boundaries.',
      },
      {
        agent: 'External',
        tool: 'Cursor + shadcn/ui',
        description: 'Produced an asymmetric split layout with 3D perspective card on the right. Good use of shadows and depth. Code was verbose with some unnecessary wrapper divs.',
        ratings: { design: 8, code: 6, accessibility: 6, performance: 7, creativity: 8 },
        overallScore: 7.0,
        verdict: 'Creative layout approach but code quality needs work. Missing aria-labels and reduced motion support.',
      },
    ],
    constraints: [
      'Next.js 15 + TypeScript + Tailwind CSS',
      'No external UI libraries except shadcn/ui',
      'Must be responsive (mobile-first)',
      'Dark theme with brand color accent',
      'Under 50KB JavaScript bundle for the component',
      'WCAG 2.1 AA compliance target',
    ],
    judgingCriteria: [
      'Visual design quality and polish',
      'Code cleanliness and TypeScript correctness',
      'Accessibility (keyboard nav, screen readers, reduced motion)',
      'Performance (bundle size, render speed, CLS)',
      'Creative interpretation of the brief',
    ],
    startedAt: '2026-02-05',
    completedAt: '2026-02-06',
    highlights: [
      { stat: '3', label: 'Agent Entries' },
      { stat: '8.6', label: 'Winning Score' },
      { stat: '1', label: 'Productized' },
    ],
    relatedLinks: [
      { label: 'Hero Templates', href: '/products/hero-templates' },
      { label: 'Design System', href: '/design-system' },
    ],
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'dashboard-data-viz',
    title: 'Dashboard Data Viz Challenge',
    subtitle: 'Can AI agents build beautiful, functional analytics dashboards?',
    description: 'Dashboards are where design meets data. This experiment tested whether AI coding agents can create dashboards that are both visually compelling and functionally sound — with real chart components, responsive layouts, and accessible data tables. The brief emphasized information hierarchy and scannability.',
    brief: 'Build an analytics dashboard for a content creator platform. Show: total views (line chart), top content (bar chart), audience demographics (donut chart), recent activity feed, and key metric cards. Use realistic sample data. The dashboard should tell a story at a glance.',
    category: 'dashboard',
    status: 'complete',
    icon: 'BarChart3',
    color: 'cyan',
    entries: [
      {
        agent: 'FORGE',
        tool: 'Claude Code + ui-ux-pro-max skill',
        description: 'Created a bento-grid dashboard with glassmorphic cards, custom SVG charts (no chart library), and a real-time activity feed with staggered animations. Information hierarchy was excellent — key metrics scannable in under 3 seconds.',
        ratings: { design: 9, code: 8, accessibility: 7, performance: 7, creativity: 9 },
        overallScore: 8.0,
        verdict: 'Stunning visual design with custom charts. Performance takes a hit from SVG animations. Strong information hierarchy.',
        isWinner: true,
      },
      {
        agent: 'External',
        tool: 'v0.dev (Vercel)',
        description: 'Clean dashboard using Recharts library with shadcn/ui cards. Standard grid layout. Functional and familiar but visually generic. Good data table with sorting.',
        ratings: { design: 6, code: 8, accessibility: 8, performance: 8, creativity: 5 },
        overallScore: 7.0,
        verdict: 'Production-ready but uninspired. The safest choice for shipping fast, not for standing out.',
      },
      {
        agent: 'External',
        tool: 'Cursor + Tremor',
        description: 'Used Tremor UI for chart components. Good default aesthetics from the library. Layout was solid but felt like a template. Added a unique "content pulse" sparkline that was creative.',
        ratings: { design: 7, code: 7, accessibility: 7, performance: 8, creativity: 7 },
        overallScore: 7.2,
        verdict: 'Good use of Tremor library. The content pulse sparkline was a standout idea, but overall felt templated.',
      },
    ],
    constraints: [
      'Next.js 15 + TypeScript + Tailwind CSS',
      'Charts must use real (sample) data, not static images',
      'Responsive: works on desktop and tablet',
      'Must include at least 3 different chart types',
      'Color blind safe color palette',
      'Loading states for all async data sections',
    ],
    judgingCriteria: [
      'Information hierarchy — can you scan key metrics in 3 seconds?',
      'Chart clarity and data storytelling',
      'Responsive behavior and layout flexibility',
      'Code organization and component reusability',
      'Creative use of space and visual rhythm',
    ],
    startedAt: '2026-02-06',
    completedAt: '2026-02-07',
    highlights: [
      { stat: '3', label: 'Agent Entries' },
      { stat: '8.0', label: 'Winning Score' },
      { stat: '5', label: 'Chart Types' },
    ],
    relatedLinks: [
      { label: 'Dashboard Templates', href: '/products' },
    ],
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'pricing-page-battle',
    title: 'Pricing Page Battle',
    subtitle: 'The hardest page in SaaS — can AI agents nail pricing UX?',
    description: 'Pricing pages are notoriously difficult to design well. They need to communicate value, reduce friction, handle multiple tiers, and convert. This experiment tested whether AI agents can create pricing pages that balance aesthetics with conversion psychology — feature comparison tables, toggle billing, and trust signals.',
    brief: 'Design a pricing page for a developer tools SaaS with 3 tiers: Free, Pro ($29/mo), and Enterprise (custom). Include: monthly/annual toggle with savings badge, feature comparison table, FAQ section, and trust signals (logos or testimonials). The Pro tier should be visually emphasized as recommended.',
    category: 'product-page',
    status: 'active',
    icon: 'CreditCard',
    color: 'amber',
    entries: [
      {
        agent: 'FORGE',
        tool: 'Claude Code + ui-ux-pro-max skill',
        description: 'Building a pricing page with animated tier cards, a morphing monthly/annual toggle, and an expandable feature comparison matrix. Emphasizing the Pro tier with a glowing border and "Most Popular" badge.',
        ratings: { design: 0, code: 0, accessibility: 0, performance: 0, creativity: 0 },
        overallScore: 0,
        verdict: 'In progress — awaiting completion and judging.',
      },
      {
        agent: 'External',
        tool: 'v0.dev (Vercel)',
        description: 'Submission pending.',
        ratings: { design: 0, code: 0, accessibility: 0, performance: 0, creativity: 0 },
        overallScore: 0,
        verdict: 'Awaiting submission.',
      },
    ],
    constraints: [
      'Next.js 15 + TypeScript + Tailwind CSS',
      'Monthly/annual billing toggle with price animation',
      'Feature comparison table that works on mobile',
      'Must include social proof / trust signals',
      'CTA buttons must have clear hierarchy',
      'FAQ section with at least 5 questions',
    ],
    judgingCriteria: [
      'Conversion-focused layout and CTA hierarchy',
      'Feature comparison clarity on all screen sizes',
      'Billing toggle interaction quality',
      'Trust signal integration (logos, testimonials, badges)',
      'Overall polish and attention to micro-interactions',
    ],
    startedAt: '2026-02-07',
    highlights: [
      { stat: '2', label: 'Agent Entries' },
      { stat: '3', label: 'Pricing Tiers' },
      { stat: 'Active', label: 'Status' },
    ],
    relatedLinks: [],
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'shimmer-effects-showcase',
    title: 'Shimmer Effects Showcase',
    subtitle: 'CSS-only premium card effects — who builds the smoothest shimmer?',
    description: 'A deep dive into CSS-only visual effects: shimmer borders using CSS Houdini @property, cursor-following glow, aurora backgrounds, spotlight hover, magnetic click, and glassmorphism depth. The goal: zero JavaScript for the visual effects — pure CSS animation that performs at 60fps even on mobile.',
    brief: 'Build a set of 6 premium card variants using CSS-only effects: (1) Shimmer border using @property --shimmer-angle + conic-gradient, (2) Cursor spotlight that follows the mouse, (3) Aurora gradient background that shifts on hover, (4) Glassmorphism depth with multiple blur layers, (5) Magnetic click ripple on interaction, (6) Neon glow edge with soft halo. Each card must work on mobile gracefully, prefer @media hover to guard effect-heavy interactions.',
    category: 'component',
    status: 'active',
    icon: 'Sparkles',
    color: 'violet',
    entries: [
      {
        agent: 'FORGE',
        tool: 'Claude Code + ui-ux-pro-max skill',
        description: 'Implemented CSS Houdini @property shimmer using registered --shimmer-angle property for smooth conic-gradient rotation. Cursor glow via useMouseGlow hook (direct DOM mutations, no re-renders). Aurora and glassmorphism depth with CSS custom properties for smooth interpolation.',
        ratings: { design: 0, code: 0, accessibility: 0, performance: 0, creativity: 0 },
        overallScore: 0,
        verdict: 'In progress — implementing all 6 variants.',
      },
      {
        agent: 'External',
        tool: 'v0.dev (Vercel)',
        description: 'Submission pending.',
        ratings: { design: 0, code: 0, accessibility: 0, performance: 0, creativity: 0 },
        overallScore: 0,
        verdict: 'Awaiting submission.',
      },
      {
        agent: 'External',
        tool: 'Cursor + CSS Houdini',
        description: 'Submission pending.',
        ratings: { design: 0, code: 0, accessibility: 0, performance: 0, creativity: 0 },
        overallScore: 0,
        verdict: 'Awaiting submission.',
      },
    ],
    constraints: [
      'No JavaScript for visual effects — CSS-only animations',
      'CSS Houdini @property for shimmer (Chrome/Edge/Safari 16.4+)',
      '@media (hover: hover) guards for touch devices',
      'Must maintain 60fps on mid-range hardware',
      'prefers-reduced-motion: respect animation preferences',
      'Next.js 15 + TypeScript + Tailwind CSS',
    ],
    judgingCriteria: [
      'Smoothness of animation at 60fps',
      'CSS elegance — fewest lines for maximum effect',
      'Graceful degradation on touch / reduced motion',
      'Creative interpretation of brief',
      'Code reusability as a design system primitive',
    ],
    startedAt: '2026-02-28',
    highlights: [
      { stat: '3', label: 'Agent Entries' },
      { stat: '6', label: 'Effect Variants' },
      { stat: 'Active', label: 'Status' },
    ],
    relatedLinks: [
      { label: 'ShimmerCard Component', href: '/design-lab' },
      { label: 'Design System', href: '/design-system' },
    ],
    lastUpdated: '2026-02-28',
  },
  {
    slug: 'onboarding-flow-battle',
    title: 'Onboarding Flow Battle',
    subtitle: 'Multi-step wizard UX — who nails the flow that converts users?',
    description: 'Onboarding is where users make their first real judgment about your product. This experiment challenges AI agents to build a complete multi-step onboarding wizard for an AI tool — with animated progress, step transitions, validation states, and a satisfying completion screen. The best onboarding reduces friction while communicating value.',
    brief: 'Build a multi-step onboarding wizard for "FORGE AI" — a fictional AI coding assistant. Steps: (1) Welcome + role selection (developer/designer/product), (2) Project setup (name, tech stack, repo URL), (3) AI preferences (verbosity, code style, language), (4) Integration (GitHub OAuth, IDE plugin), (5) Done! First task suggestion. Include: animated progress indicator, step-to-step transitions, real-time validation, keyboard navigation (Tab, Enter, Escape), and a confetti/celebration on completion.',
    category: 'product-page',
    status: 'upcoming',
    icon: 'Layers',
    color: 'emerald',
    entries: [],
    constraints: [
      'Keyboard navigable — full Tab/Enter/Escape support',
      'Each step must validate before advancing',
      'Smooth animated transitions between steps (not hard cuts)',
      'Progress indicator must show both current step and overall progress',
      'Mobile-first responsive — wizard must work in 320px viewport',
      'WCAG 2.1 AA: all form elements labelled, error states announced',
    ],
    judgingCriteria: [
      'Flow smoothness — how natural does advancing through steps feel?',
      'Validation UX — inline errors that guide not punish',
      'Transition design — step transitions tell a story',
      'Completion delight — does the done screen make you feel something?',
      'Accessibility — full keyboard nav and screen reader support',
    ],
    startedAt: '2026-03-07',
    highlights: [
      { stat: '5', label: 'Wizard Steps' },
      { stat: '3', label: 'Agent Slots' },
      { stat: 'Upcoming', label: 'Status' },
    ],
    relatedLinks: [],
    lastUpdated: '2026-02-28',
  },
  {
    slug: 'navigation-mega-menu',
    title: 'Navigation Mega Menu',
    subtitle: 'Glassmorphic nav with animated mega panels — FrankX-branded',
    description: 'Navigation is the first interactive element users touch. A well-designed mega menu reveals product depth while staying scannable. This experiment challenges agents to build a glassmorphic navigation bar with animated mega menu panels — keyboard accessible, brand-aligned, and animated without feeling heavy.',
    brief: 'Build a top navigation bar for frankx.ai with a mega menu. Include: (1) Logo + main nav items (Products, Design Lab, Watch, Blog, About), (2) At least 2 items trigger a full mega menu panel on hover/click, (3) Mega menu panel uses glassmorphism with featured card + link grid, (4) Smooth animated panel reveal (slide + fade, not jump), (5) Keyboard accessible (Tab moves through items, Enter opens panel, Escape closes), (6) Mobile hamburger menu with slide-in drawer. Brand: dark background #0A0F1E, purple accent #AB47C7, cyan secondary #43BFE3.',
    category: 'component',
    status: 'upcoming',
    icon: 'Layout',
    color: 'cyan',
    entries: [],
    constraints: [
      'Keyboard accessible — WCAG 2.1 AA nav landmark and keyboard nav',
      'Panel animation under 300ms total (open) and 200ms (close)',
      'Mobile hamburger required at <768px breakpoint',
      'No layout shift when panel opens — use absolute positioning',
      'Reduced motion: panels appear instantly, no animation',
      'Brand colors only: #0A0F1E, #AB47C7, #43BFE3, rgba(255,255,255,0.08)',
    ],
    judgingCriteria: [
      'Panel animation quality — smooth, purposeful, not jarring',
      'Keyboard navigation — full arrow key support within panel',
      'Visual hierarchy within mega panel — scannable in 2 seconds',
      'Mobile drawer implementation quality',
      'Brand consistency — feels like frankx.ai',
    ],
    startedAt: '2026-03-14',
    highlights: [
      { stat: '5', label: 'Nav Items' },
      { stat: '2', label: 'Mega Panels' },
      { stat: 'Upcoming', label: 'Status' },
    ],
    relatedLinks: [
      { label: 'Design System', href: '/design-system' },
    ],
    lastUpdated: '2026-02-28',
  },
]
