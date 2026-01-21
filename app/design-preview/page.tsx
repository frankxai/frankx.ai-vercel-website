'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { useState } from 'react'

// ============================================================================
// FONT PREVIEW PAGE - Compare 3 italic font options
// ============================================================================

const fontOptions = [
  {
    id: 'times',
    name: 'Times New Roman',
    description: 'Classic editorial serif. Traditional gravitas, familiar elegance.',
    className: 'font-times-italic',
    style: { fontFamily: '"Times New Roman", Times, Georgia, serif', fontStyle: 'italic' },
    pros: ['Universally recognized authority', 'Classic book/editorial feel', 'High readability'],
    cons: ['Can feel dated/traditional', 'Less tech-forward', 'Common/expected'],
  },
  {
    id: 'inter',
    name: 'Inter Italic',
    description: 'Geometric sans-serif italic. Modern, clean, tech-forward.',
    className: 'font-inter-italic',
    style: { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontStyle: 'italic' },
    pros: ['Matches your brand typography', 'Modern/tech-forward', 'Consistent with body text'],
    cons: ['Less dramatic contrast', 'Subtle emphasis', 'May feel understated'],
  },
  {
    id: 'playfair',
    name: 'Playfair Display (Current)',
    description: 'Elegant display serif. Editorial beauty, high contrast.',
    className: 'font-serif-italic',
    style: { fontFamily: 'var(--font-serif), "Playfair Display", Georgia, serif', fontStyle: 'italic' },
    pros: ['Beautiful letterforms', 'Strong visual hierarchy', 'Premium editorial feel'],
    cons: ['Can feel "magazine-y"', 'High contrast may clash', 'Less tech-forward'],
  },
]

// Sample quotes to preview
const previewQuotes = {
  main: '"I create to understand. I share to teach. I explore because the universe is too interesting not to."',
  secondary: '"The best way to learn is to teach. The best way to understand is to create."',
  tagline: 'These are the threads that weave through everything here.',
  philosophy: 'We\'re living in the Golden Age of Intelligence — and I\'m documenting every step.',
}

function FontPreviewCard({
  font,
  isSelected,
  onSelect
}: {
  font: typeof fontOptions[0]
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-emerald-500/50 bg-emerald-500/5 shadow-lg shadow-emerald-500/10'
          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
      }`}
      onClick={onSelect}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Font name and description */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{font.name}</h3>
        <p className="text-sm text-white/50">{font.description}</p>
      </div>

      {/* Main quote preview */}
      <div className="space-y-6 mb-8">
        <blockquote
          className="text-2xl md:text-3xl text-white/80 leading-relaxed"
          style={font.style}
        >
          {previewQuotes.main}
        </blockquote>

        <p
          className="text-xl text-white/70 leading-relaxed"
          style={font.style}
        >
          {previewQuotes.secondary}
        </p>

        <p
          className="text-lg text-white/60"
          style={font.style}
        >
          {previewQuotes.tagline}
        </p>
      </div>

      {/* In context: heading with italic accent */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/60 mb-2">In Context</p>
        <h4 className="text-2xl font-bold text-white mb-2">
          Music, technology, family, and exploration.
          <span className="block mt-1 text-white/70 text-xl" style={font.style}>
            {previewQuotes.tagline}
          </span>
        </h4>
      </div>

      {/* Pros/Cons */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-emerald-400 font-medium mb-2">✓ Pros</p>
          <ul className="space-y-1 text-white/50">
            {font.pros.map((pro) => (
              <li key={pro}>• {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-amber-400 font-medium mb-2">✗ Considerations</p>
          <ul className="space-y-1 text-white/50">
            {font.cons.map((con) => (
              <li key={con}>• {con}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// PRODUCT/AUDIENCE STRATEGY PREVIEW
// ============================================================================

const audienceMatrix = {
  title: 'The Intelligence Systems Matrix',
  subtitle: 'Different entry points for different journeys',
  audiences: [
    {
      id: 'music',
      name: 'Music Creators',
      icon: '🎵',
      description: 'Artists exploring AI music with Suno',
      product: 'Vibe OS',
      price: 'Free',
      color: 'emerald',
      features: ['50+ genre prompts', 'Emotion mapping', 'Production checklists'],
    },
    {
      id: 'content',
      name: 'Content Creators',
      icon: '✍️',
      description: 'Writers, marketers, storytellers',
      product: 'Creation Chronicles',
      price: '€7',
      color: 'cyan',
      features: ['Story frameworks', 'Editorial calendars', 'Distribution templates'],
    },
    {
      id: 'creators',
      name: 'Generative Creators',
      icon: '🎨',
      description: 'Multi-modal AI power users',
      product: 'Generative Creator OS',
      price: '€97',
      color: 'violet',
      features: ['Multi-modal pipelines', 'Brand intelligence', 'Team enablement'],
    },
    {
      id: 'developers',
      name: 'Developers & Builders',
      icon: '⚡',
      description: 'Claude Code, agents, automation',
      product: 'Agentic Creator OS',
      price: '€197',
      color: 'amber',
      features: ['Agent architectures', 'MCP servers', 'Production patterns'],
    },
  ],
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
}

function StrategyPreview() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-3">
          Recommended Structure
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {audienceMatrix.title}
        </h2>
        <p className="text-lg text-white/50">
          {audienceMatrix.subtitle}. Each audience has a clear entry point and progression path.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {audienceMatrix.audiences.map((audience, i) => {
          const colors = colorMap[audience.color]
          return (
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm`}
            >
              <div className="text-3xl mb-3">{audience.icon}</div>
              <h3 className="text-lg font-bold text-white mb-1">{audience.name}</h3>
              <p className="text-sm text-white/50 mb-4">{audience.description}</p>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${colors.text}`}>{audience.product}</span>
                  <span className="text-white font-bold">{audience.price}</span>
                </div>
                <ul className="space-y-1">
                  {audience.features.map((feature) => (
                    <li key={feature} className="text-xs text-white/40">• {feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Strategic rationale */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <h3 className="text-lg font-bold text-white mb-4">🧠 Strategic Rationale</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-white/60">
          <div>
            <p className="text-white/80 font-medium mb-2">Why audience-first organization?</p>
            <ul className="space-y-2">
              <li>• <strong className="text-white/70">Instant recognition</strong> — Visitors immediately see "that's me"</li>
              <li>• <strong className="text-white/70">Reduced friction</strong> — No analysis paralysis across 5 products</li>
              <li>• <strong className="text-white/70">Clear value props</strong> — Each audience gets targeted messaging</li>
              <li>• <strong className="text-white/70">Natural upsell path</strong> — Music creator → Content → Generative → Agentic</li>
            </ul>
          </div>
          <div>
            <p className="text-white/80 font-medium mb-2">The progression logic:</p>
            <ul className="space-y-2">
              <li>• <strong className="text-emerald-400">Vibe OS (Free)</strong> — Hook. Get them creating immediately.</li>
              <li>• <strong className="text-cyan-400">Creation Chronicles (€7)</strong> — Low commitment. Prove value.</li>
              <li>• <strong className="text-violet-400">GenCreator OS (€97)</strong> — Serious investment. Power users.</li>
              <li>• <strong className="text-amber-400">Agentic OS (€197)</strong> — Builders. Technical depth.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function DesignPreviewPage() {
  const [selectedFont, setSelectedFont] = useState<string>('playfair')

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        {/* Section 1: Font Preview */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/70 mb-3">
              Decision 1
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Italic Font Options
            </h1>
            <p className="text-lg text-white/50">
              Compare three options for your accent italic text. Click to select your preference.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {fontOptions.map((font) => (
              <FontPreviewCard
                key={font.id}
                font={font}
                isSelected={selectedFont === font.id}
                onSelect={() => setSelectedFont(font.id)}
              />
            ))}
          </div>

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
          >
            <h3 className="text-lg font-bold text-emerald-400 mb-2">💡 Team Recommendation</h3>
            <p className="text-white/70">
              <strong className="text-white">Option 2: Inter Italic</strong> for body accents +
              <strong className="text-white"> Times New Roman</strong> for the main philosophy quote only.
              This gives you modern consistency with a single moment of classic gravitas.
              Alternatively, use <strong className="text-white">Inter Italic throughout</strong> for
              maximum tech-forward cohesion with your brand.
            </p>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Section 2: Product/Audience Strategy */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/70 mb-3">
              Decision 2
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Product & Audience Structure
            </h2>
            <p className="text-lg text-white/50">
              Should the homepage organize by audience type or product tier?
              Here's our recommended approach.
            </p>
          </div>

          <StrategyPreview />
        </section>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Section 3: Positioning */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70 mb-3">
              Decision 3
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Positioning: Humble Authority
            </h2>
            <p className="text-lg text-white/50">
              Your requested tone: confident expertise without arrogance. Here's how that sounds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Current copy */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Current (Humble)</p>
              <blockquote className="text-lg text-white/60 leading-relaxed mb-4">
                "AI Architect at Oracle. Creator of 10K+ songs with Suno.
                Everything I build goes here—open, documented, yours to use."
              </blockquote>
              <blockquote className="text-lg text-white/60 leading-relaxed">
                "This site is my workshop, my notebook, my attempt to share what I'm learning
                with anyone curious enough to look. Not courses to sell, not followers to count.
                Just the work itself, documented as I do it."
              </blockquote>
            </div>

            {/* Proposed copy */}
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-4">Proposed (Humble Authority)</p>
              <blockquote className="text-lg text-white/80 leading-relaxed mb-4">
                "AI Architect at Oracle by day. Creator of 10,000+ songs by night.
                I build intelligence systems for creators who want to thrive in the
                <span className="text-emerald-400"> Golden Age</span>—and I document everything
                so you can build your own."
              </blockquote>
              <blockquote className="text-lg text-white/80 leading-relaxed">
                "This hub is my workshop, my family archive, and an open invitation.
                The systems, prompts, and workflows I use daily—packaged for creators,
                students, and builders at every level. Take what serves you.
                Adapt it. Build your own golden age."
              </blockquote>
            </div>
          </div>

          {/* Key differences */}
          <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white mb-4">Key Shifts in "Humble Authority"</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-emerald-400 font-medium mb-2">Confidence Markers</p>
                <ul className="space-y-1 text-white/50">
                  <li>• "10,000+ songs" (specific, impressive)</li>
                  <li>• "Intelligence systems" (not just "tools")</li>
                  <li>• "Golden Age" (vision framing)</li>
                </ul>
              </div>
              <div>
                <p className="text-cyan-400 font-medium mb-2">Humility Markers</p>
                <ul className="space-y-1 text-white/50">
                  <li>• "document everything" (transparency)</li>
                  <li>• "so you can build your own" (service)</li>
                  <li>• "Take what serves you" (no pressure)</li>
                </ul>
              </div>
              <div>
                <p className="text-amber-400 font-medium mb-2">Warmth Markers</p>
                <ul className="space-y-1 text-white/50">
                  <li>• "family archive" (personal)</li>
                  <li>• "open invitation" (welcoming)</li>
                  <li>• "at every level" (inclusive)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to implement?</h2>
          <p className="text-white/50 mb-8">
            Let me know your choices and I'll update the homepage with your selected font,
            product structure, and positioning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              View Current Homepage
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
