'use client'

import { useState } from 'react'
import PremiumCard from '@/components/ui/PremiumCard'
import type { GradientPreset, GlassVariant } from '@/components/ui/PremiumCard'
import { ArrowRight, Sparkles, Zap, Layers, Eye, Paintbrush, Box } from 'lucide-react'

// ============================================================================
// DATA
// ============================================================================

const gradients: GradientPreset[] = ['cyan', 'purple', 'emerald', 'gold', 'slate']

const glassLevels: GlassVariant[] = ['none', 'subtle', 'medium', 'heavy']

const featureCombos = [
  {
    name: 'Default',
    description: 'Gradient border + subtle hover wash. The production standard.',
    props: {},
  },
  {
    name: 'Mouse Glow',
    description: 'Radial glow follows cursor position. Good for feature cards.',
    props: { mouseGlow: true },
  },
  {
    name: 'Tilt 3D',
    description: 'Spring-smoothed perspective tilt on hover. For showcase sections.',
    props: { tilt: true },
  },
  {
    name: 'Shine Sweep',
    description: 'Diagonal light sweep on hover. Premium polish for CTAs.',
    props: { shine: true },
  },
  {
    name: 'Glass + Glow',
    description: 'Glassmorphic backdrop with mouse glow. For overlaid content.',
    props: { glass: 'medium' as GlassVariant, mouseGlow: true },
  },
  {
    name: 'Full Stack',
    description: 'Every effect combined. For hero-level showcases only.',
    props: { tilt: true, mouseGlow: true, shine: true, glass: 'subtle' as GlassVariant },
  },
]

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

function SectionHeader({ title, description, badge }: { title: string; description: string; badge?: string }) {
  return (
    <div className="mb-8 md:mb-12">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-white/50 max-w-2xl">
        {description}
      </p>
    </div>
  )
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="mt-4 p-3 bg-slate-950/80 rounded-lg border border-white/5 overflow-x-auto">
      <code className="text-xs sm:text-sm text-emerald-400 font-mono whitespace-pre">{code}</code>
    </div>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function DesignLabPage() {
  const [activeGradient, setActiveGradient] = useState<GradientPreset>('cyan')
  const [activeGlass, setActiveGlass] = useState<GlassVariant>('none')
  const [features, setFeatures] = useState({
    mouseGlow: false,
    tilt: false,
    shine: false,
    lift: true,
  })

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Paintbrush className="w-3.5 h-3.5" />
              Design Lab
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Card System
            </h1>
            <p className="text-lg sm:text-xl text-white/50 max-w-3xl">
              One component, infinite variations. PremiumCard powers every card on frankx.ai —
              from simple blog links to interactive 3D showcases. Mix gradients, glass, tilt,
              glow, and shine to match any context.
            </p>
          </div>

          {/* ============================================================ */}
          {/* SECTION 1: GRADIENT PALETTE */}
          {/* ============================================================ */}
          <section className="mb-20 md:mb-28">
            <SectionHeader
              badge="Gradients"
              title="Five brand gradients"
              description="Each gradient maps to a content domain. Cyan for tech, purple for creative, emerald for growth, gold for premium, slate for neutral."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {gradients.map((g) => (
                <PremiumCard
                  key={g}
                  gradient={g}
                  mouseGlow
                  padding="p-6 sm:p-8"
                  className="text-center"
                >
                  <div className="text-lg sm:text-xl font-bold text-white capitalize mb-1">{g}</div>
                  <div className="text-xs text-white/40">gradient=&quot;{g}&quot;</div>
                </PremiumCard>
              ))}
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 2: INTERACTIVE PLAYGROUND */}
          {/* ============================================================ */}
          <section className="mb-20 md:mb-28">
            <SectionHeader
              badge="Playground"
              title="Build your card"
              description="Toggle features and pick options to see the card update live. Every combination respects prefers-reduced-motion."
            />

            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8">
              {/* Controls */}
              <div className="space-y-6">
                {/* Gradient Selector */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3 block">Gradient</label>
                  <div className="flex flex-wrap gap-2">
                    {gradients.map((g) => (
                      <button
                        key={g}
                        onClick={() => setActiveGradient(g)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          activeGradient === g
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-white/[0.03] text-white/50 border border-white/[0.06] hover:bg-white/[0.06]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glass Selector */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3 block">Glass</label>
                  <div className="flex flex-wrap gap-2">
                    {glassLevels.map((gl) => (
                      <button
                        key={gl}
                        onClick={() => setActiveGlass(gl)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          activeGlass === gl
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-white/[0.03] text-white/50 border border-white/[0.06] hover:bg-white/[0.06]'
                        }`}
                      >
                        {gl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feature Toggles */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3 block">Features</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(features) as (keyof typeof features)[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => toggleFeature(key)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                          features[key]
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-white/[0.03] text-white/50 border border-white/[0.06] hover:bg-white/[0.06]'
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generated Code */}
                <CodeSnippet
                  code={`<PremiumCard
  gradient="${activeGradient}"${activeGlass !== 'none' ? `\n  glass="${activeGlass}"` : ''}${features.mouseGlow ? '\n  mouseGlow' : ''}${features.tilt ? '\n  tilt' : ''}${features.shine ? '\n  shine' : ''}${!features.lift ? '\n  lift={false}' : ''}
>
  {children}
</PremiumCard>`}
                />
              </div>

              {/* Live Preview */}
              <div className="flex items-center justify-center min-h-[300px] rounded-2xl border border-white/5 bg-white/[0.01] p-8">
                <PremiumCard
                  gradient={activeGradient}
                  glass={activeGlass}
                  mouseGlow={features.mouseGlow}
                  tilt={features.tilt}
                  shine={features.shine}
                  lift={features.lift}
                  padding="p-8"
                  className="w-full max-w-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5">
                      <Sparkles className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/30">Preview</div>
                      <div className="text-lg font-bold text-white">Sample Card</div>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 mb-4 leading-relaxed">
                    Hover to see effects in action. Toggle options on the left to customize the interaction model.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <ArrowRight className="w-4 h-4" />
                    <span>Hover me</span>
                  </div>
                </PremiumCard>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 3: FEATURE COMBOS */}
          {/* ============================================================ */}
          <section className="mb-20 md:mb-28">
            <SectionHeader
              badge="Recipes"
              title="Production recipes"
              description="Pre-configured combinations for common use cases. Each recipe is a single PremiumCard with different props."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featureCombos.map((combo, i) => (
                <PremiumCard
                  key={combo.name}
                  gradient={gradients[i % gradients.length]}
                  padding="p-6"
                  {...combo.props}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/[0.06] text-white/60">
                      {combo.name}
                    </span>
                    <span className="text-xs text-white/30">#{i + 1}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {combo.description}
                  </p>
                  <CodeSnippet
                    code={Object.entries(combo.props).length === 0
                      ? '<PremiumCard>...</PremiumCard>'
                      : `<PremiumCard ${Object.entries(combo.props).map(([k, v]) => typeof v === 'boolean' ? k : `${k}="${v}"`).join(' ')}>`}
                  />
                </PremiumCard>
              ))}
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 4: GLASS VARIANTS */}
          {/* ============================================================ */}
          <section className="mb-20 md:mb-28">
            <SectionHeader
              badge="Glassmorphism"
              title="Four glass levels"
              description="Backdrop blur intensity for layered content. Use 'none' for flat cards, 'heavy' for overlaid hero content."
            />

            <div className="relative rounded-2xl overflow-hidden p-4 sm:p-8" style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1), rgba(168,85,247,0.1))',
            }}>
              {/* Background content to show blur effect */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }} />

              <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {glassLevels.map((gl) => (
                  <PremiumCard
                    key={gl}
                    gradient="cyan"
                    glass={gl}
                    mouseGlow
                    padding="p-6"
                    className="text-center"
                  >
                    <div className="text-lg font-bold text-white capitalize mb-1">{gl}</div>
                    <div className="text-xs text-white/40 mb-3">glass=&quot;{gl}&quot;</div>
                    <div className="text-[10px] text-white/30">
                      {gl === 'none' && 'No blur, transparent bg'}
                      {gl === 'subtle' && 'blur-md, 20% opacity'}
                      {gl === 'medium' && 'blur-xl, 30% opacity'}
                      {gl === 'heavy' && 'blur-2xl, 40% opacity'}
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 5: REAL-WORLD EXAMPLES */}
          {/* ============================================================ */}
          <section className="mb-20 md:mb-28">
            <SectionHeader
              badge="Examples"
              title="Production patterns"
              description="How PremiumCard is used across frankx.ai. Same component, different configurations."
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Blog Card Pattern */}
              <PremiumCard gradient="cyan" mouseGlow padding="p-0" className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <span className="text-white/30 text-sm">Hero Image</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-cyan-400">AI Architecture</span>
                    <span className="text-white/20">·</span>
                    <span className="text-[10px] text-white/30">8 min read</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Blog Card Pattern</h3>
                  <p className="text-sm text-white/50">padding=&quot;p-0&quot; with image + content area below. Uses category-mapped gradient.</p>
                </div>
              </PremiumCard>

              {/* Feature Card Pattern */}
              <PremiumCard gradient="emerald" mouseGlow shine padding="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Feature Card Pattern</h3>
                <p className="text-sm text-white/50 leading-relaxed">mouseGlow + shine for premium feature showcases. Icon top-left, arrow top-right.</p>
              </PremiumCard>

              {/* Resource Card Pattern */}
              <PremiumCard gradient="gold" href="https://frankx.ai" external padding="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-white/30 mb-0.5">Course · Oracle</div>
                    <div className="text-base font-medium text-white group-hover:text-amber-400 transition-colors">
                      Resource Card Pattern
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                </div>
              </PremiumCard>

              {/* Showcase Card Pattern */}
              <PremiumCard gradient="purple" tilt mouseGlow shine glass="subtle" badge="Showcase" padding="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <Box className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">Full Stack</div>
                    <div className="text-lg font-bold text-white">Showcase Pattern</div>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  tilt + mouseGlow + shine + glass. For hero sections and design lab demos. Not for production grids.
                </p>
              </PremiumCard>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 6: API REFERENCE */}
          {/* ============================================================ */}
          <section>
            <SectionHeader
              badge="API"
              title="Props reference"
              description="Complete PremiumCard API. All features are opt-in — the base card is lightweight with zero JS animations."
            />

            <div className="bg-slate-900/50 rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/60 font-medium">Prop</th>
                    <th className="text-left p-4 text-white/60 font-medium">Type</th>
                    <th className="text-left p-4 text-white/60 font-medium">Default</th>
                    <th className="text-left p-4 text-white/60 font-medium hidden md:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  {[
                    ['gradient', "'cyan' | 'purple' | 'emerald' | 'gold' | 'slate'", "'cyan'", 'Brand gradient preset'],
                    ['mouseGlow', 'boolean', 'false', 'Mouse-following radial glow'],
                    ['tilt', 'boolean', 'false', 'Spring-smoothed 3D perspective tilt'],
                    ['tiltIntensity', 'number', '5', 'Tilt range in degrees'],
                    ['shine', 'boolean', 'false', 'Diagonal shine sweep on hover'],
                    ['glass', "'none' | 'subtle' | 'medium' | 'heavy'", "'none'", 'Glassmorphic backdrop blur'],
                    ['lift', 'boolean', 'true', 'Hover lift (-translate-y-1)'],
                    ['badge', 'string', 'undefined', 'Top-left badge label'],
                    ['href', 'string', 'undefined', 'Link destination'],
                    ['external', 'boolean', 'false', 'Open in new tab'],
                    ['padding', 'string', "'p-5 sm:p-6'", 'Content padding classes'],
                    ['gradientColors', '{ from, via?, to }', 'undefined', 'Custom gradient override'],
                  ].map(([prop, type, def, desc]) => (
                    <tr key={prop} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4 font-mono text-emerald-400">{prop}</td>
                      <td className="p-4 font-mono text-xs text-white/50">{type}</td>
                      <td className="p-4 font-mono text-xs text-white/40">{def}</td>
                      <td className="p-4 text-white/50 hidden md:table-cell">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
