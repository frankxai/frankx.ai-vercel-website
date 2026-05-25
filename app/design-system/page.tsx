import { Metadata } from 'next'
import AuroraGradient from '@/components/ui/AuroraGradient'

export const metadata: Metadata = {
  title: 'Design System | FrankX',
  description: 'FrankX Brand System v2.0 — Colors, typography, glassmorphism, spacing, gradients, and component patterns.',
}

/* ============================================================
   BRAND v2.0 DATA
   ============================================================ */

const brandAccents = [
  { name: 'Purple', hex: '#AB47C7', domain: 'Intelligence, ACOS', tw: 'bg-[#AB47C7]' },
  { name: 'Blue', hex: '#43BFE3', domain: 'Technology, Vibe OS', tw: 'bg-[#43BFE3]' },
  { name: 'Magenta', hex: '#E040FB', domain: 'GenCreator OS, Multi-modal', tw: 'bg-[#E040FB]' },
  { name: 'Emerald', hex: '#10B981', domain: 'Success, Labs, CTAs', tw: 'bg-[#10B981]' },
  { name: 'Obsidian', hex: '#1E0A3C', domain: 'Arcanea, Cosmos', tw: 'bg-[#1E0A3C]' },
  { name: 'Arcanea Glow', hex: '#7C3AED', domain: 'Arcanea accent', tw: 'bg-[#7C3AED]' },
  { name: 'Rose', hex: '#F43F5E', domain: 'Errors, destructive', tw: 'bg-[#F43F5E]' },
]

const foundations = [
  { name: 'Void', hex: '#0a0a0b', desc: 'Page background', tw: 'bg-[#0a0a0b]' },
  { name: 'Space', hex: '#111113', desc: 'Section background', tw: 'bg-[#111113]' },
  { name: 'Navy', hex: '#0F172A', desc: 'Brand primary dark', tw: 'bg-[#0a0a0b]' },
  { name: 'Elevated', hex: '#1a1a1f', desc: 'Card backgrounds', tw: 'bg-[#1a1a1f]' },
  { name: 'Subtle', hex: '#252530', desc: 'Hover states', tw: 'bg-[#252530]' },
  { name: 'Muted', hex: '#3a3a4a', desc: 'Disabled states', tw: 'bg-[#3a3a4a]' },
]

const textLevels = [
  { name: 'Primary', opacity: '0.95', ratio: '~18.5:1', level: 'AAA', style: 'text-white/95' },
  { name: 'Secondary', opacity: '0.72', ratio: '~11.2:1', level: 'AAA', style: 'text-white/[0.72]' },
  { name: 'Tertiary', opacity: '0.48', ratio: '~7.5:1', level: 'AAA', style: 'text-white/[0.48]' },
  { name: 'Muted', opacity: '0.32', ratio: '~5.0:1', level: 'AA', style: 'text-white/[0.32]' },
]

const glassLevels = [
  { name: 'Ghost', opacity: '0.02', use: 'Hover backgrounds' },
  { name: 'Standard', opacity: '0.03', use: 'Default cards' },
  { name: 'Elevated', opacity: '0.05', use: 'Active/focused' },
  { name: 'Strong', opacity: '0.08', use: 'Tooltips, popovers' },
]

const typeScale = [
  { role: 'Display', font: 'Poppins', weight: '800', size: '72px', lh: '1.05' },
  { role: 'H1', font: 'Poppins', weight: '700', size: '48px', lh: '1.15' },
  { role: 'H2', font: 'Poppins', weight: '700', size: '36px', lh: '1.2' },
  { role: 'H3', font: 'Poppins', weight: '600', size: '28px', lh: '1.25' },
  { role: 'Body Large', font: 'Inter', weight: '400', size: '20px', lh: '1.65' },
  { role: 'Body', font: 'Inter', weight: '400', size: '17px', lh: '1.7' },
  { role: 'Caption', font: 'Inter', weight: '500', size: '13px', lh: '1.5' },
  { role: 'Code', font: 'JetBrains Mono', weight: '400', size: '14px', lh: '1.7' },
]

const spacingScale = [
  { token: 'tight', value: '4px' },
  { token: 'compact', value: '8px' },
  { token: 'default', value: '12px' },
  { token: 'standard', value: '16px' },
  { token: 'medium', value: '24px' },
  { token: 'large', value: '32px' },
  { token: 'xl', value: '48px' },
  { token: '2xl', value: '64px' },
  { token: '3xl', value: '80px' },
]

const gradientVariants = [
  {
    name: 'Default',
    variant: 'default' as const,
    description: 'The signature FrankX aurora gradient. Emerald, cyan, and amber create a balanced, professional look.',
    useCase: 'Hero sections, feature cards, general brand applications',
    colors: ['Emerald-500', 'Cyan-400', 'Amber-500'],
  },
  {
    name: 'Emerald',
    variant: 'emerald' as const,
    description: 'Focused green tones for growth, nature, and success themes.',
    useCase: 'Success states, growth metrics, environmental content',
    colors: ['Emerald-500', 'Emerald-400', 'Emerald-400'],
  },
  {
    name: 'Purple',
    variant: 'purple' as const,
    description: 'Creative and spiritual energy with purple and pink tones.',
    useCase: 'Soulbook content, creative sections, spiritual themes',
    colors: ['Purple-600', 'Purple-400', 'Pink-500'],
  },
  {
    name: 'Sunset',
    variant: 'sunset' as const,
    description: 'Warm, energetic gradient for calls-to-action and urgency.',
    useCase: 'CTAs, promotional banners, high-energy sections',
    colors: ['Orange-400', 'Amber-500', 'Red-500'],
  },
  {
    name: 'Ocean',
    variant: 'ocean' as const,
    description: 'Cool, professional blues for enterprise and calm content.',
    useCase: 'Enterprise pages, professional content, calm interfaces',
    colors: ['Cyan-500', 'Blue-500', 'Indigo-500'],
  },
  {
    name: 'Minimal',
    variant: 'minimal' as const,
    description: 'Subtle single-color glow for understated elegance.',
    useCase: 'Backgrounds, subtle accents, minimal interfaces',
    colors: ['Emerald-500'],
  },
]

const intensityLevels = ['subtle', 'normal', 'vibrant'] as const

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center rounded-full border border-[#AB47C7]/30 bg-[#AB47C7]/10 px-4 py-1.5 text-sm font-medium text-[#AB47C7] mb-6">
              Brand System v2.0
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white/95 mb-4">
              FrankX Design System
            </h1>
            <p className="text-lg text-white/[0.72] max-w-3xl">
              Colors, typography, glassmorphism, spacing, gradients, and component patterns.
              Build what matters.
            </p>
          </div>

          {/* ================================================================
             COLOR PALETTE
             ================================================================ */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-white/95 mb-2">Color Palette</h2>
            <p className="text-white/[0.48] mb-8">Dark-first foundation with six accent colors mapped to product domains.</p>

            {/* Foundation */}
            <h3 className="text-lg font-semibold text-white/[0.72] mb-4">Foundation</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
              {foundations.map((c) => (
                <div key={c.name}>
                  <div className={`${c.tw} h-20 rounded-xl border border-white/[0.06]`} />
                  <p className="text-sm font-semibold text-white/[0.72] mt-2">{c.name}</p>
                  <p className="text-xs font-mono text-white/[0.48]">{c.hex}</p>
                  <p className="text-xs text-white/[0.32]">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Accents */}
            <h3 className="text-lg font-semibold text-white/[0.72] mb-4">Accents</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
              {brandAccents.map((c) => (
                <div key={c.name}>
                  <div className={`${c.tw} h-20 rounded-xl`} />
                  <p className="text-sm font-semibold text-white/[0.72] mt-2">{c.name}</p>
                  <p className="text-xs font-mono text-white/[0.48]">{c.hex}</p>
                  <p className="text-xs text-white/[0.32]">{c.domain}</p>
                </div>
              ))}
            </div>

            {/* Brand Gradient */}
            <h3 className="text-lg font-semibold text-white/[0.72] mb-4">Brand Gradient</h3>
            <div className="h-16 rounded-xl" style={{ background: 'linear-gradient(135deg, #AB47C7, #43BFE3)' }} />
            <p className="text-xs font-mono text-white/[0.48] mt-2">linear-gradient(135deg, #AB47C7, #43BFE3)</p>
          </section>

          {/* Text Hierarchy */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-white/95 mb-2">Text Hierarchy</h2>
            <p className="text-white/[0.48] mb-8">Four opacity levels with WCAG contrast ratios on void background.</p>
            <div className="space-y-6">
              {textLevels.map((t) => (
                <div key={t.name} className="flex items-baseline gap-6">
                  <span className={`${t.style} text-2xl font-semibold min-w-[200px]`}>
                    The quick brown fox
                  </span>
                  <span className="text-sm text-white/[0.48] min-w-[80px]">{t.name}</span>
                  <span className="text-xs font-mono text-white/[0.32]">opacity: {t.opacity}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${t.level === 'AAA' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'}`}>
                    {t.level} {t.ratio}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
             TYPOGRAPHY
             ================================================================ */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-white/95 mb-2">Typography</h2>
            <p className="text-white/[0.48] mb-8">Poppins for display, Inter for body, JetBrains Mono for code, Playfair Display for editorial quotes.</p>

            <div className="space-y-6">
              {typeScale.map((t) => (
                <div key={t.role} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pb-4 border-b border-white/[0.06]">
                  <span
                    className={`${t.font === 'Poppins' ? 'font-display' : t.font === 'JetBrains Mono' ? 'font-mono' : 'font-sans'} min-w-[300px]`}
                    style={{ fontSize: t.size, fontWeight: Number(t.weight), lineHeight: t.lh }}
                  >
                    {t.role === 'Code' ? '<code>Build what matters.</code>' : 'Build what matters.'}
                  </span>
                  <div className="flex gap-4 text-xs text-white/[0.32]">
                    <span>{t.font}</span>
                    <span className="font-mono">{t.size}</span>
                    <span className="font-mono">w{t.weight}</span>
                    <span className="font-mono">lh {t.lh}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
             GLASSMORPHISM
             ================================================================ */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-white/95 mb-2">Glassmorphism</h2>
            <p className="text-white/[0.48] mb-8">Four opacity levels. Standard = 0.03. Never exceed 0.08. Blur: 18px.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {glassLevels.map((g) => (
                <div
                  key={g.name}
                  className="rounded-2xl border border-white/[0.06] p-6 backdrop-blur-[18px]"
                  style={{ background: `rgba(255,255,255,${g.opacity})` }}
                >
                  <h3 className="text-lg font-semibold text-white/95 mb-1">{g.name}</h3>
                  <p className="text-sm text-white/[0.48] mb-3">{g.use}</p>
                  <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded">
                    opacity: {g.opacity}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
             SPACING
             ================================================================ */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-white/95 mb-2">Spacing Scale</h2>
            <p className="text-white/[0.48] mb-8">4px base grid. All spacing is a multiple of 4.</p>

            <div className="space-y-3">
              {spacingScale.map((s) => (
                <div key={s.token} className="flex items-center gap-4">
                  <span className="text-sm text-white/[0.72] w-20">{s.token}</span>
                  <div
                    className="h-3 bg-[#AB47C7] rounded-full"
                    style={{ width: s.value }}
                  />
                  <span className="text-xs font-mono text-white/[0.32]">{s.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
             AURORA GRADIENTS (existing section)
             ================================================================ */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-white/95 mb-2">Aurora Gradient System</h2>
            <p className="text-white/[0.48] mb-8">
              Layered radial gradients with subtle noise texture. Six variants for different content contexts.
            </p>

            <div className="grid gap-8">
              {gradientVariants.map((item) => (
                <div key={item.variant} className="grid lg:grid-cols-2 gap-6 items-stretch">
                  {/* Preview */}
                  <AuroraGradient
                    variant={item.variant}
                    className="rounded-2xl border border-white/10 p-8 min-h-[200px] flex flex-col justify-center"
                  >
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 w-fit mb-4">
                      {item.name}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Sample Heading
                    </h3>
                    <p className="text-white/70">
                      This is how content appears on the {item.name.toLowerCase()} gradient variant.
                    </p>
                  </AuroraGradient>

                  {/* Details */}
                  <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-8">
                    <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
                    <p className="text-white/60 mb-4">{item.description}</p>

                    <div className="mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Use Case</span>
                      <p className="text-white/70 text-sm mt-1">{item.useCase}</p>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Colors</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.colors.map((color, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-mono text-white/80 bg-white/10 rounded"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Code */}
                    <div className="mt-4 p-3 bg-slate-950 rounded-lg">
                      <code className="text-sm text-emerald-400">
                        {`<AuroraGradient variant="${item.variant}">`}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Intensity Levels */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-4">Intensity Levels</h2>
            <p className="text-white/60 mb-8 max-w-2xl">
              Control the gradient opacity with three intensity levels. Use subtle for backgrounds,
              normal for most UI, and vibrant for emphasis.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {intensityLevels.map((intensity) => (
                <AuroraGradient
                  key={intensity}
                  variant="default"
                  intensity={intensity}
                  className="rounded-2xl border border-white/10 p-8 text-center"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Intensity
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2 capitalize">{intensity}</h3>
                  <p className="text-white/60 text-sm mt-2">
                    {intensity === 'subtle' && 'Opacity: 50%'}
                    {intensity === 'normal' && 'Opacity: 70%'}
                    {intensity === 'vibrant' && 'Opacity: 100%'}
                  </p>
                  <div className="mt-4 p-2 bg-slate-950/50 rounded">
                    <code className="text-xs text-emerald-400">
                      intensity=&quot;{intensity}&quot;
                    </code>
                  </div>
                </AuroraGradient>
              ))}
            </div>
          </section>

          {/* Noise Toggle */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-4">Noise Texture</h2>
            <p className="text-white/60 mb-8 max-w-2xl">
              The subtle noise texture adds organic depth. Disable it for a cleaner look.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <AuroraGradient
                variant="default"
                showNoise={true}
                className="rounded-2xl border border-white/10 p-8 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">With Noise</h3>
                <p className="text-white/60 text-sm">Default behavior - adds organic texture</p>
                <div className="mt-4 p-2 bg-slate-950/50 rounded">
                  <code className="text-xs text-emerald-400">showNoise=&#123;true&#125;</code>
                </div>
              </AuroraGradient>

              <AuroraGradient
                variant="default"
                showNoise={false}
                className="rounded-2xl border border-white/10 p-8 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Without Noise</h3>
                <p className="text-white/60 text-sm">Cleaner, smoother appearance</p>
                <div className="mt-4 p-2 bg-slate-950/50 rounded">
                  <code className="text-xs text-emerald-400">showNoise=&#123;false&#125;</code>
                </div>
              </AuroraGradient>
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Usage</h2>
            <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-8">
              <pre className="text-sm text-white/80 overflow-x-auto">
                <code>{`import AuroraGradient from '@/components/ui/AuroraGradient'

// Basic usage
<AuroraGradient className="rounded-3xl p-8">
  <h2>Your content</h2>
</AuroraGradient>

// With options
<AuroraGradient
  variant="purple"      // default | emerald | purple | sunset | ocean | minimal
  intensity="vibrant"   // subtle | normal | vibrant
  showNoise={true}      // true | false
  as="section"          // div | section | header | article
  className="rounded-xl border border-white/10"
>
  <YourContent />
</AuroraGradient>`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
