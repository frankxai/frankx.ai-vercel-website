import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Github, FileText, Layers, Type, Ruler, Square, ShieldCheck, Sparkles } from 'lucide-react';

const SITE_URL = 'https://frankx.ai';
const PAGE_URL = `${SITE_URL}/design`;
const SOURCE_DESIGN = 'https://github.com/frankxai/FrankX/blob/main/design.md';
const SOURCE_TASTE = 'https://github.com/frankxai/FrankX/blob/main/taste.md';
const SPEC_REPO = 'https://github.com/google-labs-code/design.md';

export const metadata: Metadata = {
  title: 'The FrankX Design System | Tokens · Taste · Source',
  description:
    'A dual-spectrum dark-first design system. Tokens machine-readable per Google Labs DESIGN.md spec; taste captured in a companion taste.md. Open source, version-controlled, recursive proof.',
  keywords: [
    'FrankX design system',
    'DESIGN.md',
    'design tokens',
    'design system documentation',
    'dark mode design system',
    'Tailwind design tokens',
    'design.md spec',
    'taste.md',
    'AI agent design contract',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'The FrankX Design System',
    description:
      'Tokens, taste, and source — open and version-controlled. Built on Google Labs DESIGN.md.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'FrankX',
  },
  twitter: { card: 'summary_large_image', title: 'The FrankX Design System' },
};

// =============================================================================
// DATA — mirrors /design.md frontmatter (single source of truth)
// =============================================================================

const foundation = [
  { name: 'void', hex: '#0a0a0b', desc: 'Page background' },
  { name: 'space', hex: '#111113', desc: 'Primary elevated surface' },
  { name: 'elevated', hex: '#1a1a1f', desc: 'Hover, secondary cards' },
  { name: 'subtle', hex: '#252530', desc: 'Borders, dividers' },
];

const ink = [
  { name: 'ink', alpha: '100%', sample: 'rgba(255,255,255,1)', desc: 'Headings' },
  { name: 'ink-muted', alpha: '65%', sample: 'rgba(255,255,255,0.65)', desc: 'Body copy' },
  { name: 'ink-subtle', alpha: '45%', sample: 'rgba(255,255,255,0.45)', desc: 'Captions' },
  { name: 'ink-faint', alpha: '30%', sample: 'rgba(255,255,255,0.30)', desc: 'Disabled' },
];

const tech = [
  { name: 'tech-primary', hex: '#10b981', role: 'CTA · primary' },
  { name: 'tech-secondary', hex: '#06b6d4', role: 'Highlight' },
  { name: 'tech-light', hex: '#34d399', role: 'Hover' },
  { name: 'tech-dark', hex: '#059669', role: 'Pressed' },
];

const soul = [
  { name: 'soul-primary', hex: '#f59e0b', role: 'CTA · primary' },
  { name: 'soul-secondary', hex: '#fbbf24', role: 'Highlight' },
  { name: 'soul-light', hex: '#fcd34d', role: 'Hover' },
  { name: 'soul-dark', hex: '#d97706', role: 'Pressed' },
];

const bridge = [
  { name: 'bridge-purple', hex: '#AB47C7', role: 'Brand purple' },
  { name: 'bridge-blue', hex: '#43BFE3', role: 'Clarity' },
  { name: 'bridge-magenta', hex: '#E040FB', role: 'Energy' },
  { name: 'bridge-violet', hex: '#7C3AED', role: 'Arcanea glow' },
];

const typeSamples = [
  { token: 'display-2xl', size: '5.653rem', weight: 700, font: 'font-display', line: 'Generative Creators' },
  { token: 'display-lg', size: '3.183rem', weight: 700, font: 'font-display', line: 'Build with intention.' },
  { token: 'h1', size: '2.369rem', weight: 700, font: 'font-display', line: 'AI Architecture for the rest of us' },
  { token: 'h2', size: '1.777rem', weight: 600, font: 'font-display', line: 'The Library is the foundation' },
  { token: 'h3', size: '1.333rem', weight: 600, font: 'font-display', line: 'Three commands, one schema' },
  { token: 'body-lg', size: '1.125rem', weight: 400, font: 'font-sans', line: 'Long-form reading deserves typography that earns the scroll.' },
  { token: 'body-md', size: '1rem', weight: 400, font: 'font-sans', line: 'The workhorse of the system. Inter, 16px, 1.6 line-height, ink-muted at 65% alpha.' },
  { token: 'body-sm', size: '0.875rem', weight: 400, font: 'font-sans', line: 'Captions, helper text, secondary annotations.' },
  { token: 'quote', size: '1.5rem', weight: 400, font: 'font-serif italic', line: '"Tokens make a system consistent. Taste makes it excellent."' },
  { token: 'code', size: '0.875rem', weight: 400, font: 'font-mono', line: '/library-deepen atomic-habits' },
];

const spacingScale = [
  { name: 'xs', px: 4 },
  { name: 'sm', px: 8 },
  { name: 'md', px: 16 },
  { name: 'lg', px: 24 },
  { name: 'xl', px: 32 },
  { name: '2xl', px: 48 },
  { name: '3xl', px: 64 },
  { name: '4xl', px: 96 },
];

const roundedScale = [
  { name: 'sm', px: 6 },
  { name: 'md', px: 12 },
  { name: 'lg', px: 16 },
  { name: 'xl', px: 24 },
  { name: '2xl', px: 32 },
  { name: 'full', px: 9999, label: '∞' },
];

const dos = [
  'Pick one spectrum (tech or soul) per page and stay loyal',
  'Use the eyebrow + headline + deck pattern for every section opener',
  'Drop body copy to ink-muted (65%) — pure white reads harsh',
  'Use rounded-full for primary CTAs — the brand-recognizable shape',
  'Respect the spacing scale; if you need 20px, you need 16px or 24px',
  'Show technical proof with JetBrains Mono — code, commands, file paths',
];

const donts = [
  'Use Poppins below 18px — it collapses; switch to Inter',
  'Mix tech (emerald) and soul (amber) accents in the same hero',
  'Reach for pure black (#000) — void (#0a0a0b) is always the answer',
  'Stack two equal-weight CTAs — design indecision in pixel form',
  'Use Playfair for headings — italic quotes only',
  'Auto-play video, parallax bands, full-page color washes, glassmorphism with nothing underneath',
];

// =============================================================================
// JSON-LD
// =============================================================================

function CreativeWorkJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Design System', item: PAGE_URL },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: 'The FrankX Design System',
        description:
          'A dual-spectrum dark-first design system. Tokens machine-readable per Google Labs DESIGN.md spec; taste captured in a companion taste.md.',
        url: PAGE_URL,
        author: { '@type': 'Person', name: 'Frank Riemer' },
        license: 'https://opensource.org/licenses/Apache-2.0',
        isBasedOn: { '@type': 'CreativeWork', name: 'DESIGN.md', url: SPEC_REPO },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// =============================================================================
// PRIMITIVES (used in-page; not exported)
// =============================================================================

function SectionHeader({ eyebrow, title, deck }: { eyebrow: string; title: string; deck?: string }) {
  return (
    <div className="mb-10">
      <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">{title}</h2>
      {deck && <p className="text-base text-white/60 max-w-2xl">{deck}</p>}
    </div>
  );
}

function Swatch({ hex, name, sub }: { hex: string; name: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="aspect-[4/3] relative" style={{ backgroundColor: hex }}>
        <div className="absolute inset-0 ring-1 ring-inset ring-black/20" />
      </div>
      <div className="p-3">
        <div className="text-[13px] font-medium text-white">{name}</div>
        <div className="flex items-baseline justify-between gap-2 mt-0.5">
          <code className="text-[11px] text-white/50 font-mono">{hex}</code>
          {sub && <span className="text-[10px] text-white/40 truncate">{sub}</span>}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// PAGE
// =============================================================================

export default function DesignPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white">
      <CreativeWorkJsonLd />

      {/* HERO */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
          <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href={SPEC_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-200 mb-8 hover:bg-emerald-500/10 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Built on Google Labs DESIGN.md (alpha · Apache 2.0)
          </Link>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            The FrankX
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-300 bg-clip-text text-transparent">
              Design System
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Tokens, taste, and source — open and version-controlled. Two markdown files at the repo root govern every visual decision: <code className="text-emerald-300/80 font-mono text-base">design.md</code> for what is, <code className="text-amber-300/80 font-mono text-base">taste.md</code> for what good looks like.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={SOURCE_DESIGN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              <FileText className="h-4 w-4" />
              Read design.md
            </Link>
            <Link
              href={SOURCE_TASTE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              <FileText className="h-4 w-4" />
              Read taste.md
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            {[
              { v: '4', l: 'foundation steps' },
              { v: '3', l: 'color spectrums' },
              { v: '4', l: 'type families' },
              { v: '8', l: 'spacing tokens' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
                <div className="text-2xl font-bold text-white">{s.v}</div>
                <div className="text-[10px] tracking-wider uppercase text-white/40 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDATION */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="01 · Foundation"
            title="The four-step ladder"
            deck="Each step is roughly +3% luminance. The whole system is built on this near-black base. Always go deeper than instinct suggests."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {foundation.map((c) => (
              <Swatch key={c.name} hex={c.hex} name={c.name} sub={c.desc} />
            ))}
          </div>
          <div className="mt-6 text-xs text-white/40">
            Borders use <code className="text-white/60 font-mono">white at 0.08–0.15 alpha</code> — never a literal grey. Surface feels lit from within.
          </div>
        </div>
      </section>

      {/* INK */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="02 · Ink"
            title="Text never lives at 100%"
            deck="Pure white on void reads harsh. Body drops to 65%; the page breathes."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ink.map((i) => (
              <div key={i.name} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="font-display text-2xl mb-3" style={{ color: i.sample }}>
                  Aa
                </div>
                <div className="text-sm font-medium text-white">{i.name}</div>
                <div className="text-xs text-white/50 mt-0.5">{i.alpha} · {i.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLOR SPECTRUMS */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="03 · Spectrums"
            title="Tech, Soul, Bridge"
            deck="A page picks one and stays loyal. Tech for AI/architecture/code. Soul for music/writing/transformation. Bridge for the worlds where they meet — used sparingly so it carries weight."
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tech */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <h3 className="text-lg font-semibold text-white">Tech</h3>
                <span className="text-xs text-white/40">— emerald + cyan</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {tech.map((c) => (
                  <Swatch key={c.name} hex={c.hex} name={c.name.replace('tech-', '')} sub={c.role} />
                ))}
              </div>
            </div>

            {/* Soul */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <h3 className="text-lg font-semibold text-white">Soul</h3>
                <span className="text-xs text-white/40">— amber + gold</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {soul.map((c) => (
                  <Swatch key={c.name} hex={c.hex} name={c.name.replace('soul-', '')} sub={c.role} />
                ))}
              </div>
            </div>

            {/* Bridge */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                <h3 className="text-lg font-semibold text-white">Bridge</h3>
                <span className="text-xs text-white/40">— purple/blue/magenta</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {bridge.map((c) => (
                  <Swatch key={c.name} hex={c.hex} name={c.name.replace('bridge-', '')} sub={c.role} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="04 · Typography"
            title="Four faces, four jobs"
            deck="Inter for body. Poppins for display ≥18px. Playfair Display italic for quotes only. JetBrains Mono for code. Perfect Fourth scale (1.333)."
          />

          <div className="space-y-6">
            {typeSamples.map((t) => (
              <div key={t.token} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 sm:gap-6 items-baseline border-t border-white/5 pt-6 first:border-0 first:pt-0">
                <div>
                  <code className="text-xs text-emerald-300/80 font-mono">{t.token}</code>
                  <div className="text-[11px] text-white/40 mt-1">
                    {t.size} · {t.weight}
                  </div>
                </div>
                <div
                  className={t.font + ' text-white leading-tight'}
                  style={{ fontSize: `min(${t.size}, 12vw)`, fontWeight: t.weight }}
                >
                  {t.line}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACING + ROUNDED */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Spacing */}
            <div>
              <SectionHeader eyebrow="05 · Spacing" title="The scale is the scale" deck="Eight tokens. No 12px, no 20px, no 40px. If a value isn't on the scale, the answer is the closer one." />
              <div className="space-y-3">
                {spacingScale.map((s) => (
                  <div key={s.name} className="flex items-center gap-4">
                    <code className="w-12 text-xs text-emerald-300/80 font-mono">{s.name}</code>
                    <div className="h-3 rounded-sm bg-emerald-400/40" style={{ width: `${s.px}px` }} />
                    <span className="text-xs text-white/40 ml-auto font-mono">{s.px}px</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rounded */}
            <div>
              <SectionHeader eyebrow="06 · Rounded" title="Curves with intent" deck="Primary CTAs are always rounded-full. That shape is the brand fingerprint. Cards default to rounded-xl." />
              <div className="grid grid-cols-3 gap-4">
                {roundedScale.map((r) => (
                  <div key={r.name} className="text-center">
                    <div
                      className="aspect-square w-full bg-emerald-400/10 ring-1 ring-emerald-400/30 mb-2"
                      style={{ borderRadius: `${r.px === 9999 ? 9999 : r.px}px` }}
                    />
                    <code className="text-xs text-emerald-300/80 font-mono">{r.name}</code>
                    <div className="text-[10px] text-white/40 mt-0.5">{r.label ?? `${r.px}px`}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENTS */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="07 · Components"
            title="The recognizable shapes"
            deck="The patterns this brand has earned. Implementation lives in components/; this is the agent-readable contract."
          />

          {/* Button hierarchy */}
          <div className="mb-12">
            <h3 className="text-sm font-medium text-white/70 mb-4">Button hierarchy — one primary per viewport</h3>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition">
                Primary
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-black px-6 py-3 text-sm font-semibold hover:bg-emerald-400 transition">
                Tech
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                Secondary
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition">
                Ghost
              </button>
            </div>
          </div>

          {/* Eyebrow pattern */}
          <div className="mb-12">
            <h3 className="text-sm font-medium text-white/70 mb-4">Section opener — eyebrow + headline + deck</h3>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
                Eyebrow Label
              </p>
              <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                The headline that earns the section
              </h4>
              <p className="text-base text-white/60 max-w-xl">
                A deck of one to two sentences. Sets context, names the topic, breathes. This trio is the most-replicated section opener on FrankX — recognize it, reuse it, don't reinvent it.
              </p>
            </div>
          </div>

          {/* Cards + Chips */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-4">Cards</h3>
              <div className="space-y-3">
                <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
                  <div className="text-sm font-medium text-white">Default card</div>
                  <div className="text-xs text-white/50 mt-1">space · rounded-xl · border-white/8</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#1a1a1f] p-5">
                  <div className="text-sm font-medium text-white">Elevated card</div>
                  <div className="text-xs text-white/50 mt-1">elevated · for hover, secondary surfaces</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/70 mb-4">Chips</h3>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 ring-1 ring-white/10">neutral</span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 ring-1 ring-emerald-400/30">tech</span>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300 ring-1 ring-amber-400/30">soul</span>
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300 ring-1 ring-violet-400/30">bridge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DO'S AND DON'TS */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="08 · Compass" title="Do's and Don'ts" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Do</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/75">
                {dos.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-rose-400 font-bold text-base leading-none">×</span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-300">Don&apos;t</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/75">
                {donts.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-rose-400 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TASTE PULL-QUOTE */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/60 font-medium mb-6">
            From taste.md
          </p>
          <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed mb-8">
            &ldquo;Tokens make a system consistent. Taste makes it excellent. Without taste, a token system produces software that&apos;s correct and forgettable.&rdquo;
          </blockquote>
          <Link
            href={SOURCE_TASTE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-amber-300/90 hover:text-amber-200 transition"
          >
            Read the full taste contract
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeader
            eyebrow="09 · Source"
            title="Open. Version-controlled. Yours to fork."
            deck="Both files at the repo root, MIT-spirit (Apache 2.0 spec), recursively rebuildable. Use them, fork them, improve them. The system gets better when more people read it."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={SOURCE_DESIGN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              <Github className="h-4 w-4" />
              design.md on GitHub
            </Link>
            <Link
              href={SOURCE_TASTE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              <Github className="h-4 w-4" />
              taste.md on GitHub
            </Link>
            <Link
              href={SPEC_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white transition"
            >
              <FileText className="h-4 w-4" />
              The DESIGN.md spec
            </Link>
          </div>
          <p className="mt-10 text-xs text-white/40">
            <Layers className="h-3 w-3 inline mr-1.5" />Foundation ·
            <Type className="h-3 w-3 inline mx-1.5" />Typography ·
            <Ruler className="h-3 w-3 inline mx-1.5" />Spacing ·
            <Square className="h-3 w-3 inline mx-1.5" />Shapes
            <span className="mx-2">·</span>
            All grounded in tailwind.config.js
          </p>
        </div>
      </section>
    </main>
  );
}
