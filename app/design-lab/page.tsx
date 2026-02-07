'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import PremiumCard from '@/components/ui/PremiumCard'
import type { GradientPreset, GlassVariant } from '@/components/ui/PremiumCard'
import AuroraGradient from '@/components/ui/AuroraGradient'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { MorphingBackground, MagneticHover, FloatingElement, ParallaxContainer } from '@/components/ui/AdvancedAnimations'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { CursorSpotlight } from '@/components/ui/CursorSpotlight'
import ShimmerButton from '@/components/ui/magic-ui/shimmer-button'
import Marquee from '@/components/ui/magic-ui/marquee'
import {
  ArrowRight, Sparkles, Zap, Layers, Eye, Paintbrush,
  Box, Cpu, Globe, Wand2, Diamond, Star, Crown,
  Palette, MousePointer, Move3d, Waves, Grid3x3,
  Sun, Moon, Flame, Snowflake, Wind, Atom
} from 'lucide-react'

// ============================================================================
// DATA
// ============================================================================

const gradients: GradientPreset[] = ['cyan', 'purple', 'emerald', 'gold', 'slate']

const glassLevels: GlassVariant[] = ['none', 'subtle', 'medium', 'heavy']

const GRADIENT_HEX = {
  cyan: { from: '#00D4FF', to: '#0066FF' },
  purple: { from: '#A855F7', to: '#6366F1' },
  emerald: { from: '#10B981', to: '#0D9488' },
  gold: { from: '#F59E0B', to: '#EA580C' },
  slate: { from: '#64748B', to: '#334155' },
} as const

const auroraVariants = ['default', 'emerald', 'purple', 'sunset', 'ocean', 'minimal'] as const

// ============================================================================
// MICRO COMPONENTS
// ============================================================================

function SectionDivider() {
  return (
    <div className="relative py-16 md:py-24">
      <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20" />
    </div>
  )
}

function SectionLabel({ children, icon: Icon }: { children: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="p-4 bg-[#0a0a0b] rounded-xl border border-white/5 overflow-x-auto">
      <code className="text-xs sm:text-sm text-emerald-400/80 font-mono whitespace-pre leading-relaxed">{code}</code>
    </div>
  )
}

function DotGrid({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${className || ''}`} style={{
      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    }} />
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Layered backgrounds */}
      <MorphingBackground />
      <DotGrid />
      <CursorSpotlight />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={8} offset={15}>
          <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl" />
        </FloatingElement>
        <FloatingElement duration={12} offset={20}>
          <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-purple-500/5 blur-3xl" />
        </FloatingElement>
        <FloatingElement duration={10} offset={12}>
          <div className="absolute top-[40%] right-[30%] w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl" />
        </FloatingElement>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <SectionLabel icon={Diamond}>Design Lab</SectionLabel>

        <SplitTextReveal
          text="Where Pixels Meet Precision"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6"
          staggerDelay={0.06}
        />

        <p className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          Every component, effect, and interaction in the FrankX design system.
          One place to see it all, customize it, and decide what ships.
        </p>

        <div className="flex items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '1.2s' }}>
          <MagneticHover intensity={0.15}>
            <ShimmerButton
              shimmerColor="#06B6D4"
              shimmerSize="0.08em"
              background="rgba(6, 182, 212, 0.1)"
              className="!border-cyan-500/30 !text-cyan-300 !text-sm !font-semibold !px-8 !py-3"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Components
            </ShimmerButton>
          </MagneticHover>
          <MagneticHover intensity={0.15}>
            <ShimmerButton
              shimmerColor="#A855F7"
              shimmerSize="0.05em"
              background="rgba(168, 85, 247, 0.06)"
              className="!border-purple-500/20 !text-white/50 !text-sm !font-medium !px-8 !py-3"
            >
              View API
            </ShimmerButton>
          </MagneticHover>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
    </section>
  )
}

// ============================================================================
// CARD MATRIX SECTION — All gradient x glass combinations
// ============================================================================

function CardMatrixSection() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  return (
    <section className="relative py-20 md:py-32">
      <DotGrid />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Grid3x3}>Card Matrix</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          5 Gradients &times; 4 Glass Levels
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-16">
          Every possible PremiumCard combination. Hover to see the gradient border and glow activate.
        </p>

        {/* Column headers */}
        <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-3 mb-3">
          <div />
          {gradients.map(g => (
            <div key={g} className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-white/30 font-semibold">{g}</span>
            </div>
          ))}
        </div>

        {/* Matrix grid */}
        {glassLevels.map(gl => (
          <div key={gl} className="grid grid-cols-[80px_repeat(5,1fr)] gap-3 mb-3">
            <div className="flex items-center">
              <span className="text-[10px] uppercase tracking-wider text-white/30 font-semibold">{gl}</span>
            </div>
            {gradients.map(g => {
              const cellKey = `${g}-${gl}`
              return (
                <PremiumCard
                  key={cellKey}
                  gradient={g}
                  glass={gl}
                  mouseGlow
                  padding="p-4 sm:p-5"
                  className="text-center min-h-[100px] flex items-center justify-center"
                >
                  <div
                    onMouseEnter={() => setHoveredCell(cellKey)}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="w-full"
                  >
                    <div className="text-xs font-medium text-white/60 mb-1">{g}</div>
                    <div className="text-[10px] text-white/30">{gl}</div>
                    {hoveredCell === cellKey && (
                      <div className="mt-2 text-[9px] text-emerald-400/60 font-mono">
                        gradient=&quot;{g}&quot; glass=&quot;{gl}&quot;
                      </div>
                    )}
                  </div>
                </PremiumCard>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// INTERACTIVE PLAYGROUND — Enhanced version
// ============================================================================

function PlaygroundSection() {
  const [activeGradient, setActiveGradient] = useState<GradientPreset>('cyan')
  const [activeGlass, setActiveGlass] = useState<GlassVariant>('none')
  const [tiltIntensity, setTiltIntensity] = useState(5)
  const [features, setFeatures] = useState({
    mouseGlow: false,
    tilt: false,
    shine: false,
    lift: true,
  })

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const generatedCode = `<PremiumCard
  gradient="${activeGradient}"${activeGlass !== 'none' ? `\n  glass="${activeGlass}"` : ''}${features.mouseGlow ? '\n  mouseGlow' : ''}${features.tilt ? `\n  tilt\n  tiltIntensity={${tiltIntensity}}` : ''}${features.shine ? '\n  shine' : ''}${!features.lift ? '\n  lift={false}' : ''}
>
  {children}
</PremiumCard>`

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Wand2}>Playground</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Build Your Card
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-16">
          Toggle features, pick options, see the result. Every combination respects prefers-reduced-motion.
        </p>

        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-8 lg:gap-12">
          {/* Controls Panel */}
          <div className="space-y-8">
            {/* Gradient Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-4 block">Gradient</label>
              <div className="flex flex-wrap gap-2">
                {gradients.map(g => (
                  <button
                    key={g}
                    onClick={() => setActiveGradient(g)}
                    className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeGradient === g
                        ? 'text-white'
                        : 'bg-white/[0.02] text-white/40 border border-white/[0.06] hover:bg-white/[0.04] hover:text-white/60'
                    }`}
                    style={activeGradient === g ? {
                      background: `linear-gradient(135deg, ${GRADIENT_HEX[g].from}20, ${GRADIENT_HEX[g].to}20)`,
                      border: `1px solid ${GRADIENT_HEX[g].from}40`,
                    } : undefined}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-4 block">Glass</label>
              <div className="flex flex-wrap gap-2">
                {glassLevels.map(gl => (
                  <button
                    key={gl}
                    onClick={() => setActiveGlass(gl)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeGlass === gl
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-white/[0.02] text-white/40 border border-white/[0.06] hover:bg-white/[0.04]'
                    }`}
                  >
                    {gl}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Toggles */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-4 block">Effects</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(features) as (keyof typeof features)[]).map(key => {
                  const icons: Record<string, React.ComponentType<{className?: string}>> = {
                    mouseGlow: MousePointer,
                    tilt: Move3d,
                    shine: Sun,
                    lift: ArrowRight,
                  }
                  const Icon = icons[key]
                  return (
                    <button
                      key={key}
                      onClick={() => toggleFeature(key)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        features[key]
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-white/[0.02] text-white/40 border border-white/[0.06] hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {key}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tilt intensity slider */}
            {features.tilt && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-4 block">
                  Tilt Intensity: {tiltIntensity}&deg;
                </label>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={tiltIntensity}
                  onChange={e => setTiltIntensity(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            )}

            {/* Generated Code */}
            <CodeBlock code={generatedCode} />
          </div>

          {/* Live Preview */}
          <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }} />

            <div className="relative p-8 w-full max-w-md">
              <PremiumCard
                gradient={activeGradient}
                glass={activeGlass}
                mouseGlow={features.mouseGlow}
                tilt={features.tilt}
                tiltIntensity={tiltIntensity}
                shine={features.shine}
                lift={features.lift}
                padding="p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/[0.06]">
                    <Sparkles className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/25">Preview</div>
                    <div className="text-lg font-bold text-white">Sample Card</div>
                  </div>
                </div>
                <p className="text-sm text-white/40 mb-6 leading-relaxed">
                  Hover to see all active effects. Every toggle updates the card in real-time.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/30">
                    <ArrowRight className="w-4 h-4" />
                    <span>Hover me</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#030712]" />
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// GLASSMORPHISM GALLERY — On Aurora backgrounds
// ============================================================================

function GlassmorphismGallery() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Layers}>Glassmorphism</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Glass on Every Surface
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-16">
          Four blur intensities on six aurora backgrounds. The glass effect adapts to whatever lies beneath.
        </p>

        <div className="space-y-8">
          {auroraVariants.map(variant => (
            <AuroraGradient
              key={variant}
              variant={variant}
              intensity="vibrant"
              className="rounded-2xl border border-white/[0.06] p-6 sm:p-8"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-6">
                Aurora: {variant}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {glassLevels.map(gl => (
                  <PremiumCard
                    key={gl}
                    gradient="cyan"
                    glass={gl}
                    mouseGlow
                    padding="p-5"
                  >
                    <div className="text-sm font-bold text-white capitalize mb-1">{gl}</div>
                    <div className="text-[10px] text-white/30 font-mono">glass=&quot;{gl}&quot;</div>
                  </PremiumCard>
                ))}
              </div>
            </AuroraGradient>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// EFFECT SHOWCASE — Advanced interactions
// ============================================================================

function EffectShowcase() {
  return (
    <section className="relative py-20 md:py-32">
      <DotGrid />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Atom}>Advanced Effects</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Beyond the Card
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-16">
          Premium effects available across the design system. Magnetic hover, shimmer buttons, morphing backgrounds, and more.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Magnetic Hover */}
          <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-[280px] flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4">Magnetic Hover</div>
            <div className="flex-1 flex items-center justify-center">
              <MagneticHover intensity={0.4}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 cursor-pointer">
                  <MousePointer className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-sm text-white/60 text-center">Move your mouse near me</div>
                </div>
              </MagneticHover>
            </div>
            <CodeBlock code={`<MagneticHover intensity={0.4}>\n  <YourElement />\n</MagneticHover>`} />
          </div>

          {/* Shimmer Button */}
          <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-[280px] flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4">Shimmer Button</div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <ShimmerButton
                shimmerColor="#06B6D4"
                shimmerSize="0.08em"
                background="rgba(6, 182, 212, 0.08)"
                className="!border-cyan-500/20 !text-cyan-300 !text-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Cyan Shimmer
              </ShimmerButton>
              <ShimmerButton
                shimmerColor="#A855F7"
                shimmerSize="0.06em"
                background="rgba(168, 85, 247, 0.08)"
                className="!border-purple-500/20 !text-purple-300 !text-sm"
              >
                <Crown className="w-4 h-4 mr-2" />
                Purple Shimmer
              </ShimmerButton>
              <ShimmerButton
                shimmerColor="#F59E0B"
                shimmerSize="0.1em"
                shimmerDuration="2s"
                background="rgba(245, 158, 11, 0.08)"
                className="!border-amber-500/20 !text-amber-300 !text-sm"
              >
                <Flame className="w-4 h-4 mr-2" />
                Gold Shimmer
              </ShimmerButton>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-[280px] flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4">Floating Elements</div>
            <div className="flex-1 flex items-center justify-center relative">
              <FloatingElement duration={4} offset={8}>
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
              </FloatingElement>
              <FloatingElement duration={6} offset={12}>
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 ml-16">
                  <Atom className="w-6 h-6 text-cyan-400" />
                </div>
              </FloatingElement>
              <FloatingElement duration={5} offset={10}>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 -ml-8 mt-12">
                  <Wind className="w-6 h-6 text-emerald-400" />
                </div>
              </FloatingElement>
            </div>
            <CodeBlock code={`<FloatingElement duration={6} offset={12}>\n  <Icon />\n</FloatingElement>`} />
          </div>

          {/* Split Text Reveal */}
          <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-[280px] flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4">Split Text Reveal</div>
            <div className="flex-1 flex items-center justify-center">
              <SplitTextReveal
                text="Words Appear One By One"
                as="h3"
                className="text-2xl font-bold text-white text-center"
                staggerDelay={0.1}
              />
            </div>
            <CodeBlock code={`<SplitTextReveal\n  text="Your heading"\n  as="h2"\n  staggerDelay={0.08}\n/>`} />
          </div>

          {/* Parallax Container */}
          <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-[280px] flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4">Parallax Depth</div>
            <div className="flex-1 flex items-center justify-center">
              <ParallaxContainer offset={-30}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl blur-xl" />
                  <div className="relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <Layers className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <div className="text-sm text-white/50 text-center">Scroll to see depth</div>
                  </div>
                </div>
              </ParallaxContainer>
            </div>
            <CodeBlock code={`<ParallaxContainer offset={-30}>\n  <YourContent />\n</ParallaxContainer>`} />
          </div>

          {/* Cursor Spotlight */}
          <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-[280px] flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-4">Cursor Spotlight</div>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <div className="text-sm text-white/40">Move your cursor across the page</div>
                <div className="text-xs text-white/20 mt-1">Global cyan glow follows you everywhere</div>
              </div>
            </div>
            <CodeBlock code={`<CursorSpotlight />\n// Place once in layout`} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CANVAS BACKGROUNDS — Four animated variants
// ============================================================================

function CanvasBackgroundsSection() {
  const [activeVariant, setActiveVariant] = useState<'gradient' | 'particles' | 'waves' | 'grid'>('gradient')

  const variants = [
    { key: 'gradient' as const, label: 'Gradient Orbs', icon: Sun, desc: 'Floating color orbs with sine-wave motion' },
    { key: 'particles' as const, label: 'Particles', icon: Snowflake, desc: 'Connected particle network with physics' },
    { key: 'waves' as const, label: 'Waves', icon: Waves, desc: 'Multi-layer sine wave forms' },
    { key: 'grid' as const, label: 'Grid', icon: Grid3x3, desc: 'Morphing grid mesh animation' },
  ]

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Palette}>Canvas Backgrounds</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Four Animated Canvases
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-12">
          GPU-accelerated canvas backgrounds. Use sparingly — one per page maximum.
        </p>

        {/* Variant selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {variants.map(v => (
            <button
              key={v.key}
              onClick={() => setActiveVariant(v.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeVariant === v.key
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/[0.02] text-white/40 border border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <v.icon className="w-4 h-4" />
              {v.label}
            </button>
          ))}
        </div>

        {/* Canvas preview */}
        <div className="relative aspect-[16/7] rounded-2xl border border-white/[0.06] overflow-hidden bg-[#030712]">
          <AnimatedBackground variant={activeVariant} intensity="medium" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-white/20 font-semibold mb-2">
                AnimatedBackground
              </div>
              <div className="text-2xl font-bold text-white/50">
                variant=&quot;{activeVariant}&quot;
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <CodeBlock code={`<AnimatedBackground variant="${activeVariant}" intensity="medium" />`} />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PRODUCTION PATTERNS — Real-world card compositions
// ============================================================================

function ProductionPatternsSection() {
  return (
    <section className="relative py-20 md:py-32">
      <DotGrid />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Box}>Production Patterns</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          How Cards Ship
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-16">
          Real configurations from frankx.ai. Same component, different contexts.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Blog Card */}
          <PremiumCard gradient="cyan" mouseGlow padding="p-0" className="overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
              <span className="relative text-white/30 text-sm font-medium">Hero Image Area</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] uppercase tracking-wider text-cyan-400 font-semibold">AI Architecture</span>
                <span className="text-white/15">&middot;</span>
                <span className="text-[10px] text-white/25">8 min read</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Blog Card Pattern</h3>
              <p className="text-sm text-white/40 leading-relaxed">padding=&quot;p-0&quot; for edge-to-edge images. Gradient mapped to content category.</p>
            </div>
          </PremiumCard>

          {/* Feature Card */}
          <PremiumCard gradient="emerald" mouseGlow shine padding="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/[0.06]">
                <Zap className="w-7 h-7 text-emerald-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-white/15 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Feature Card</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-6">mouseGlow + shine for premium feature showcases. Icon top-left, action arrow top-right.</p>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-[10px] text-white/20 uppercase tracking-wider">Explore</span>
            </div>
          </PremiumCard>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Resource Card */}
          <PremiumCard gradient="gold" href="https://frankx.ai" external padding="p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider text-white/20 mb-1">Course &middot; Oracle</div>
                <div className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                  Resource Link Card
                </div>
              </div>
              <Eye className="w-4 h-4 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />
            </div>
          </PremiumCard>

          {/* Tool Card */}
          <PremiumCard gradient="purple" glass="subtle" mouseGlow padding="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-sm font-semibold text-white">Tool Card</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">Glass + glow for interactive tool interfaces.</p>
          </PremiumCard>

          {/* Badge Card */}
          <PremiumCard gradient="cyan" badge="New" shine padding="p-5">
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-white mb-1">Badge Card</h4>
              <p className="text-xs text-white/30">Built-in badge prop for labels and status indicators.</p>
            </div>
          </PremiumCard>
        </div>

        {/* Hero Showcase Card — Full width */}
        <PremiumCard gradient="purple" tilt tiltIntensity={3} mouseGlow shine glass="subtle" padding="p-8 sm:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-semibold uppercase tracking-wider mb-4">
                Showcase
              </span>
              <h3 className="text-3xl font-bold text-white mb-3">Hero Showcase Pattern</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                All effects combined: tilt + mouseGlow + shine + glass. Reserve for hero sections and flagship features. The full visual stack.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>tilt + mouseGlow + shine + glass</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
                <div className="relative w-full h-full rounded-3xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                  <Diamond className="w-16 h-16 text-purple-400/30" />
                </div>
              </div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  )
}

// ============================================================================
// BUTTON LAB
// ============================================================================

function ButtonLabSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Zap}>Button Lab</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Button System
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-16">
          PremiumButton for navigation, ShimmerButton for emphasis. Both fully accessible.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* PremiumButton variants */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-lg font-bold text-white mb-6">PremiumButton</h3>
            <div className="space-y-4">
              {(['primary', 'secondary'] as const).map(variant => (
                <div key={variant} className="flex items-center gap-4">
                  <div className="flex gap-3">
                    {(['sm', 'md', 'lg'] as const).map(size => (
                      <button
                        key={size}
                        className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all
                          ${variant === 'primary'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
                            : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'}
                          ${size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'md' ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'}
                        `}
                      >
                        {variant} {size}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ShimmerButton variants */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-lg font-bold text-white mb-6">ShimmerButton</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', border: 'cyan', label: 'Cyan' },
                { color: '#A855F7', bg: 'rgba(168,85,247,0.08)', border: 'purple', label: 'Purple' },
                { color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'emerald', label: 'Emerald' },
                { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'amber', label: 'Gold' },
                { color: '#ffffff', bg: 'rgba(255,255,255,0.03)', border: 'white', label: 'Neutral' },
              ].map(v => (
                <ShimmerButton
                  key={v.label}
                  shimmerColor={v.color}
                  shimmerSize="0.06em"
                  background={v.bg}
                  className={`!border-${v.border}-500/20 !text-white/70 !text-sm`}
                >
                  {v.label}
                </ShimmerButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MARQUEE SECTION
// ============================================================================

function MarqueeSection() {
  const techs = [
    'Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
    'Vercel', 'MDX', 'Suno AI', 'Oracle Cloud', 'Claude', 'MCP',
    'Prisma', 'Edge Functions',
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <SectionLabel icon={Wind}>Marquee</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Infinite Scroll
        </h2>
        <p className="text-lg text-white/40 max-w-2xl">
          Marquee component for logo strips, tech stacks, and social proof. Pause on hover.
        </p>
      </div>

      <div className="space-y-4">
        <Marquee pauseOnHover className="[--duration:30s]">
          {techs.map(tech => (
            <div key={tech} className="mx-3 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/50 font-medium whitespace-nowrap">
              {tech}
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {techs.map(tech => (
            <div key={tech} className="mx-3 px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-sm text-white/30 font-medium whitespace-nowrap">
              {tech}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

// ============================================================================
// API REFERENCE TABLE
// ============================================================================

function ApiReferenceSection() {
  const props = [
    ['gradient', "'cyan' | 'purple' | 'emerald' | 'gold' | 'slate'", "'cyan'", 'Brand gradient preset for border and glow'],
    ['mouseGlow', 'boolean', 'false', 'Mouse-following radial glow effect'],
    ['tilt', 'boolean', 'false', 'Spring-smoothed 3D perspective tilt on hover'],
    ['tiltIntensity', 'number', '5', 'Max tilt angle in degrees'],
    ['shine', 'boolean', 'false', 'Diagonal light sweep on hover'],
    ['glass', "'none' | 'subtle' | 'medium' | 'heavy'", "'none'", 'Glassmorphic backdrop blur level'],
    ['lift', 'boolean', 'true', 'Hover lift animation (-translate-y-1)'],
    ['badge', 'string', '—', 'Top-left badge text'],
    ['href', 'string', '—', 'Makes card a link'],
    ['external', 'boolean', 'false', 'Opens link in new tab'],
    ['padding', 'string', "'p-5 sm:p-6'", 'Content padding override'],
    ['gradientColors', '{ from, via?, to }', '—', 'Custom gradient color override'],
    ['onClick', '() => void', '—', 'Click handler (adds button role)'],
  ]

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Cpu}>API Reference</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          PremiumCard Props
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-12">
          All features are opt-in. The base card ships minimal JS — effects activate only when enabled.
        </p>

        <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left p-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Prop</th>
                  <th className="text-left p-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Type</th>
                  <th className="text-left p-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Default</th>
                  <th className="text-left p-4 text-white/50 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map(([prop, type, def, desc]) => (
                  <tr key={prop} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-emerald-400/80 text-xs">{prop}</td>
                    <td className="p-4 font-mono text-[11px] text-white/40">{type}</td>
                    <td className="p-4 font-mono text-[11px] text-white/30">{def}</td>
                    <td className="p-4 text-white/40 text-xs hidden lg:table-cell">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// COLOR SYSTEM
// ============================================================================

function ColorSystemSection() {
  return (
    <section className="relative py-20 md:py-32">
      <DotGrid />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel icon={Palette}>Color System</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Brand Palette
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mb-16">
          Five gradient presets mapping to content domains. Each renders as a border, glow, and wash.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {gradients.map(g => {
            const hex = GRADIENT_HEX[g]
            const labels: Record<string, string> = {
              cyan: 'Technology',
              purple: 'Creative',
              emerald: 'Growth',
              gold: 'Premium',
              slate: 'Neutral',
            }
            return (
              <div key={g} className="group">
                <div
                  className="aspect-[4/5] rounded-2xl mb-4 relative overflow-hidden border border-white/[0.06]"
                  style={{ background: `linear-gradient(135deg, ${hex.from}25, ${hex.to}15)` }}
                >
                  {/* Gradient swatch */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/2"
                    style={{ background: `linear-gradient(to top, ${hex.from}40, transparent)` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full" style={{ background: `linear-gradient(135deg, ${hex.from}, ${hex.to})` }} />
                  </div>
                </div>
                <div className="text-sm font-semibold text-white capitalize mb-1">{g}</div>
                <div className="text-[10px] text-white/25 uppercase tracking-wider mb-2">{labels[g]}</div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono text-white/30">{hex.from}</span>
                  <span className="text-[10px] font-mono text-white/20">{hex.to}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function DesignLabPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/20">
      <HeroSection />
      <SectionDivider />
      <CardMatrixSection />
      <SectionDivider />
      <PlaygroundSection />
      <SectionDivider />
      <GlassmorphismGallery />
      <SectionDivider />
      <EffectShowcase />
      <SectionDivider />
      <CanvasBackgroundsSection />
      <SectionDivider />
      <ProductionPatternsSection />
      <SectionDivider />
      <ButtonLabSection />
      <SectionDivider />
      <MarqueeSection />
      <SectionDivider />
      <ColorSystemSection />
      <SectionDivider />
      <ApiReferenceSection />

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  )
}
