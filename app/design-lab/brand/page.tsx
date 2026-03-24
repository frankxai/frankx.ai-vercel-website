'use client'

import Link from 'next/link'
import { useState } from 'react'

// ============================================================================
// COLOR DATA
// ============================================================================

const darkPalette = [
  { name: 'OLED Black', hex: '#030712', usage: 'Maximum contrast, hero backgrounds' },
  { name: 'Deep Navy', hex: '#0F172A', usage: 'Primary background' },
  { name: 'Midnight', hex: '#1E293B', usage: 'Cards, elevated surfaces' },
  { name: 'Slate 700', hex: '#334155', usage: 'Borders, dividers' },
  { name: 'Slate 600', hex: '#475569', usage: 'Secondary text' },
  { name: 'Slate 400', hex: '#94A3B8', usage: 'Body text' },
  { name: 'Slate 200', hex: '#E2E8F0', usage: 'Primary text (light)' },
  { name: 'White', hex: '#FFFFFF', usage: 'Headlines, emphasis' },
]

const accentPalette = [
  { name: 'Cosmic Purple', hex: '#AB47C7', usage: 'Primary brand accent, Arcanea', product: 'Brand' },
  { name: 'Aurora Blue', hex: '#43BFE3', usage: 'Interactive elements, ACOS', product: 'ACOS' },
  { name: 'Emerald', hex: '#10B981', usage: 'Success, growth, Vibe OS', product: 'Vibe OS' },
  { name: 'Gold', hex: '#F59E0B', usage: 'Premium, emphasis, GenCreator', product: 'GenCreator OS' },
  { name: 'Rose', hex: '#F43F5E', usage: 'Alerts, critical actions', product: 'System' },
]

// ============================================================================
// TYPOGRAPHY DATA
// ============================================================================

const typeScale = [
  { name: 'Display', size: '48-64px', weight: '700', font: 'Inter', usage: 'Hero headlines' },
  { name: 'H1', size: '36-48px', weight: '700', font: 'Inter', usage: 'Page titles' },
  { name: 'H2', size: '28-32px', weight: '600', font: 'Inter', usage: 'Section headers' },
  { name: 'H3', size: '20-24px', weight: '600', font: 'Inter', usage: 'Sub-sections' },
  { name: 'Body', size: '16-17px', weight: '400', font: 'Inter', usage: 'Paragraphs, 1.7-1.8 line height' },
  { name: 'Small', size: '13-14px', weight: '400', font: 'Inter', usage: 'Captions, metadata' },
  { name: 'Mono', size: '14-15px', weight: '400', font: 'JetBrains Mono', usage: 'Code, data, stats' },
  { name: 'Serif', size: '18-20px', weight: '400', font: 'Playfair Display', usage: 'Blockquotes, pull quotes' },
]

// ============================================================================
// BRAND ATTRIBUTES
// ============================================================================

const attributes = [
  { name: 'Precise', description: 'Technical depth. Every pixel, word, and interaction is intentional.', accent: 'text-cyan-400' },
  { name: 'Bold', description: 'Confident without being loud. Authority through craft, not claims.', accent: 'text-purple-400' },
  { name: 'Genuine', description: 'Real work, real results. Frank builds in public. Honest exploration.', accent: 'text-emerald-400' },
  { name: 'Creative', description: 'AI-augmented. Multi-modal. Music, code, writing, and design.', accent: 'text-amber-400' },
  { name: 'Warm', description: 'Accessible despite depth. Inviting people in, not gatekeeping.', accent: 'text-rose-400' },
]

// ============================================================================
// VOICE DATA
// ============================================================================

const voiceDos = [
  '"Here\'s the exact workflow I use" — specific, first person',
  '"This pattern handles 90% of multi-agent needs" — precise numbers',
  '"Build what matters." — strong verbs, no hedging',
  'Studio energy at 2am — explaining to a friend',
  'Let the work speak — show, don\'t tell',
]

const voiceDonts = [
  '"Unlock your potential" — self-help guru tone',
  '"Comprehensive solution" — vague, corporate',
  '"Soul-aligned transformation" — spiritual language',
  '"We leverage cutting-edge paradigms" — buzzword soup',
  'Over-explaining philosophy or motivation',
]

// ============================================================================
// GLASSMORPHISM DATA
// ============================================================================

const glassLevels = [
  { name: 'Subtle', bg: 'rgba(255,255,255,0.03)', blur: '12px', border: 'rgba(255,255,255,0.06)', usage: 'Cards, containers' },
  { name: 'Medium', bg: 'rgba(255,255,255,0.05)', blur: '16px', border: 'rgba(255,255,255,0.08)', usage: 'Modals, popovers' },
  { name: 'Elevated', bg: 'rgba(255,255,255,0.08)', blur: '24px', border: 'rgba(255,255,255,0.12)', usage: 'Navigation, CTAs' },
]

// ============================================================================
// COMPONENTS
// ============================================================================

function ColorSwatch({ name, hex, usage, large }: { name: string; hex: string; usage: string; large?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copyHex = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copyHex}
      className={`group text-left rounded-xl border border-white/5 hover:border-white/15 transition-all ${large ? 'p-4' : 'p-3'}`}
    >
      <div
        className={`rounded-lg mb-3 ${large ? 'h-20' : 'h-14'} border border-white/10`}
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-[11px] font-mono text-white/30 group-hover:text-white/60 transition-colors">
          {copied ? 'Copied' : hex}
        </span>
      </div>
      <p className="text-[11px] text-white/30 mt-0.5">{usage}</p>
    </button>
  )
}

function GlassCard({ name, bg, blur, border, usage }: { name: string; bg: string; blur: string; border: string; usage: string }) {
  return (
    <div
      className="rounded-xl p-5 transition-all hover:scale-[1.02]"
      style={{
        backgroundColor: bg,
        backdropFilter: `blur(${blur})`,
        border: `1px solid ${border}`,
      }}
    >
      <h4 className="text-sm font-semibold mb-1">{name}</h4>
      <p className="text-xs text-white/40 mb-3">{usage}</p>
      <div className="space-y-1 text-[11px] font-mono text-white/25">
        <div>bg: {bg}</div>
        <div>blur: {blur}</div>
        <div>border: {border}</div>
      </div>
    </div>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function BrandGuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <section className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/design-lab" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Design Lab
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-sm">Brand</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Brand Guidelines
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            The FrankX design system. Colors, typography, voice, and visual language.
            Click any color to copy its hex value.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <span className="text-xs text-white/20 font-mono">v1.0</span>
            <span className="text-xs text-white/20">February 2026</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

        {/* 1. Brand Attributes */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Brand Attributes</h2>
          <p className="text-white/40 text-sm mb-8">Five qualities present in every interaction</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {attributes.map((attr) => (
              <div key={attr.name} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className={`text-lg font-bold mb-2 ${attr.accent}`}>{attr.name}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{attr.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Tagline */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Tagline</h2>
          <p className="text-white/40 text-sm mb-8">Four words. The entire brand.</p>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-12 text-center">
            <p className="text-4xl md:text-6xl font-bold tracking-tight">
              Build what matters.
            </p>
            <p className="text-white/30 text-sm mt-6 max-w-md mx-auto">
              Always sentence case. Never ALL CAPS. Never modified.
              The brevity is the point.
            </p>
          </div>
        </section>

        {/* 3. Color System */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Color System</h2>
          <p className="text-white/40 text-sm mb-8">Dark-first brand with strategic color accents</p>

          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Dark Foundation</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-12">
            {darkPalette.map((color) => (
              <ColorSwatch key={color.hex} {...color} />
            ))}
          </div>

          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Accent Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {accentPalette.map((color) => (
              <ColorSwatch key={color.hex} {...color} large />
            ))}
          </div>
        </section>

        {/* 4. Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Typography</h2>
          <p className="text-white/40 text-sm mb-8">Three fonts. Clear hierarchy. Readable at every size.</p>
          <div className="space-y-3">
            {typeScale.map((type) => (
              <div key={type.name} className="flex items-center gap-6 rounded-lg border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                <span className="text-white/70 font-semibold w-20 shrink-0 text-sm">{type.name}</span>
                <span className="text-white/30 font-mono text-xs w-24 shrink-0">{type.size}</span>
                <span className="text-white/30 text-xs w-20 shrink-0">{type.font}</span>
                <span className="text-white/20 text-xs flex-1">{type.usage}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.03] p-8">
            <p className="text-[17px] leading-[1.8] text-white/85 max-w-[680px]">
              Body text renders at 17px with 1.8 line-height on a 680px prose column.
              This produces 65-75 characters per line — the optimal range for sustained
              reading. White at 85% opacity gives a WCAG AAA contrast ratio of ~7.2:1
              against the navy background.
            </p>
          </div>
        </section>

        {/* 5. Glassmorphism */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Glassmorphism</h2>
          <p className="text-white/40 text-sm mb-8">
            Three elevation levels. Always subtle — rgba(255,255,255,0.03) not 0.15.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {glassLevels.map((level) => (
              <GlassCard key={level.name} {...level} />
            ))}
          </div>
        </section>

        {/* 6. Voice & Copy */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Voice & Copy</h2>
          <p className="text-white/40 text-sm mb-8">How FrankX sounds. Every word is a design decision.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Do</h3>
              <ul className="space-y-3">
                {voiceDos.map((item, i) => (
                  <li key={i} className="text-sm text-white/60 leading-relaxed pl-4 border-l-2 border-emerald-500/30">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6">
              <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Don't</h3>
              <ul className="space-y-3">
                {voiceDonts.map((item, i) => (
                  <li key={i} className="text-sm text-white/60 leading-relaxed pl-4 border-l-2 border-rose-500/30">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Product Hierarchy */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Product Hierarchy</h2>
          <p className="text-white/40 text-sm mb-8">Branded house model. All products under FrankX.</p>
          <div className="space-y-4">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">Tier 1</span>
                <span className="text-sm text-white/50">Operating Systems</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['ACOS', 'Vibe OS', 'GenCreator OS'].map((name) => (
                  <span key={name} className="text-sm font-semibold text-white/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">Tier 2</span>
                <span className="text-sm text-white/50">Named Experiences</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Arcanea', 'Starlight', 'Soulbook', 'Golden Age'].map((name) => (
                  <span key={name} className="text-sm text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">Tier 3</span>
                <span className="text-sm text-white/50">Features & Content</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Blog', 'Research', 'AI World', 'Prompt Library', 'Templates'].map((name) => (
                  <span key={name} className="text-sm text-white/40 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Icon Standards */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Icon Standards</h2>
          <p className="text-white/40 text-sm mb-8">Premium quality only. No childish or emoji-style icons.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">Primary: Heroicons</h3>
              <p className="text-xs text-white/40">324 icons. Clean, minimal, pixel-perfect at 24px. 1.5px stroke. By Tailwind Labs.</p>
            </div>
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <h3 className="text-sm font-semibold text-cyan-400 mb-2">Supplementary: Tabler</h3>
              <p className="text-xs text-white/40">4,985 icons including brand logos (GitHub, X, Vercel). MIT licensed.</p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
              <h3 className="text-sm font-semibold text-rose-400 mb-2">Never: Phosphor Bold</h3>
              <p className="text-xs text-white/40">Too thick, rounded, looks childish. Only for art/music contexts where playful style fits.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-white/20 text-sm">
            Full guidelines: <code className="text-white/30 bg-white/5 px-1.5 py-0.5 rounded text-xs">.frankx/brand-guidelines.md</code>
          </p>
          <p className="text-white/15 text-xs mt-2">1,367 lines. 14 sections. v1.0 February 2026.</p>
        </div>
      </div>
    </div>
  )
}
